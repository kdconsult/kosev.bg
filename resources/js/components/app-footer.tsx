import { about, contacts, home,  services } from '@/routes';
import { index } from '@/routes/projects';
import { Link, usePage } from '@inertiajs/react';

export function AppFooter() {
    const { currentYear } = usePage().props;

    return (
        <>
            <style>
                {`
            .footer {
  background: var(--color-gray-900);
  color: var(--color-white);
  padding: 5rem 0 0;
}

.footer-grid {
  display: grid;
  gap: 3rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr 1fr 1.25fr;
    gap: 4rem;
  }
}

.footer-brand {
  @media (min-width: 640px) {
    grid-column: span 2;
  }

  @media (min-width: 1024px) {
    grid-column: span 1;
  }
}

.footer-description {
  margin-top: 1.25rem;
  font-size: 0.9375rem;
  color: var(--color-gray-400);
  line-height: 1.7;
  max-width: 280px;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-gray-400);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: var(--color-accent);
    color: var(--color-white);
    border-color: var(--color-accent);
  }
}

.footer-links {
  h4 {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    color: var(--color-white);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.875rem;
  }

  a {
    font-size: 0.9375rem;
    color: var(--color-gray-400);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }
}

.footer-contact {
  h4 {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    color: var(--color-white);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    gap: 0.875rem;
    margin-bottom: 1.25rem;
    font-size: 0.9375rem;
    color: var(--color-gray-400);
    line-height: 1.5;

    svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: var(--color-accent);
    }
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
  }

  p {
    font-size: 0.875rem;
    color: var(--color-gray-500);
  }
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;

  a {
    font-size: 0.875rem;
    color: var(--color-gray-500);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }
}
`}
            </style>
            <footer className="footer">
                <div className="container mx-auto">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link href={home()} className="flex gap-4 items-center bg-muted rounded w-fit px-4">
                                <span className="logo-text">KOSEV</span>
                                <span className="logo-divider"></span>
                                <span className="logo-tagline">
                                    World of steel
                                </span>
                            </Link>
                            <p className="footer-description">
                                Висококачествено производство на метални изделия
                                и лазерно рязане за европейски партньори. Над 20
                                години опит в металообработката.
                            </p>
                            <div className="social-links">
                                <a
                                    href="https://www.facebook.com/KOSEV-LTD-728196300544753/"
                                    aria-label="Facebook"
                                    className="social-link"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/kosev-ltd-5b6399294"
                                    aria-label="LinkedIn"
                                    className="social-link"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect
                                            width="4"
                                            height="12"
                                            x="2"
                                            y="9"
                                        />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="social-link"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            width="20"
                                            height="20"
                                            x="2"
                                            y="2"
                                            rx="5"
                                            ry="5"
                                        />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line
                                            x1="17.5"
                                            x2="17.51"
                                            y1="6.5"
                                            y2="6.5"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>Навигация</h4>
                            <ul>
                                <li>
                                    <Link href={home()}>Начало</Link>
                                </li>
                                <li>
                                    <Link href={services()}>Услуги</Link>
                                </li>
                                <li>
                                    <Link href={about()}>За нас</Link>
                                </li>
                                <li>
                                    <Link href={index()}>Проекти</Link>
                                </li>
                                <li>
                                    <Link href={contacts()}>Контакти</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Услуги</h4>
                            <ul>
                                <li>
                                    <Link href={services()}>
                                        Лазерно рязане
                                    </Link>
                                </li>
                                <li>
                                    <Link href={services()}>
                                        Огъване на метал
                                    </Link>
                                </li>
                                <li>
                                    <Link href={services()}>Заваряване</Link>
                                </li>
                                <li>
                                    <Link href={services()}>Монтаж</Link>
                                </li>
                                <li>
                                    <Link href={services()}>CNC обработка</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-contact">
                            <h4>Контакти</h4>
                            <ul>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>
                                        гр. Русе, България
                                        <br />
                                        ул. Тракция №2
                                    </span>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>+359 88 123 4567</span>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            width="20"
                                            height="16"
                                            x="2"
                                            y="4"
                                            rx="2"
                                        />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <span>marketing&#64;kosev.bg</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>
                            &copy; {currentYear} KOSEV LTD. Всички права
                            запазени.
                        </p>
                        <div className="footer-bottom-links">
                            {/* ToDo add pages and links */}
                            <Link href="{privacyPolicy()}">
                                Политика за поверителност
                            </Link>
                            <Link href="{termsAndConditions()}">
                                Общи условия
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
