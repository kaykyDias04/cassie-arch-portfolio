'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/lib/actions';
import { LayoutDashboard, FolderOpen, User, LogOut, ExternalLink } from 'lucide-react';

const adminNav = [
  { href: '/admin/dashboard', label: 'Projetos', icon: FolderOpen },
  { href: '/admin/about', label: 'Sobre Mim', icon: User },
];

export default function AdminHeader() {
  const pathname = usePathname();

  const isProjectSubpage =
    pathname.startsWith('/admin/new-project') ||
    pathname.startsWith('/admin/edit-project');

  return (
    <header className="bg-title-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-14 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-[13px] tracking-wide uppercase">
                Cássia
              </span>
              <span className="text-white/40 text-[11px]">•</span>
              <span className="text-luminex-red text-[11px] tracking-[0.15em] uppercase font-medium">
                Admin
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-white/50 text-xs hover:text-white transition-colors duration-200"
            >
              <ExternalLink size={12} />
              Ver site
            </Link>
            <div className="w-px h-4 bg-white/15" />
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-white/50 text-xs hover:text-luminex-red transition-colors duration-200 cursor-pointer"
              >
                <LogOut size={12} />
                Sair
              </button>
            </form>
          </div>
        </div>

        <nav className="flex items-center gap-1 -mb-px">
          {adminNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === '/admin/dashboard' && isProjectSubpage);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.1em] uppercase font-medium rounded-t-lg transition-all duration-200 ${isActive
                    ? 'bg-surface text-title-black'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
