import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
import { Sparkles, Zap, Flame, Award, ArrowRight } from 'lucide-react';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-6 px-4 text-center sm:my-12">
      {/* Top promotional pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-sm backdrop-blur-sm">
        <Flame className="h-4 w-4 text-amber-600 animate-pulse" />
        <span>Authentic Wood-Fired Slices</span>
        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
      </div>

      {/* Hero Headline */}
      <h1 className="mt-6 font-display text-3xl font-black tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
        The best pizza.
        <br />
        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          Straight out of the oven,
        </span>
        <br />
        <span>straight to you.</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base md:text-lg">
        Crispy golden crust, bubbling fresh mozzarella, and artisanal Italian toppings.
        Baked at 450°C and delivered hot to your doorstep.
      </p>

      {/* Trust features */}
      <div className="mx-auto my-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-stone-600 sm:text-sm">
        <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-sm">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Under 30 Min Delivery</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-sm">
          <Award className="h-4 w-4 text-amber-500" />
          <span>100% Fresh Ingredients</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 shadow-sm">
          <span className="text-amber-500">★</span>
          <span>4.9 / 5 Rating</span>
        </div>
      </div>

      {/* Action Card */}
      <div className="mx-auto max-w-lg rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8">
        {username === '' ? (
          <CreateUser />
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-medium text-stone-600">
              Welcome back, <span className="font-bold text-stone-900">{username}</span>! Ready for another delicious meal?
            </p>
            <Button to="/menu" type="primary" className="gap-2 text-base">
              <span>Continue ordering</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
