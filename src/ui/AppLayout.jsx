import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-[#fcfbf9] text-stone-800">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-y-auto overflow-x-hidden">
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
