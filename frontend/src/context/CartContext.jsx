import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { addToCartApi, clearCartApi, getCartApi, removeCartItemApi, updateCartItemApi } from '../api/cartApi';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    if (!isAuthenticated) return null;
    setLoading(true);
    try {
      const { data } = await getCartApi();
      setCart(data.data.cart);
      return data.data.cart;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await addToCartApi(productId, quantity);
    setCart(data.data.cart);
    toast.success('Product added to cart');
    return data.data.cart;
  };

  const updateCartItem = async (productId, quantity) => {
    const { data } = await updateCartItemApi(productId, quantity);
    setCart(data.data.cart);
    toast.success('Cart updated');
    return data.data.cart;
  };

  const removeFromCart = async (productId) => {
    const { data } = await removeCartItemApi(productId);
    setCart(data.data.cart);
    toast.info('Item removed');
    return data.data.cart;
  };

  const clearCart = async () => {
    const { data } = await clearCartApi();
    setCart(data.data.cart);
    return data.data.cart;
  };

  useEffect(() => {
    if (isAuthenticated) getCart();
    else setCart(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const value = useMemo(() => ({
    cart,
    cartItems: cart?.items || [],
    cartTotal: cart?.totalAmount || 0,
    cartCount: cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    loading,
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    setCart
  }), [cart, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
