import { Link, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { contacts } from '@/routes';
import { index as servicesIndex } from '@/routes/services';
import type { Service } from '@/types';

export default function ServiceDetail({ service }: { service: Service }) {
    const { appUrl } = usePage().props as { appUrl: string };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Начало',
                item: appUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Услуги',
                item: `${appUrl}/services`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: service.name,
                item: `${appUrl}/services/${service.slug}`,
            },
        ],
    };

    return (
        <>
            <SeoHead
                title={service.name}
                description={service.description}
                ogImage={service.cover_image?.originalUrl}
                type="article"
            >
                <JsonLd
                    headKey="service-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>

            <style>{`
.page-hero {
  align-items: flex-end;
}

.service-detail {
  background: var(--color-background);
}

.service-desc {
  font-size: 1.0625rem;
  line-height: 1.8;
}

.service-image {
  overflow: hidden;
  border-radius: var(--radius-xl);

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
}

.specs-block {
  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }
}

.tags-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cta-btn {
  align-self: flex-start;
}
            `}</style>

            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src={
                            service.cover_image?.originalUrl ||
                            'https://placehold.co/1200x800'
                        }
                        alt={service.name}
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <Link href={servicesIndex()} className="back-link">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Всички услуги
                    </Link>
                    <span className="hero-badge">Услуга</span>
                    <h1>{service.name}</h1>
                </div>
            </section>

            <section className="section service-detail">
                <div className="container">
                    <div className="detail-grid">
                        <div className="service-image">
                            <img
                                src={
                                    service.cover_image?.originalUrl ||
                                    'https://placehold.co/800x600'
                                }
                                alt={service.name}
                            />
                        </div>

                        <div className="flex flex-col gap-8">
                            <p className="service-desc">
                                {service.description}
                            </p>

                            {service.specs?.length > 0 && (
                                <div className="specs-block">
                                    <h3>Технически възможности</h3>
                                    <table className="specs-table">
                                        <tbody>
                                            {service.specs.map((spec) => (
                                                <tr key={spec.label}>
                                                    <td className="spec-label">
                                                        {spec.label}
                                                    </td>
                                                    <td className="spec-value">
                                                        {spec.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {service.tags?.length > 0 && (
                                <div className="tags-block">
                                    {service.tags.map((tag) => (
                                        <span className="tag" key={tag.slug}>
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={contacts()}
                                className="btn btn-accent btn-lg cta-btn"
                            >
                                Изпрати запитване за тази услуга
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
