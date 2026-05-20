'use client';

import { useState } from "react";
import { type MenuItem, type MenuCategory, CATEGORY_ORDER } from "@/lib/menuTypes";
import MenuItemCard from "./MenuItemCard";

const IMAGE_PATHS: Record<string, string> = {
  'Espresso': '/images/pexels-16234552.webp',
  'Cappuccino': '/images/pexels-312418.webp',
  'Latte Macchiato Caramel': '/images/pexels-585753.webp',
  'Flat White': '/images/pexels-36851643.webp',
  'Cortado': '/images/pexels-3024427.webp',
  'Americano': '/images/pexels-7855562.webp',
  'Cold Brew Éthiopien': '/images/pexels-18263139.webp',
  'Iced Latte Vanille': '/images/pexels-4109903.webp',
  'Frappé Caramel': '/images/pexels-4438014.webp',
  'Limonade Menthe-Citron': '/images/pexels-3651045.webp',
  'Smoothie Mangue-Passion': '/images/pexels-8813997.webp',
  'Croissant au Beurre': '/images/pexels-3892469.webp',
  'Pain au Chocolat': '/images/pexels-29078664.webp',
  'Tarte Citron Meringuée': '/images/pexels-16871505.webp',
  'Financier Amande-Noisette': '/images/pexels-6192431.webp',
  'Cheesecake Caramel Beurre Salé': '/images/pexels-14841923.webp',
  'Club Sandwich Classique': '/images/pexels-5639682.webp',
  'Sandwich Saumon-Avocat': '/images/pexels-2072867.webp',
  'Panini Poulet-Pesto': '/images/pexels-5555754.webp',
  'Tartine Végétarienne': '/images/pexels-1603901.webp',
};

const ALL = 'Tout';

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | typeof ALL>(ALL);

  const categories = [ALL, ...CATEGORY_ORDER] as const;

  const filtered = activeCategory === ALL
    ? items
    : items.filter(item => item.categorie === activeCategory);

  return (
    <div>
      <div role="tablist" aria-label="Catégories du menu" className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat as MenuCategory | typeof ALL)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[var(--color-caramel)] text-white shadow-sm'
                : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-caramel)] hover:text-[var(--color-caramel)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <MenuItemCard
            key={item.nom}
            item={item}
            imageSrc={IMAGE_PATHS[item.nom] ?? '/images/pexels-302899.webp'}
          />
        ))}
      </div>
    </div>
  );
}
