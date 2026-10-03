import placeholder from '../assets/images/placeholder-medicine.svg';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const imageUrl = (path) => {
  if (!path) return placeholder;
  if (path.startsWith('http')) return path;
  return `${backendUrl}${path}`;
};

export default imageUrl;
