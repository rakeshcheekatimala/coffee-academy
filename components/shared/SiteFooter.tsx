import Link from 'next/link';

const footerLinks = [
  { href: '/articles', label: 'Learn' },
  { href: '/recipes', label: 'Brew' },
  { href: '/lab', label: 'Lab' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/brew-of-the-week', label: 'Featured' },
];

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="page-shell global-footer-inner">
        <div className="global-footer-intro">
          <Link className="footer-brand" href="/" aria-label="Coffee Academy home">
            <span className="brand-mark" aria-hidden="true" />
            <span>COFFEE / ACADEMY</span>
          </Link>
          <p>Knowledge for a better cup.</p>
        </div>
        <nav aria-label="Footer navigation">
          {footerLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
        </nav>
        <div className="global-footer-meta">
          <span>Independent coffee education</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
