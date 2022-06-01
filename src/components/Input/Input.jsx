// Input Component
export const Input = ({ id, className, onChange, autoFocus, readOnly }) => {
  return (
    <input
      id={id}
      className={className}
      onChange={onChange}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  );
};
