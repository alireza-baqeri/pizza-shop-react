import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { Trash2 } from 'lucide-react';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="danger"
      onClick={() => dispatch(deleteItem(pizzaId))}
      className="gap-1.5"
    >
      <Trash2 className="h-3 w-3" />
      <span>Delete</span>
    </Button>
  );
}

export default DeleteItem;
