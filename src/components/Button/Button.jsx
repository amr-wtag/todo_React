// Button Component
export const Button = ({ children, onClick, type, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
