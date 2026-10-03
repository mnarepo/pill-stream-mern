import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={2500} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
