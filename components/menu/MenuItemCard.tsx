import Image from "next/image";
import Badge, { getBadgeVariant } from "@/components/ui/Badge";
import { type MenuItem } from "@/lib/menuTypes";

interface MenuItemCardProps {
  item: MenuItem;
  imageSrc: string;
}

export default function MenuItemCard({ item, imageSrc }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[var(--color-border-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={imageSrc}
          alt={item.nom}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {item.badge && (
          <Badge variant={getBadgeVariant(item.badge)} className="mb-3 self-start">
            {item.badge}
          </Badge>
        )}
        <h3
          className="text-lg font-semibold text-[var(--color-espresso)] mb-1.5 leading-snug"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {item.nom}
        </h3>
        <div className="w-6 h-0.5 bg-[var(--color-caramel)] mb-3" />
        <p className="text-[var(--color-text-subtle)] text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>
        <p className="font-bold text-[var(--color-caramel)] text-lg">
          {item.prix.toFixed(2)} €
        </p>
      </div>
    </div>
  );
}
