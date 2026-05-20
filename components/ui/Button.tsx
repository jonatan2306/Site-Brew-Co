import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-caramel)] text-white hover:bg-[var(--color-honey)] hover:text-[var(--color-espresso)]',
  secondary: 'bg-[var(--color-espresso)] text-[var(--color-cream)] hover:bg-[var(--color-coffee)]',
  outline: 'border-2 border-[var(--color-caramel)] text-[var(--color-caramel)] hover:bg-[var(--color-caramel)] hover:text-white',
  ghost: 'text-[var(--color-text)] hover:bg-[var(--color-parchment)]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-13 px-8 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
}
