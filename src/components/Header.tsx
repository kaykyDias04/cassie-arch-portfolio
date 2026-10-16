'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const sectionIds = ['home', 'projetos', 'sobre', 'contato'];

const navLinks = [
  { href: '/#home', label: 'Home', section: 'home' },
  { href: '/#projetos', label: 'Projetos', section: 'projetos' },
  { href: '/#sobre', label: 'Sobre', section: 'sobre' },
  { href: '/#contato', label: 'Contato', section: 'contato' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for transparent-to-solid header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer to track which section is in view
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split('#')[1];
      if (!hash) return;

      if (pathname === '/') {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          const headerOffset = hash === 'projetos' ? 0 : 80;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
          window.history.pushState(null, '', `#${hash}`);
        }
      }

      setMenuOpen(false);
    },
    [pathname]
  );

  const isActive = (section: string) => {
    if (pathname !== '/') return false;
    return activeSection === section;
  };

  const isOnHero = pathname === '/' && activeSection === 'home' && !scrolled;
  const isHeaderTransparent = isOnHero && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHeaderTransparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-border-light shadow-xs'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-semibold text-[15px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                isHeaderTransparent ? 'text-white' : 'text-title-black'
              }`}
            >
              Cássia
            </span>
            <span
              className={`font-semibold text-[15px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                isHeaderTransparent ? 'text-white' : 'text-luminex-red'
              }`}
            >
              Victória
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const active = isActive(link.section);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  active
                    ? isHeaderTransparent
                      ? 'text-white font-semibold'
                      : 'text-luminex-red font-semibold'
                    : isHeaderTransparent
                    ? 'text-white/75 font-medium hover:text-white'
                    : 'text-text-grey font-medium hover:text-title-black'
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ${
                      isHeaderTransparent ? 'bg-white' : 'bg-luminex-red'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          className={`md:hidden p-2.5 rounded-lg transition-colors duration-300 cursor-pointer ${
            isHeaderTransparent
              ? 'text-white hover:bg-white/10'
              : 'text-title-black hover:bg-surface'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-b border-border-light shadow-lg animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-2" aria-label="Navegação mobile">
            {navLinks.map((link) => {
              const active = isActive(link.section);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                    active
                      ? 'bg-luminex-red/10 text-luminex-red font-semibold'
                      : 'text-title-black/80 hover:bg-surface font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-luminex-red" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
