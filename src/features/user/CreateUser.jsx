import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight } from 'lucide-react';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) return;
    dispatch(updateName(username.trim()));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p className="mb-4 text-sm font-medium text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <div className="relative mb-5 w-full max-w-sm">
        <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Enter your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input w-full pl-10 text-center text-sm font-medium focus:text-left sm:text-base"
        />
      </div>

      {username !== '' && (
        <div className="animate-fade-in">
          <Button type="primary" className="gap-2">
            <span>Start ordering</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
