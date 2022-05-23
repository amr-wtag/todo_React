// Button Component
export const Button = ({ onClick, children, className, disabled }) => {
  return (
    <div>
      <button onClick={onClick} className={className} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};
