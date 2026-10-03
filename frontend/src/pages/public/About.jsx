const About = () => (
  <section className="container py-5">
    <div className="row g-4 align-items-center">
      <div className="col-lg-7">
        <span className="badge bg-success-subtle text-success mb-3">About Pill Stream</span>
        <h1>Modern online pharmacy system for BISMILLAH Pharmacy</h1>
        <p className="lead text-muted">Pill Stream is a MERN stack final year project designed to modernize medicine browsing, customer ordering, checkout, stock control, order tracking, and admin reporting.</p>
        <p>The system replaces a traditional PHP/MySQL style pharmacy store with a scalable Node.js API, MongoDB database, JWT authentication, role-based authorization, and a responsive React interface.</p>
        <div className="alert alert-warning">This application does not provide medical advice. Product dosage and information are displayed from admin-entered data only.</div>
      </div>
      <div className="col-lg-5">
        <div className="card border-0 shadow-sm p-4">
          <h4>Core Modules</h4>
          <ul className="mb-0">
            <li>Customer registration and login</li>
            <li>Medicine catalog and search</li>
            <li>Cart and checkout</li>
            <li>Prescription upload structure</li>
            <li>Admin product, category, user and order management</li>
            <li>Sales and dashboard reporting</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default About;
