import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getLoggedInUser, loginUser, registerUser, updateProfile as updateProfileApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('pillstream_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pillstream_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  const saveSession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem('pillstream_user', JSON.stringify(nextUser));
    localStorage.setItem('pillstream_token', nextToken);
  };

  const login = async (payload) => {
    const { data } = await loginUser(payload);
    saveSession(data.data.user, data.data.token);
    toast.success('Login successful');
    return data.data.user;
  };

  const register = async (payload) => {
    const { data } = await registerUser(payload);
    saveSession(data.data.user, data.data.token);
    toast.success('Registration successful');
    return data.data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pillstream_user');
    localStorage.removeItem('pillstream_token');
    toast.info('Logged out');
  };

  const getProfile = async () => {
    const { data } = await getLoggedInUser();
    setUser(data.data.user);
    localStorage.setItem('pillstream_user', JSON.stringify(data.data.user));
    return data.data.user;
  };

  const updateProfile = async (payload) => {
    const { data } = await updateProfileApi(payload);
    setUser(data.data.user);
    localStorage.setItem('pillstream_user', JSON.stringify(data.data.user));
    toast.success('Profile updated');
    return data.data.user;
  };

  useEffect(() => {
    const bootstrapUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        await getProfile();
      } catch (error) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('pillstream_user');
        localStorage.removeItem('pillstream_token');
      } finally {
        setLoading(false);
      }
    };
    bootstrapUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === 'admin'
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
