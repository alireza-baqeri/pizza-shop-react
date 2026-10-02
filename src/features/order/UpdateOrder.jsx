import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';
import { Zap, Loader2 } from 'lucide-react';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  const isUpdating = fetcher.state === 'submitting';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-1.5 font-bold text-stone-900">
          <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span>Need it even faster?</span>
        </div>
        <p className="mt-0.5 text-xs text-stone-500">
          Upgrade this order to Priority to expedite kitchen preparation and courier dispatch.
        </p>
      </div>

      <fetcher.Form method="PATCH" className="shrink-0">
        <Button
          type="primary"
          disabled={isUpdating}
          className="w-full gap-1.5 text-xs sm:w-auto"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Prioritizing...</span>
            </>
          ) : (
            <>
              <Zap className="h-3.5 w-3.5" />
              <span>Make priority</span>
            </>
          )}
        </Button>
      </fetcher.Form>
    </div>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
