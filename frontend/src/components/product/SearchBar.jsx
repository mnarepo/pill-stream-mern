import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ initial = '', large = false }) => {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <form onSubmit={submit} className={`search-bar ${large ? 'search-bar-large' : ''}`}>
      <div className="input-group">
        <input value={q} onChange={(e) => setQ(e.target.value)} className="form-control" placeholder="Search medicines, vitamins, cough syrup..." />
        <button className="btn btn-success" type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
