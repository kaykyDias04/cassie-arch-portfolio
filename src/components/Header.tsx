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

  // Monitora scroll inicial e contínuo para transição transparente -> sólido
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha menu mobile com Escape e trava rolagem enquanto aberto
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Intersection Observer para acompanhar a seção visível na home
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
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
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
      if (!hash) {
        setMenuOpen(false);
        return;
      }

      if (pathname === '/') {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) {
          const headerOffset = hash === 'home' ? 0 : 80;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(0, elementPosition - headerOffset), behavior: 'smooth' });
          window.history.pushState(null, '', `#${hash}`);
        }
      }

      setMenuOpen(false);
    },
    [pathname]
  );

  const isActive = (section: string) => {
    if (pathname === '/') return activeSection === section;
    if (section === 'projetos') return pathname.startsWith('/projetos');
    if (section === 'sobre') return pathname.startsWith('/sobre');
    if (section === 'contato') return pathname.startsWith('/contato');
    return false;
  };

  const isOnHero = pathname === '/' && activeSection === 'home' && !scrolled;
  const isHeaderTransparent = isOnHero && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHeaderTransparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-border-light shadow-xs'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, '/#home')}
          className={`flex items-center shrink-0 group rounded-md px-1 -mx-1 ${
            isHeaderTransparent ? 'focus-visible:outline-white' : ''
          }`}
        >
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
                isHeaderTransparent ? 'text-white/90' : 'text-luminex-red'
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
                aria-current={active ? 'page' : undefined}
                className={`relative py-1.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${
                  isHeaderTransparent ? 'focus-visible:outline-white' : ''
                } ${
                  active
                    ? isHeaderTransparent
                      ? 'text-white font-semibold'
                      : 'text-luminex-red font-semibold'
                    : isHeaderTransparent
                    ? 'text-white/80 font-medium hover:text-white'
                    : 'text-title-black/65 font-medium hover:text-title-black'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-transform duration-300 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  } ${isHeaderTransparent ? 'bg-white' : 'bg-luminex-red'}`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`md:hidden p-2.5 rounded-lg transition-colors duration-300 cursor-pointer ${
            isHeaderTransparent
              ? 'text-white hover:bg-white/10 focus-visible:outline-white'
              : 'text-title-black hover:bg-surface'
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-20 bg-title-black/35 backdrop-blur-xs z-40 animate-fade-in"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-navigation"
            className="md:hidden relative z-50 bg-white border-b border-border-light shadow-xl animate-fade-in"
          >
            <nav className="flex flex-col px-6 py-5 gap-1.5" aria-label="Navegação mobile">
              {navLinks.map((link) => {
                const active = isActive(link.section);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                      active
                        ? 'bg-accent-red/40 text-luminex-red font-semibold'
                        : 'text-title-black/80 hover:bg-surface font-medium'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-luminex-red" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
