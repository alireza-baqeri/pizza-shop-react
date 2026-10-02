import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query.trim()}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-stone-400" />
      <input
        placeholder="Search order #..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full border border-stone-200/90 bg-stone-50/80 py-1.5 pl-8 pr-3 text-xs text-stone-800 shadow-sm transition-all duration-300 placeholder:text-stone-400 focus:w-44 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/20 sm:w-48 sm:py-2 sm:pl-9 sm:text-sm sm:focus:w-64"
      />
    </form>
  );
}

export default SearchOrder;
