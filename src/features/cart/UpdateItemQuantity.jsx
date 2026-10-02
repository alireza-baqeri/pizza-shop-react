import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import { Minus, Plus } from 'lucide-react';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-stone-200/90 bg-stone-50/90 p-0.5 shadow-sm">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        <Minus className="h-3 w-3 stroke-[3]" />
      </Button>
      <span className="min-w-[1.25rem] text-center text-xs font-black text-stone-800 md:text-sm">
        {currentQuantity}
      </span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        <Plus className="h-3 w-3 stroke-[3]" />
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
