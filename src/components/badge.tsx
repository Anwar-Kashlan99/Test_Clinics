export const Badge = ({ children, className, style }) => (
  <span
    className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${className}`}
    style={style}
  >
    {children}
  </span>
);
