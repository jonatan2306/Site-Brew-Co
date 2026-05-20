import Image from "next/image";
import Link from "next/link";
import { getFeaturedItems } from "@/lib/menuData";
import Badge, { getBadgeVariant } from "@/components/ui/Badge";

const FEATURED_IMAGE_PATHS: Record<string, string> = {
  'Cappuccino': '/images/pexels-312418.webp',
  'Latte Macchiato Caramel': '/images/pexels-585753.webp',
  'Iced Latte Vanille': '/images/pexels-6205791.webp',
  'Frappé Caramel': '/images/pexels-4109903.webp',
  'Club Sandwich Classique': '/images/pexels-1600711.webp',
  'Sandwich Saumon-Avocat': '/images/pexels-2097090.webp',
  'Pain au Chocolat': '/images/pexels-1775283.webp',
  'Cheesecake Caramel Beurre Salé': '/images/pexels-2693447.webp',
};

export default function FeaturedItems() {
  const items = getFeaturedItems();

  return (
    <section className="section-padding bg-[var(--color-snow)]">
      <div className="container-site">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Nos incontournables</p>
          <h2
            className="text-4xl md:text-5xl font-light text-[var(--color-espresso)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Les favoris de la maison
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => {
            const imageSrc = FEATURED_IMAGE_PATHS[item.nom] ?? '/images/pexels-302899.webp';
            return (
              <div
                key={item.nom}
                className="bg-white rounded-2xl overflow-hidden border border-[var(--color-border-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <Image
                    src={imageSrc}
                    alt={item.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {item.badge && (
                    <Badge variant={getBadgeVariant(item.badge)} className="mb-3 self-start">
                      {item.badge}
                    </Badge>
                  )}
                  <h3
                    className="text-xl font-semibold text-[var(--color-espresso)] mb-1.5 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.nom}
                  </h3>
                  <div className="w-8 h-0.5 bg-[var(--color-caramel)] mb-3" />
                  <p className="text-[var(--color-text-subtle)] text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-bold text-[var(--color-caramel)] text-lg">
                    {item.prix.toFixed(2)} €
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-full border-2 border-[var(--color-caramel)] text-[var(--color-caramel)] hover:bg-[var(--color-caramel)] hover:text-white hover:shadow-[var(--shadow-glow-caramel)] transition-all duration-300"
          >
            Voir tout le menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
