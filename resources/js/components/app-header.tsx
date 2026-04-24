import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboardIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { home, about, contacts, dashboard } from '@/routes';
import { index as certificates } from '@/routes/certificates';
import { index as products } from '@/routes/products';
import { index as projectsIndex } from '@/routes/projects';
import { index as services } from '@/routes/services';

const activeItemStyles = 'active';

export function AppHeader() {
    const page = usePage();
    const { auth, nav } = page.props;
    const getInitials = useInitials();
    const { whenCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <style>{`
                header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.scrolled {
    background: var(--color-brand-gold-scrolled);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  @media (min-width: 1024px) {
    height: 90px;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  border-radius: 8px;
  padding: 4px;
  background-color: var(--color-neutral-800);

  img {
    height: 50px;
  }
}

.logo-text {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--color-foreground);
}

.logo-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
}

.logo-tagline {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted-foreground);
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    display: flex;
  }

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-foreground);
    transition: color 0.2s ease;
    position: relative;

    &:hover {
      color: var(--color-foreground);
    }

    &.active {
      color: var(--color-foreground);

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--color-foreground);
      }
    }
  }
}

.header-cta {
  display: none;
  color: var(--color-background);

  &:hover {
    background-color: var(--color-primary);
  }

  @media (min-width: 1024px) {
    display: inline-flex;
  }
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (min-width: 1024px) {
    display: none;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 24px;
  height: 24px;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color-foreground);
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  &.open {
    span:first-child {
      transform: translateY(4px) rotate(45deg);
    }
    span:last-child {
      transform: translateY(-4px) rotate(-45deg);
    }
  }
}

.mobile-nav {
  display: none;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--color-card);
  border-top: 1px solid var(--color-border);

  @media (max-width: 1023px) {
    &.open {
      display: flex;
    }
  }

  nav {
    display: flex;
    flex-direction: column;

    a {
      padding: 1rem 0;
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--color-foreground);
      border-bottom: 1px solid var(--color-border);

      &.active {
        color: var(--color-primary);
        font-weight: 600;
        border-left: 3px solid var(--color-primary);
        padding-left: 0.75rem;
      }
    }
  }

  .mobile-cta {
    margin-top: 1.5rem;
    text-align: center;
  }
}

            `}</style>
            <header className={cn({ 'z-10': true, scrolled: isScrolled })}>
                <div className="header-content container">
                    <Link href={home()} className="logo">
                        <img
                            src="/storage/images/kosev/kosev1.png"
                            alt="Logo"
                        />
                    </Link>

                    <nav className="desktop-nav" aria-label="Основна навигация">
                        <Link
                            href={home()}
                            className={whenCurrentUrl(home(), activeItemStyles)}
                        >
                            {nav.home}
                        </Link>
                        <Link
                            href={services()}
                            className={
                                isCurrentOrParentUrl(services())
                                    ? activeItemStyles
                                    : undefined
                            }
                        >
                            {nav.services}
                        </Link>
                        <Link
                            href={projectsIndex()}
                            className={
                                isCurrentOrParentUrl(projectsIndex())
                                    ? activeItemStyles
                                    : undefined
                            }
                        >
                            {nav.projects}
                        </Link>
                        <Link
                            href={products()}
                            className={
                                isCurrentOrParentUrl(products())
                                    ? activeItemStyles
                                    : undefined
                            }
                        >
                            {nav.products}
                        </Link>
                        <Link
                            href={about()}
                            className={whenCurrentUrl(
                                about(),
                                activeItemStyles,
                            )}
                        >
                            {nav.about}
                        </Link>
                        <Link
                            href={certificates()}
                            className={whenCurrentUrl(
                                certificates(),
                                activeItemStyles,
                            )}
                        >
                            {nav.certificates}
                        </Link>
                    </nav>

                    <Link
                        href={contacts()}
                        className="btn btn-primary header-cta"
                    >
                        {nav.contact_cta}
                    </Link>

                    <div className="hidden items-center gap-4 md:flex">
                        <LanguageSwitcher />
                        {auth.user && (
                            <Link
                                href={dashboard()}
                                className="flex items-center gap-1 rounded-4xl bg-accent p-3 text-xs"
                            >
                                <LayoutDashboardIcon
                                    className="mr-2"
                                    size={18}
                                />
                                {getInitials(auth.user?.name || 'Потребител')}
                            </Link>
                        )}
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                        aria-label="Отвори меню"
                    >
                        <span
                            className={cn('hamburger', {
                                open: mobileMenuOpen,
                            })}
                        >
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

                <div className={cn('mobile-nav', { open: mobileMenuOpen }, 'space-y-4')}>
                    <nav aria-label="Мобилна навигация">
                        <Link
                            className={whenCurrentUrl(home(), activeItemStyles)}
                            href={home()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.home}
                        </Link>
                        <Link
                            href={services()}
                            className={isCurrentOrParentUrl(services()) ? activeItemStyles : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.services}
                        </Link>
                        <Link
                            href={projectsIndex()}
                            className={isCurrentOrParentUrl(projectsIndex()) ? activeItemStyles : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.projects}
                        </Link>
                        <Link
                            href={products()}
                            className={isCurrentOrParentUrl(products()) ? activeItemStyles : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.products}
                        </Link>
                        <Link
                            href={about()}
                            className={whenCurrentUrl(about(), activeItemStyles)}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.about}
                        </Link>
                        <Link
                            href={certificates()}
                            className={whenCurrentUrl(certificates(), activeItemStyles)}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.certificates}
                        </Link>
                    </nav>
                    <div className="mobile-cta flex items-center justify-between gap-4">
                        <Link
                            href={contacts()}
                            className="btn btn-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {nav.contact_cta}
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 justify-between">
                        <LanguageSwitcher />
                        {auth.user && (
                            <Link
                                href={dashboard()}
                                className="flex items-center gap-1 rounded-4xl bg-accent p-3 text-xs"
                            >
                                <LayoutDashboardIcon
                                    className="mr-2"
                                    size={18}
                                />
                                {getInitials(auth.user?.name || 'Потребител')}
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
