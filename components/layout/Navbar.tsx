'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-espresso)]/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site">
        <nav className="flex items-center justify-between h-[var(--header-height)]">
          <Link
            href="/"
            className="text-xl font-bold text-[var(--color-honey)] hover:text-[var(--color-caramel)] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Brew & Co
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    pathname === link.href
                      ? 'text-[var(--color-honey)]'
                      : 'text-[var(--color-cream)] hover:text-[var(--color-honey)]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-[var(--color-honey)] transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#reservation"
            className="hidden md:inline-flex items-center h-9 px-5 text-sm font-semibold rounded-full bg-[var(--color-caramel)] text-white hover:bg-[var(--color-honey)] hover:text-[var(--color-espresso)] hover:shadow-[var(--shadow-glow-caramel)] transition-all duration-300"
          >
            Réserver
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu de navigation"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className={`block w-6 h-0.5 bg-[var(--color-cream)] transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--color-cream)] transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--color-cream)] transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {isMobileOpen && (
        <div id="mobile-nav" className="md:hidden bg-[var(--color-espresso)] border-t border-[var(--color-roast)]">
          <div className="container-site py-6">
            <ul className="flex flex-col gap-5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`text-base font-medium ${
                      pathname === link.href
                        ? 'text-[var(--color-honey)]'
                        : 'text-[var(--color-cream)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#reservation"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center h-11 px-6 text-sm font-semibold rounded-full bg-[var(--color-caramel)] text-white"
                >
                  Réserver une table
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
