// Tag
export const Tag = ({ children, id, className }) => {
  return (
    <div>
      <label id={id} className={className}>
        {children}
      </label>
    </div>
  );
};
