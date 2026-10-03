export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== '';
export const minLength = (value, length) => String(value || '').length >= length;
export const positiveNumber = (value) => Number(value) > 0;
export const nonNegativeNumber = (value) => Number(value) >= 0;
