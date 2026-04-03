import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboardIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import {
    home,
    about,
    contacts,
    dashboard,
} from '@/routes';
import {index as certificates} from '@/routes/certificates';
import { index as products } from '@/routes/products';
import { index as projectsIndex } from '@/routes/projects';
import { index as services } from '@/routes/services';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const activeItemStyles = 'active';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { whenCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    function toggleMobileMenu() {
        const menu = document.querySelector('.mobile-nav');
        menu?.classList.toggle('open');
    }

    return (
        <>
            <style>{`
                header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
    height: 1.5px;
    background: var(--color-foreground);
    transition: all 0.3s ease;
  }

  &.open {
    span:first-child {
      transform: translateY(3.75px) rotate(45deg);
    }
    span:last-child {
      transform: translateY(-3.75px) rotate(-45deg);
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
        color: var(--color-primary-foreground);
      }
    }
  }

  .mobile-cta {
    margin-top: 1.5rem;
    text-align: center;
  }
}

            `}</style>
            <header className={cn({ scrolled: isScrolled})}>
                <div className="header-content container">
                    <Link href={home()} className="logo">
                        <img
                            src="https://kosev.bg/wp-content/uploads/2019/08/kosev1.png"
                            alt="Logo"
                        />
                    </Link>

                    <nav className="desktop-nav" aria-label="Основна навигация">
                        <Link
                            href={home()}
                            className={whenCurrentUrl(home(), activeItemStyles)}
                        >
                            Начало
                        </Link>
                        <Link
                            href={services()}
                            className={whenCurrentUrl(
                                services(),
                                activeItemStyles,
                            )}
                        >
                            Услуги
                        </Link>
                        <Link
                            href={projectsIndex()}
                            className={
                                isCurrentOrParentUrl(projectsIndex())
                                    ? activeItemStyles
                                    : undefined
                            }
                        >
                            Проекти
                        </Link>
                        <Link
                            href={products()}
                            className={
                                isCurrentOrParentUrl(products())
                                    ? activeItemStyles
                                    : undefined
                            }
                        >
                            Продукти
                        </Link>
                        <Link
                            href={about()}
                            className={whenCurrentUrl(
                                about(),
                                activeItemStyles,
                            )}
                        >
                            За нас
                        </Link>
                        <Link
                            href={certificates()}
                            className={whenCurrentUrl(
                                certificates(),
                                activeItemStyles,
                            )}
                        >
                            Сертификати
                        </Link>
                    </nav>

                    <Link
                        href={contacts()}
                        className="btn btn-primary header-cta"
                    >
                        Изпрати запитване
                    </Link>

                    {auth.user && (
                        <Link
                            href={dashboard()}
                            className="flex items-center gap-1 rounded-4xl bg-accent p-3 text-xs"
                        >
                            <LayoutDashboardIcon className="mr-2" size={18} />
                            {getInitials(auth.user?.name || 'Потребител')}
                        </Link>
                    )}

                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMobileMenu}
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

                <div className={cn('mobile-nav', { open: mobileMenuOpen })}>
                    <nav aria-label="Мобилна навигация">
                        <Link
                            className={whenCurrentUrl(home(), activeItemStyles)}
                            href={home()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Начало
                        </Link>
                        <Link
                            href={services()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Услуги
                        </Link>
                        <Link
                            href={projectsIndex()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Проекти
                        </Link>
                        <Link
                            href={products()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Продукти
                        </Link>
                        <Link
                            href={about()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            За нас
                        </Link>
                        <Link
                            href={certificates()}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Сертификати
                        </Link>
                    </nav>
                    <Link
                        href={contacts()}
                        className="btn btn-primary mobile-cta"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Изпрати запитване
                    </Link>
                </div>
            </header>

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
