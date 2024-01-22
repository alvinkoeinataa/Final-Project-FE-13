const Button = (props) => {
  const { children, classname = "bg-blue-600", onClick = () => {}, type = "submit" } = props;
  return (
    <button type={type} className={`mt-4 ${classname} text-white px-4 py-2 rounded `} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
