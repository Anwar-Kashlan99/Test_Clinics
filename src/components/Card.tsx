export const Card = ({ children, className }) => (
  <div className={`rounded-md overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`rounded-t-md ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);
