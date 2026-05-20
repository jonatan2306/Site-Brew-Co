import { type ReactNode } from "react";

export type BadgeVariant = 'caramel' | 'honey' | 'new' | 'muted';

const variantStyles: Record<BadgeVariant, string> = {
  caramel: 'bg-[var(--color-caramel)] text-white',
  honey: 'bg-[var(--color-honey)] text-[var(--color-espresso)]',
  new: 'bg-[var(--color-espresso)] text-[var(--color-honey)]',
  muted: 'bg-[var(--color-parchment)] text-[var(--color-mahogany)]',
};

export function getBadgeVariant(badge: string | null): BadgeVariant {
  if (badge === 'Populaire') return 'caramel';
  if (badge === 'Favori de la maison') return 'honey';
  if (badge === 'Nouveau') return 'new';
  return 'muted';
}

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = 'caramel', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
