import type { Metadata } from "next";
import Image from "next/image";
import { parseMenuCsv } from "@/lib/menuData";
import MenuGrid from "@/components/menu/MenuGrid";

export const metadata: Metadata = {
  title: "Menu — Brew & Co",
  description: "Découvrez notre menu de spécialités : boissons espresso, cold brew, pâtisseries fraîches et sandwiches artisanaux.",
};

export default function MenuPage() {
  const items = parseMenuCsv();

  return (
    <div>
      {/* Mini-hero avec image de fond */}
      <section className="relative h-[60vh] min-h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/pexels-585753.webp"
          alt="Café chez Brew & Co"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--color-espresso)]/80" />
        <div className="relative z-10 text-center container-site">
          <p className="eyebrow text-[var(--color-honey)] mb-3">47 Redchurch Street</p>
          <h1
            className="text-5xl md:text-6xl font-bold text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Notre menu
          </h1>
          <p className="text-[var(--color-almond)] mt-3 text-base">
            Tout est préparé le matin, tout est fait avec soin.
          </p>
        </div>
      </section>

      {/* Grille du menu */}
      <section className="section-padding bg-[var(--color-snow)]">
        <div className="container-site">
          <MenuGrid items={items} />
        </div>
      </section>
    </div>
  );
}
