import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

import { User, Phone, MapPin, Zap, Navigation, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import LinkButton from '../../ui/LinkButton';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="space-y-6">
      <LinkButton to="/cart">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to cart</span>
      </LinkButton>

      <div>
        <h2 className="font-display text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
          Complete Your Order
        </h2>
        <p className="mt-1 text-xs text-stone-500 sm:text-sm">
          Please confirm your delivery details. Pay conveniently with cash on delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form Details */}
        <div className="lg:col-span-7">
          <Form method="POST" className="space-y-5">
            {/* Customer Name */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  className="input w-full pl-10"
                  type="text"
                  name="customer"
                  defaultValue={username}
                  placeholder="e.g. Mario Rossi"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  className={`input w-full pl-10 ${
                    formErrors?.phone ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-400/20' : ''
                  }`}
                  type="tel"
                  name="phone"
                  placeholder="e.g. +1 555 123 4567"
                  required
                />
              </div>
              {formErrors?.phone && (
                <p className="mt-1.5 rounded-lg bg-rose-50 p-2 text-xs font-medium text-rose-600">
                  {formErrors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Delivery Address
                </label>
              </div>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  className="input w-full pl-10 pr-28"
                  type="text"
                  name="address"
                  disabled={isLoadingAddress}
                  defaultValue={address}
                  placeholder="Street, building number, apartment..."
                  required
                />

                {!position.latitude && !position.longitude && (
                  <span className="absolute right-2 top-2">
                    <Button
                      disabled={isLoadingAddress}
                      type="small"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(fetchAddress());
                      }}
                      className="gap-1 text-xs"
                    >
                      {isLoadingAddress ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Navigation className="h-3.5 w-3.5" />
                      )}
                      <span>{isLoadingAddress ? 'Locating...' : 'Get GPS'}</span>
                    </Button>
                  </span>
                )}
              </div>

              {addressStatus === 'error' && (
                <p className="mt-1.5 rounded-lg bg-rose-50 p-2 text-xs font-medium text-rose-600">
                  {errorAddress}
                </p>
              )}
            </div>

            {/* Priority Delivery Checkbox Card */}
            <label
              htmlFor="priority"
              className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-all duration-200 ${
                withPriority
                  ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-amber-200'
              }`}
            >
              <input
                className="mt-1 h-5 w-5 rounded border-stone-300 accent-amber-500 focus:ring-amber-400"
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <div className="grow">
                <div className="flex items-center gap-1.5">
                  <Zap className={`h-4 w-4 ${withPriority ? 'text-amber-500 fill-amber-500' : 'text-stone-400'}`} />
                  <span className="text-sm font-bold text-stone-900">
                    Express Priority Baking & Delivery
                  </span>
                  <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-black uppercase text-amber-950">
                    +20%
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-stone-500">
                  Pushes your order to the front of the queue for ultra-fast stone oven baking and expedited dispatch.
                </p>
              </div>
            </label>

            {/* Hidden Fields for Action */}
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.longitude && position.latitude
                  ? `${position.latitude},${position.longitude}`
                  : ''
              }
            />

            <div className="pt-2">
              <Button
                disabled={isSubmitting || isLoadingAddress}
                type="primary"
                className="w-full gap-2 text-base shadow-lg shadow-amber-500/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Placing order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Order now &bull; {formatCurrency(totalPrice)}</span>
                  </>
                )}
              </Button>
            </div>
          </Form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-soft">
            <h3 className="border-b border-stone-100 pb-3 font-display text-base font-bold text-stone-900">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            <div className="my-4 max-h-56 divide-y divide-stone-100 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.pizzaId} className="flex items-center justify-between py-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600">{item.quantity}&times;</span>
                    <span className="font-medium text-stone-800">{item.name}</span>
                  </div>
                  <span className="font-bold text-stone-700">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-stone-100 pt-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-stone-500">
                <span>Pizzas subtotal</span>
                <span>{formatCurrency(totalCartPrice)}</span>
              </div>
              {withPriority && (
                <div className="flex items-center justify-between text-amber-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" />
                    Priority surcharge
                  </span>
                  <span>+{formatCurrency(priorityPrice)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-stone-500">
                <span>Payment method</span>
                <span className="font-medium text-stone-700">Cash on delivery</span>
              </div>
              <div className="flex items-center justify-between border-t border-stone-200 pt-3 font-display text-lg font-black text-stone-900">
                <span>Total to pay</span>
                <span className="text-amber-600">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
