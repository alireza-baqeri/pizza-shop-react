import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="space-y-6">
      <LinkButton to="/menu">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to menu</span>
      </LinkButton>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
            Your Cart
          </h2>
          <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">
            Ordering delicious hot slices for{' '}
            <span className="font-semibold text-stone-800">{username}</span>
          </p>
        </div>
        <div className="self-start rounded-full bg-amber-100/90 px-3.5 py-1 text-xs font-bold text-amber-900 sm:self-auto">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Selected
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-soft">
        <ul className="divide-y divide-stone-100">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>

        {/* Subtotal bar */}
        <div className="flex items-center justify-between border-t border-stone-200/80 bg-stone-50/80 px-4 py-4 sm:px-6">
          <span className="text-sm font-semibold text-stone-600 sm:text-base">
            Total Amount
          </span>
          <span className="font-display text-lg font-black text-amber-600 sm:text-xl">
            {formatCurrency(totalCartPrice)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button to="/order/new" type="primary" className="gap-2">
          <span>Proceed to order</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          type="secondary"
          onClick={() => dispatch(clearCart())}
          className="gap-2 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear cart</span>
        </Button>
      </div>
    </div>
  );
}

export default Cart;
