import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';

import { Plus } from 'lucide-react';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className={`group flex flex-col justify-between rounded-2xl border bg-white p-4 shadow-soft transition-all duration-300 sm:flex-row sm:gap-4 ${
      soldOut 
        ? 'border-stone-200/60 bg-stone-50/60 opacity-80' 
        : isInCart 
        ? 'border-amber-300/80 shadow-md ring-1 ring-amber-300/50' 
        : 'border-stone-200/80 hover:border-amber-200 hover:shadow-md'
    }`}>
      <div className="flex gap-4">
        {/* Pizza Image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 shadow-sm sm:h-28 sm:w-28">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              soldOut ? 'grayscale filter' : ''
            }`}
          />
          {soldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow">
                Sold out
              </span>
            </div>
          )}
          {isInCart && !soldOut && (
            <div className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white shadow">
              {currentQuantity}
            </div>
          )}
        </div>

        {/* Pizza Details */}
        <div className="flex grow flex-col justify-between py-0.5">
          <div>
            <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors sm:text-lg">
              {name}
            </h3>
            <p className="mt-0.5 text-xs capitalize leading-relaxed text-stone-500 line-clamp-2">
              {ingredients.join(', ')}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 sm:hidden">
            {!soldOut ? (
              <span className="font-display text-base font-black text-amber-600">
                {formatCurrency(unitPrice)}
              </span>
            ) : (
              <span className="text-xs font-bold uppercase text-stone-400">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action / Price on Desktop/Tablet & Bottom on Mobile */}
      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 sm:mt-0 sm:flex-col sm:items-end sm:justify-between sm:border-0 sm:pt-0">
        <div className="hidden sm:block">
          {!soldOut ? (
            <span className="font-display text-lg font-black text-amber-600">
              {formatCurrency(unitPrice)}
            </span>
          ) : (
            <span className="text-xs font-bold uppercase text-stone-400">
              Unavailable
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isInCart && (
            <div className="flex items-center gap-2">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button
              type="small"
              onClick={handleAddToCart}
              className="gap-1 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add to cart</span>
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
