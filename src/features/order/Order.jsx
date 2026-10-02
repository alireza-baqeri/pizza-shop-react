// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router-dom';

import OrderItem from './OrderItem';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

import { Clock, Zap, ArrowLeft, Receipt } from 'lucide-react';
import LinkButton from '../../ui/LinkButton';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher]
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6">
      <LinkButton to="/menu">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to menu</span>
      </LinkButton>

      {/* Order Status Header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Live Order Tracking
          </span>
          <h2 className="font-display text-2xl font-black text-stone-900 sm:text-3xl">
            Order #{id}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {priority && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100/80 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-900 shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Priority</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{status}</span>
          </span>
        </div>
      </div>

      {/* Estimated Delivery Banner */}
      <div className="flex flex-col gap-3 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20">
            <Clock className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <p className="font-display text-base font-black text-stone-900 sm:text-lg">
              {deliveryIn >= 0
                ? `Only ${deliveryIn} minutes left until delivery! 🍕`
                : 'Order should have arrived! Enjoy your meal 🍕'}
            </p>
            <p className="text-xs text-stone-500">
              Estimated delivery: {formatDate(estimatedDelivery)}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-soft">
        <div className="border-b border-stone-100 bg-stone-50/70 px-5 py-3.5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-stone-700">
            Pizzas in this order ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h3>
        </div>

        <ul className="divide-y divide-stone-100">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
            />
          ))}
        </ul>
      </div>

      {/* Cost Breakdown */}
      <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Receipt className="h-4 w-4 text-amber-500" />
          <h3 className="font-display text-base font-bold text-stone-900">
            Payment Breakdown
          </h3>
        </div>

        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-stone-600">
            <span>Price of pizzas</span>
            <span className="font-medium text-stone-800">{formatCurrency(orderPrice)}</span>
          </div>

          {priority && (
            <div className="flex items-center justify-between text-amber-600 font-semibold">
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" />
                Priority surcharge
              </span>
              <span>+{formatCurrency(priorityPrice)}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-stone-200 pt-3">
            <div>
              <span className="font-display text-base font-black text-stone-900 sm:text-lg">
                To pay on delivery
              </span>
              <p className="text-[11px] text-stone-400">Cash on delivery payment</p>
            </div>
            <span className="font-display text-xl font-black text-amber-600 sm:text-2xl">
              {formatCurrency(orderPrice + priorityPrice)}
            </span>
          </div>
        </div>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
