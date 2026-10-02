import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="space-y-6">
      {/* Menu Header */}
      <div className="flex flex-col gap-2 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
            Our Artisan Menu
          </h2>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">
            Hand-stretched slow-fermented dough, baked hot in wood-fired stone ovens.
          </p>
        </div>
        <div className="self-start rounded-full bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-900 sm:self-auto">
          {menu.length} Varieties Available
        </div>
      </div>

      {/* Grid of Pizzas */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
