// Input Component
export const Input = ({ id, className, onChange, autoFocus }) => {
  return (
    <input
      id={id}
      className={className}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
};
