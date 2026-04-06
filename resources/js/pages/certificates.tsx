import { Link, usePage } from '@inertiajs/react';
import { DownloadIcon } from 'lucide-react';
import CertificatesController from '@/actions/App/Http/Controllers/CertificateController';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { contacts } from '@/routes';
import type { Certificate } from '@/types';

export default function Certificates({
    certificates,
}: {
    certificates: Certificate[];
}) {
    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { certificates: { title: string; description: string } };
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: seo.certificates.title,
                item: `${appUrl}/certificates`,
            },
        ],
    };

    return (
        <>
            <SeoHead
                title={seo.certificates.title}
                description={seo.certificates.description}
            >
                <JsonLd
                    headKey="certificates-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>
            <style>
                {`
.certificates-intro {
  background: var(--color-muted);
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
    line-height: 1.8;
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem;
  text-align: center;

  .stat-number {
    display: block;
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-brand-gold);
    margin-bottom: 0.375rem;
  }

  .stat-label {
    font-size: 0.8125rem;
    color: var(--color-muted-foreground);
    line-height: 1.4;
  }
}

.certificates-list {
  background: var(--color-background);
}

.certs-grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cert-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
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
  background: var(--color-secondary);
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
  color: var(--color-primary-foreground);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-brand-gold);
    color: var(--color-gray-900);
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
                                        src={cert.imagePath}
                                        alt={cert.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="cert-body">
                                    <h3>{cert.name}</h3>
                                    <p>{cert.description}</p>
                                    <a
                                        href={CertificatesController.show.url(
                                            cert.slug,
                                        )}
                                        className="btn-download"
                                    >
                                        <DownloadIcon className="h-4 w-4" />
                                        Изтегли PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner py-16">
                <div className="container flex flex-col items-center justify-between md:flex-row">
                    <div className="cta-content flex-1">
                        <h2 className="text-2xl">
                            Нужна ви е документация за доставки?
                        </h2>
                        <p>
                            Свържете се с нас и ще ви предоставим пълния
                            комплект сертификати.
                        </p>
                    </div>
                    <div>
                        <Link
                            href={contacts()}
                            className="btn btn-accent btn-lg w-full"
                        >
                            Свържете се с нас
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
