import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type = 'primary', onClick, className = '' }) {
  const base =
    'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98] select-none';

  const styles = {
    primary:
      base +
      ' text-sm md:text-base rounded-xl md:rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-900 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/30 px-5 py-3 md:px-7 md:py-3.5',
    small:
      base +
      ' text-xs font-semibold rounded-lg md:rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-900 shadow-sm hover:shadow px-3.5 py-1.5 md:px-4 md:py-2',
    round:
      base +
      ' h-7 w-7 md:h-8 md:w-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 text-sm font-black',
    secondary:
      base +
      ' text-sm rounded-xl md:rounded-2xl border border-stone-200/90 bg-white hover:bg-stone-100 text-stone-700 shadow-sm px-5 py-2.5 md:px-6 md:py-3',
    danger:
      base +
      ' text-xs font-semibold rounded-lg md:rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200/60 px-3 py-1.5',
  };

  const combinedClasses = `${styles[type] || styles.primary} ${className}`.trim();

  if (to)
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={combinedClasses}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={combinedClasses}>
      {children}
    </button>
  );
}

export default Button;
