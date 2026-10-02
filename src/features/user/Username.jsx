import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-bold text-amber-900 shadow-sm md:flex">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-stone-900">
        <User className="h-3 w-3" />
      </span>
      <span className="max-w-[120px] truncate">{username}</span>
    </div>
  );
}

export default Username;
