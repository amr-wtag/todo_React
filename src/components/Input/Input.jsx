// Input Component
export const Input = ({ id, className, onKeyUp, autoFocus, readOnly }) => {
  return (
    <input
      id={id}
      className={className}
      onKeyUp={onKeyUp}
      autoFocus={autoFocus}
      readOnly={readOnly}
    />
  );
};
