import Link from "next/link";
import { navLinks } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-coffee)] text-[var(--color-cream)]">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-2xl font-bold text-[var(--color-honey)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Brew & Co
            </p>
            <p className="text-[var(--color-almond)]/60 text-xs tracking-widest uppercase mb-5">Est. 2018 · Shoreditch</p>
            <p className="text-[var(--color-almond)] text-sm leading-relaxed">
              Café de spécialité au cœur de Shoreditch.<br />
              Grains d&apos;origine unique, pâtisseries fraîches,<br />
              communauté chaleureuse.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-honey)] mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-almond)] hover:text-[var(--color-cream)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[var(--color-honey)] mb-4">Nous trouver</p>
            <address className="not-italic text-[var(--color-almond)] text-sm space-y-1.5">
              <p>47 Redchurch Street</p>
              <p>Shoreditch, London E2 7DJ</p>
              <p className="mt-3">
                <a href="tel:+442079460127" className="hover:text-[var(--color-cream)] transition-colors duration-200">
                  +44 20 7946 0127
                </a>
              </p>
              <p>
                <a href="mailto:hello@brewandco.london" className="hover:text-[var(--color-cream)] transition-colors duration-200">
                  hello@brewandco.london
                </a>
              </p>
            </address>
            <div className="mt-5">
              <p className="eyebrow text-[var(--color-honey)] mb-2">Horaires</p>
              <p className="text-[var(--color-almond)] text-sm">Lun–Ven · 7h30–18h30</p>
              <p className="text-[var(--color-almond)] text-sm">Sam · 8h00–19h00</p>
              <p className="text-[var(--color-almond)] text-sm">Dim · 9h00–17h00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-roast)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-subtle)] text-xs">
            © {new Date().getFullYear()} Brew & Co. Tous droits réservés.
          </p>
          <p className="text-[var(--color-text-subtle)] text-xs">
            47 Redchurch Street, Shoreditch, London
          </p>
        </div>
      </div>
    </footer>
  );
}
