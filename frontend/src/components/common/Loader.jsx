const Loader = ({ text = 'Loading...' }) => (
  <div className="loader-wrap py-5 text-center">
    <div className="spinner-border text-success" role="status" aria-hidden="true" />
    <p className="mt-3 text-muted">{text}</p>
  </div>
);

export default Loader;
