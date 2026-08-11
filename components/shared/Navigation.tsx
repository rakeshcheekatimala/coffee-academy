'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { trackNavigation } from '@/lib/utils/analytics';

const navLinks = [
  { href: '/articles', label: 'Learn' },
  { href: '/recipes', label: 'Brew' },
  { href: '/lab', label: 'Lab' },
  { href: '/glossary', label: 'Glossary' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const nextMode = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextMode);
    window.localStorage.setItem('coffee-academy-theme', nextMode ? 'dark' : 'light');
  };

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link
          href="/"
          className="site-brand"
          onClick={() => trackNavigation('Logo', 'header')}
          aria-label="Coffee Academy home"
        >
          <span className="brand-mark" aria-hidden="true" />
          <span>COFFEE / ACADEMY</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={() => trackNavigation(link.label, 'header_desktop')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            <Moon className="theme-icon-light" aria-hidden="true" />
            <Sun className="theme-icon-dark" aria-hidden="true" />
          </button>
          <Link className="header-cta" href="/levels/1">
            Start learning <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav page-shell" aria-label="Mobile navigation">
          <div>
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackNavigation(link.label, 'header_mobile');
                }}
              >
                <span>0{index + 1}</span>
                {link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Link className="button-primary" href="/levels/1" onClick={() => setMobileMenuOpen(false)}>
            Start learning <span>↗</span>
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
