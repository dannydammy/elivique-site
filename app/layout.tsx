import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { footerNav, nav, site } from "@/lib/site";
import { organizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui";
import { Analytics } from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Elivique — Careers, Relocation, IELTS & Business Documents", template: "%s | Elivique" },
  applicationName: site.name,
};

export const viewport: Viewport = { themeColor: "#0E1A33", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en-NG">
      <head>
        <link rel="preload" href="/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/public-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="brand" aria-label="Elivique home">
              <img src="/logo.png" alt="Elivique" width={227} height={171} />
            </Link>
            {/* CSS-only menu: no JavaScript shipped for navigation */}
            <input type="checkbox" id="nav-toggle" className="nav-toggle visually-hidden" aria-hidden="true" tabIndex={-1} />
            <label htmlFor="nav-toggle" className="menu-btn">Menu</label>
            <nav className="primary-nav" aria-label="Main">
              <ul>
                {nav.map((n) => (
                  <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
                ))}
                <li><Link href="/account" className="member-link">Member sign in</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <div className="footer-grid">
              <div className="footer-brand">
                <img src="/logo-light.png" alt="Elivique" width={227} height={171} />
                <p className="footer-tag">Elevate · Innovate · Thrive</p>
                <p>{site.location}</p>
                <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
                {site.phone && <p><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></p>}
                {site.address && <p>{site.address}</p>}
              </div>
              <nav aria-label="Footer">
                <ul>
                  {footerNav.map((n) => (
                    <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
                  ))}
                  {site.legalPagesEnabled && (
                    <>
                      <li><Link href="/privacy">Privacy</Link></li>
                      <li><Link href="/terms">Terms</Link></li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="footer-base">
              <span>© {year} Elivique{site.rcNumber ? ` · RC ${site.rcNumber}` : ""}</span>
              <span>Our services support preparation. Employers, institutions, funders, testing bodies and immigration authorities make their own decisions.</span>
            </div>
          </div>
        </footer>
        <JsonLd data={organizationSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
