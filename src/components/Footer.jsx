import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner container">
        <div className="footer-col">
          <h3 className="footer-title">STARLINK Kenya</h3>
          <p className="footer-text">
            Authorized reseller of data packages for Starlink services.
            We provide reliable internet connectivity across Kenya.
          </p>
        </div>
        <div className="footer-col">
          <h3 className="footer-title">SUPPORT</h3>
          <p className="footer-text">Email: support@starlink.reseller</p>
          <p className="footer-text">WhatsApp: +254 700 000 000</p>
          <p className="footer-text">Mon - Sat, 8AM - 8PM EAT</p>
        </div>
        <div className="footer-col">
          <h3 className="footer-title">PAIEMENT</h3>
          <p className="footer-text">
            Pay securely with Airtel Money. Make sure you have sufficient
            balance before initiating payment.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 STARLINK Kenya Reseller. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
