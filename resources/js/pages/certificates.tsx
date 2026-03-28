import { contacts } from '@/routes';
import type { Certificate } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
    return (
        <>
            <Head title="Сертификати" />
            <style>
                {`
                .page-hero {
  position: relative;
  padding: 10rem 0 5rem;
  min-height: 400px;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    padding: 12rem 0 6rem;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.75) 0%,
    rgba(26, 26, 46, 0.6) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero-badge {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.hero-content h1 {
  color: var(--color-white);
  margin-bottom: 1rem;
  text-wrap: balance;
}

.hero-content p {
  font-size: 1.25rem;
  color: var(--color-gray-300);
  line-height: 1.7;
}

// Intro section
.certificates-intro {
  background: var(--color-gray-50);
}

.intro-grid {
  display: grid;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
}

.intro-text {
  h2 {
    margin-bottom: 1.5rem;
    text-wrap: balance;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-gray-500);
    line-height: 1.8;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem;
  text-align: center;

  .stat-number {
    display: block;
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 0.375rem;
  }

  .stat-label {
    font-size: 0.8125rem;
    color: var(--color-gray-500);
    line-height: 1.4;
  }
}

// Certificates grid
.certificates-list {
  background: var(--color-white);
}

.certs-grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cert-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
}

.cert-image {
  position: relative;
  // aspect-ratio: 3 / 2;
  background: var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.cert-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(16, 185, 129, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-white);
}

.cert-body {
  padding: 1.75rem;

  h3 {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.9375rem;
    color: var(--color-gray-600);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-accent);
  }
}

// CTA banner
.cta-banner {
  background: var(--color-steel);
  padding: 4rem 0;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: var(--color-white);
  }

  p {
    color: var(--color-gray-400);
  }
}
`}
            </style>
            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="https://kosev.bg/wp-content/uploads/2019/09/about_us_2-overlay.jpg"
                        alt="Сертификати и качество"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">Нашите сертификати</span>
                    <h1>Доказано качество и надеждност</h1>
                    <p>
                        Нашите международни сертификати са доказателство за
                        ангажимента ни към качество, безопасност и устойчивост
                        на производството.
                    </p>
                </div>
            </section>

            <section className="section certificates-intro">
                <div className="container">
                    <div className="intro-grid">
                        <div className="intro-text">
                            <span className="section-subtitle">
                                Стандарти от световна класа
                            </span>
                            <h2>Сертифицирани по международни стандарти</h2>
                            <p>
                                Поддържаме всички ключови международни
                                сертификати, необходими за доставки към
                                Европейския съюз и глобалните индустрии. Всеки
                                сертификат представлява строги одитни проверки и
                                постоянно подобрение на нашите процеси.
                            </p>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-number">4</span>
                                <span className="stat-label">
                                    Международни сертификата
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">
                                    Години сертифицирано производство
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">
                                    Успешни одити
                                </span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">EU</span>
                                <span className="stat-label">
                                    Признати в целия ЕС
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section certificates-list">
                <div className="container">
                    <div className="certs-grid">
                        {certificates.map((cert) => (
                            <div className="cert-card" key={cert.slug}>
                                <div className="cert-image">
                                    <img
                                        src={cert.image_path}
                                        alt={cert.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="cert-body">
                                    <h3>{cert.name}</h3>
                                    <p>{cert.description}</p>
                                    <Link
                                        href={cert.pdf_path}
                                        download
                                        className="btn-download"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line
                                                x1="12"
                                                y1="15"
                                                x2="12"
                                                y2="3"
                                            />
                                        </svg>
                                        Изтегли PDF
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 cta-banner">
                <div className="container flex flex-col md:flex-row items-center justify-between">
                    <div className="cta-content">
                        <h2 className="text-2xl">Нужна ви е документация за доставки?</h2>
                        <p>
                            Свържете се с нас и ще ви предоставим пълния
                            комплект сертификати.
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg">
                        Свържете се с нас
                    </Link>
                </div>
            </section>
        </>
    );
}
