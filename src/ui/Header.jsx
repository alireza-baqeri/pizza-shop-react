import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
function Header() {
  return (
    <header className="border-b-8 border-stone-300
     bg-yellow-600 px-4 py-3 text-center uppercase
      sm:px-6">
      
      <Link className="tracking-widest" to="/">
        Fast React Pizza
      </Link>
      <Username />
      <SearchOrder />
      
    </header>
  );
}

export default Header;
