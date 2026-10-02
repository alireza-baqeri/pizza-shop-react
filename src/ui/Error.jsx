import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="mx-auto my-12 max-w-md rounded-3xl border border-stone-200/80 bg-white p-8 text-center shadow-soft">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-500 shadow-sm">
        <AlertTriangle className="h-8 w-8 stroke-[1.8]" />
      </div>

      <h1 className="font-display text-2xl font-black text-stone-900">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-stone-500">
        {error.data || error.message || 'An unexpected error occurred.'}
      </p>

      <div className="mt-6 flex justify-center">
        <LinkButton to="-1" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Go back</span>
        </LinkButton>
      </div>
    </div>
  );
}

export default Error;
