import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { contacts } from '@/routes';
import { index as services } from '@/routes/services';

export default function HeroSection() {
    return (
        <>
            <style>
                {`
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Video Background */
.video-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 30, 0.4) 0%,
    rgba(15, 23, 30, 0.3) 50%,
    rgba(15, 23, 30, 0.5) 100%
  );
}

/* Hero Content */
.home-hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 180px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.hero-text {
  max-width: 680px;
}

.hero-badge {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-brand-gold);
  background: rgba(201, 168, 108, 0.15);
  padding: 0.625rem 1.25rem;
  border-radius: 100px;
  margin-bottom: 2rem;
  border: 1px solid rgba(201, 168, 108, 0.3);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-white);
  margin-bottom: 1.5rem;
  text-wrap: balance;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2.5rem;
  max-width: 520px;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-outline-light {
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--color-white);
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
}

/* Stats Card */
.hero-stats {
  margin-top: 3rem;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
  }
}

.stats-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    gap: 2.5rem;
    padding: 2.5rem 3rem;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-white);
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
}

.stat-label {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.5rem;
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  left: 2rem;
  bottom: 120px;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 2;

  @media (min-width: 1024px) {
    display: flex;
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    animation: scrollPulse 2s ease-in-out infinite;
  }
}

/* Trust Bar */
.trust-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.25rem 0;
}

.trust-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    gap: 3rem;
  }
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);

  svg {
    color: var(--color-brand-gold);
  }
}
`}
            </style>
            <section className="hero">
                {/* <!-- Video Background --> */}
                <div className="video-container">
                    <video
                        autoPlay
                        muted={true}
                        loop
                        playsInline
                        poster="/storage/images/hero-poster.jpg"
                        className="hero-video"
                    >
                        <source
                            src="/storage/videos/hero-video.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="video-overlay"></div>
                </div>

                {/* <!-- Hero Content --> */}
                <div className="home-hero-content container">
                    <div className="hero-text">
                        <span className="hero-badge hidden md:block">
                            Над 20 години опит в металообработката
                        </span>

                        <h1 className="hero-title">
                            Прецизност в детайла,
                            <br />
                            качество в резултата
                        </h1>

                        <p className="hero-description hidden md:block">
                            KOSEV LTD е вашият партньор за висококачествено
                            лазерно рязане и метални конструкции. Обслужваме
                            водещи европейски компании с прецизност и
                            надеждност.
                        </p>

                        <div className="hero-actions">
                            <Link href={contacts()} className="btn-primary btn">
                                Изпратете запитване
                                <ChevronRight className="ml-2" />
                            </Link>
                            <Link href={services()} className="btn btn-outline">
                                Нашите услуги
                            </Link>
                        </div>
                    </div>

                    {/* <!-- Stats Card --> */}
                    <div className="hero-stats">
                        <div className="stats-card">
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">
                                    Завършени проекта
                                </span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">
                                    Европейски партньори
                                </span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Години опит</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Scroll Indicator --> */}
                <div className="scroll-indicator">
                    <span>Разгледайте</span>
                    <div className="scroll-line"></div>
                </div>

                {/* <!-- Trust Bar --> */}
                <div className="trust-bar">
                    <div className="container">
                        <div className="trust-content">
                            <div className="trust-item">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                                <span>ISO 9001:2015</span>
                            </div>
                            <div className="trust-item">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                                <span>Европейски стандарти</span>
                            </div>
                            <div className="trust-item">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>Навременна доставка</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
