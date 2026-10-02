import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

function EmptyCart() {
  return (
    <div className="space-y-6">
      <LinkButton to="/menu">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to menu</span>
      </LinkButton>

      <div className="mx-auto my-12 max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-100/80 text-amber-600 shadow-inner">
          <ShoppingBag className="h-12 w-12 stroke-[1.5]" />
        </div>

        <h2 className="font-display text-2xl font-black text-stone-900 sm:text-3xl">
          Your cart is feeling empty!
        </h2>
        <p className="mt-2 text-sm text-stone-500 sm:text-base">
          Looks like you haven't added any delicious pizzas yet.
          Explore our oven-baked specialties and satisfy your cravings.
        </p>

        <div className="mt-8">
          <Button to="/menu" type="primary" className="gap-2">
            <span>Explore our menu</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
