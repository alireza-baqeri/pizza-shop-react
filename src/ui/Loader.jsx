import { Pizza } from 'lucide-react';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/25 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-stone-200/80 bg-white/95 px-8 py-6 shadow-2xl backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          <div className="loader"></div>
          <Pizza className="absolute h-5 w-5 text-amber-500 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="font-display text-sm font-bold text-stone-900">
            Baking fresh experiences...
          </p>
          <p className="text-[11px] text-stone-400">Fast React Pizza Co.</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
