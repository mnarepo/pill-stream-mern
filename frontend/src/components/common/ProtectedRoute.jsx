import { Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader text="Checking session..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export default ProtectedRoute;
