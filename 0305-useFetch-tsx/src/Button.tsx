import React from "react";

type ButtonProps = React.ComponentProps<"button">;

const Button = ({ onClick, children, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
