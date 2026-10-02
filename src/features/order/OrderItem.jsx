import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex flex-col gap-1.5 p-4 transition-colors hover:bg-stone-50/70 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100/90 text-xs font-black text-amber-900 shadow-sm">
            {quantity}&times;
          </span>
          <span className="font-display font-bold text-stone-900 sm:text-base">
            {name}
          </span>
        </div>
        <span className="font-display text-sm font-black text-amber-600 sm:text-base">
          {formatCurrency(totalPrice)}
        </span>
      </div>
      <p className="text-xs capitalize leading-relaxed text-stone-500 pl-8">
        {isLoadingIngredients ? (
          <span className="italic text-stone-400">Loading ingredients...</span>
        ) : (
          ingredients.join(', ')
        )}
      </p>
    </li>
  );
}

export default OrderItem;
