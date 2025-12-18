// src/components/Button.tsx

import clsx from "clsx";
import css from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  onClick?: () => void;
}

export default function Button({ variant, text, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(css.button, variant && css[variant])}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
