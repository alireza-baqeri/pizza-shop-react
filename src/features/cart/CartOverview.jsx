import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="sticky bottom-0 z-30 border-t border-stone-800/60 bg-stone-900/95 px-4 py-3 text-stone-100 shadow-2xl backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 sm:text-sm">
              {totalCartQuantity} {totalCartQuantity === 1 ? 'pizza' : 'pizzas'}
            </span>
            <span className="hidden text-stone-600 sm:inline">•</span>
            <span className="font-display text-base font-black text-white sm:text-lg">
              {formatCurrency(totalCartPrice)}
            </span>
          </div>
        </div>

        <Link
          to="/cart"
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-bold text-stone-950 shadow-md shadow-amber-500/20 transition-all duration-200 hover:from-amber-300 hover:to-amber-400 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <span>Open cart</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;
