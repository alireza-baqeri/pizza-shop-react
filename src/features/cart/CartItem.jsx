import {formatCurrency } from '../../utils/helpers'
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='sm:gap-6 flex justify-between items-center'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
