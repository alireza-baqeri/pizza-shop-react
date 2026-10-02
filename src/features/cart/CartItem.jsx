import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="flex flex-col gap-3 p-4 transition-colors hover:bg-stone-50/70 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100/90 text-xs font-black text-amber-900 shadow-sm">
          {quantity}&times;
        </span>
        <span className="font-display font-bold text-stone-900 sm:text-base">
          {name}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 sm:gap-6">
        <span className="font-display text-base font-black text-amber-600 sm:text-lg">
          {formatCurrency(totalPrice)}
        </span>

        <div className="flex items-center gap-2">
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
