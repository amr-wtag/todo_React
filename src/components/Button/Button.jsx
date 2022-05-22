// Button Component
export const Button = ({ children, onClick, className, disabled }) => {
  return (
    <div>
      <button onClick={onClick} className={className} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};
