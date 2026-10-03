const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A');
export default formatDate;
