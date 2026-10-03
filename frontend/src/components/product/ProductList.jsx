import ProductCard from './ProductCard';
import Alert from '../common/Alert';

const ProductList = ({ products = [] }) => {
  if (!products.length) return <Alert type="info">No products found.</Alert>;
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-sm-6 col-lg-4 col-xl-3" key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
