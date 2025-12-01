import React from "react";
import clsx from "clsx";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base =
    "btn font-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "bg-transparent hover:bg-offwhite text-dark",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
