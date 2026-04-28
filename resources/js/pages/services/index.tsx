import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index as servicesIndex, show as showService } from '@/routes/services';
import type { Service } from '@/types';

type ServicesTranslations = {
    seo: {
        home: string;
    };
    heroSection: {
        title: string;
        description: string;
        badge: string;
        image: string;
    },
    ctaSection: {
        title: string;
        description: string;
        button: string;
    },
    buttons: {
        seeDetails: string;
        sendInquiry: string;
    }
};

export default function Services({ services, translations }: { services: Service[]; translations: ServicesTranslations }) {
    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { services: { title: string; description: string } };
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: translations.seo.home, item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: seo.services.title,
                item: `${appUrl}/services`,
            },
        ],
    };

    return (
        <>
            <SeoHead
                title={seo.services.title}
                description={seo.services.description}
            >
                <JsonLd
                    headKey="services-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>

            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="/storage/images/wood-service-bg-3.jpg"
                        alt="Производствен процес"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">{translations.heroSection.badge}</span>
                    <h1>{translations.heroSection.title}</h1>
                    <p>{translations.heroSection.description}</p>
                </div>
            </section>

            <section className="section pt-16">
                <div className="container">
                    {services.map((service, i) => (
                        <div
                            id={service.slug}
                            className="service-section mb-20 grid items-center gap-8 last:mb-0 lg:grid-cols-2 lg:gap-16 py-8"
                            key={service.id}
                        >
                            <span className="service-number" aria-hidden="true">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className={cn(i % 2 !== 0 && 'lg:order-2')}>
                                <img
                                    src={service.cover_image?.originalUrl}
                                    alt={service.name}
                                    loading="lazy"
                                    className="h-full w-full rounded-xl object-contain object-center"
                                />
                            </div>
                            <div className={cn(i % 2 !== 0 && 'lg:order-1')}>
                                <div className="flex items-baseline gap-4">
                                    <h2 className="mb-4">{service.name}</h2>
                                </div>
                                <p className="mb-6 text-lg leading-[1.8] text-muted-foreground">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={showService(service.slug)}
                                        className="btn btn-secondary"
                                    >
                                        {translations.buttons.seeDetails}
                                    </Link>
                                    <Link
                                        href={contacts()}
                                        className="btn btn-primary"
                                    >
                                        {translations.buttons.sendInquiry       }
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-secondary py-16">
                <div className="container flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h2>{translations.ctaSection.title}</h2>
                        <p>
                            {translations.ctaSection.description}
                        </p>
                    </div>
                    <div className='shrink-0'>
                        <Link
                            href={contacts()}
                            className="btn btn-accent btn-lg"
                        >
                            {translations.ctaSection.button}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

Services.layout = {
    breadcrumbs: [
        {
            title: 'Services',
            href: servicesIndex(),
        },
    ],
};
