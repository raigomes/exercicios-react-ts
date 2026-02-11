import React from "react";

type ButtonProps = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

const Button = ({ total, setTotal }: ButtonProps) => {
  return (
    <button onClick={() => setTotal((t) => t + 1)}>Incrementar {total}</button>
  );
};

export default Button;
