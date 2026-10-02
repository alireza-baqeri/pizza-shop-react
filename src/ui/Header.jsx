import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { Pizza } from 'lucide-react';

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-8 shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25">
            <Pizza className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-tight text-stone-900 sm:text-xl">
              FAST REACT <span className="text-amber-500">PIZZA</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-amber-600 sm:block -mt-1">
              Stone Oven Co.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <SearchOrder />
          <Username />
        </div>
      </div>
    </header>
  );
}

export default Header;
