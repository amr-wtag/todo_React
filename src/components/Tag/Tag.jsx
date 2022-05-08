// Tag
export const Tag = ({ children, id, className }) => {
  return (
    <label id={id} className={className}>
      {children}
    </label>
  );
};
