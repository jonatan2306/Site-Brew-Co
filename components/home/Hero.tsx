import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="/images/pexels-302899.webp"
        alt="Intérieur chaleureux de Brew & Co, Shoreditch"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Gradient : sombre à gauche pour lisibilité, laisse respirer le centre */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-espresso)]/92 via-[var(--color-espresso)]/55 to-[var(--color-espresso)]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-espresso)]/60 via-transparent to-[var(--color-espresso)]/30" />

      <div className="relative z-10 container-site py-32">
        <div className="max-w-2xl">
          {/* Eyebrow avec ligne décorative */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[var(--color-honey)]" />
            <p className="eyebrow text-[var(--color-honey)]">
              Specialty Coffee · Shoreditch, Londres
            </p>
          </div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-[var(--color-cream)] mb-6 leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Le café qui<br />
            vous{' '}
            <em className="italic text-[var(--color-honey)]">
              reconnecte
            </em>
          </h1>

          <p className="text-base md:text-lg text-[var(--color-almond)] max-w-lg mb-10 leading-relaxed">
            Grains d&apos;origine unique, pâtisseries faites le matin,
            et une équipe passionnée qui vous connaît par prénom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#reservation"
              className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-full bg-[var(--color-caramel)] text-white hover:bg-[var(--color-honey)] hover:text-[var(--color-espresso)] hover:shadow-[var(--shadow-glow-caramel)] transition-all duration-300"
            >
              Réserver une table
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center h-13 px-8 text-base font-semibold rounded-full border border-[var(--color-cream)]/50 text-[var(--color-cream)] hover:border-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 transition-all duration-300"
            >
              Voir le menu
            </Link>
          </div>

          <p className="mt-14 text-[var(--color-almond)]/50 text-xs tracking-[0.2em] uppercase">
            Est. 2018 — 47 Redchurch Street
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-[var(--color-almond)]/50 animate-bounce">
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="7" y1="0" x2="7" y2="13" />
          <polyline points="2,9 7,15 12,9" />
        </svg>
      </div>
    </section>
  );
}
