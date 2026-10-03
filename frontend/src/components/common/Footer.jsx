import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer-section mt-5">
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-4">
          <h5>Pill Stream</h5>
          <p className="text-muted mb-1">Online pharmacy management system for BISMILLAH Pharmacy.</p>
          <p className="small text-muted">Some medicines may require a valid prescription. Please consult a doctor or pharmacist before using any medicine.</p>
        </div>
        <div className="col-md-2">
          <h6>Quick Links</h6>
          <ul className="list-unstyled">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h6>Contact</h6>
          <p className="mb-1">Email: info@pillstream.com</p>
          <p className="mb-1">Phone: +92 300 0000000</p>
          <p className="mb-0">Address: BISMILLAH Pharmacy, Lahore, Pakistan</p>
        </div>
        <div className="col-md-3">
          <h6>Service Promise</h6>
          <p className="text-muted">Fast ordering, safe product information, admin-reviewed prescription orders, and clean order tracking.</p>
        </div>
      </div>
      <hr />
      <p className="text-center mb-0 small">© {new Date().getFullYear()} Pill Stream — BISMILLAH Pharmacy. Academic demo project.</p>
    </div>
  </footer>
);

export default Footer;
