import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to, className = '' }) {
  const navigate = useNavigate();
  const baseClasses =
    'inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all duration-200 hover:text-amber-700 hover:underline underline-offset-4';

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (to === '-1')
    return (
      <button className={combinedClasses} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={combinedClasses}>
      {children}
    </Link>
  );
}

export default LinkButton;
