const formatCurrency = (amount = 0) => `PKR ${Number(amount).toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
export default formatCurrency;
