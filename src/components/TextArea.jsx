// TextArea Component
export const TextArea = ({
  className,
  placeholder,
  autoFocus,
  onChange,
  readOnly,
  onKeyPress,
  onFocus,
  value,
}) => {
  return (
    <textarea
      className={className}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={onChange}
      readOnly={readOnly}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      value={value}
    />
  );
};
