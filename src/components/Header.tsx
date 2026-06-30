'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 border-2 border-title-black flex items-center justify-center rounded-sm">
            <span className="text-title-black font-semibold text-lg">C</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-title-black font-semibold text-[15px] tracking-wide uppercase">
              Cássia
            </span>
            <span className="text-text-grey text-[10px] tracking-[0.2em] uppercase">
              Victória
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-luminex-red ${pathname === link.href
                ? 'text-title-black font-semibold'
                : 'text-text-grey font-medium'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-title-black p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border-light animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${pathname === link.href
                  ? 'text-title-black font-semibold'
                  : 'text-text-grey font-medium'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
