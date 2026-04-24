import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index as servicesIndex, show as showService } from '@/routes/services';
import type { Service } from '@/types';
import type { Translations } from '@/types/translations';

export default function Services({ services }: { services: Service[] }) {
    const { appUrl, seo, translations } = usePage().props as {
        appUrl: string;
        seo: { services: { title: string; description: string } };
        translations: Translations;
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
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
                    <span className="hero-badge">Нашите услуги</span>
                    <h1>Пълен спектър услуги за металообработка</h1>
                    <p>
                        От лазерно рязане до финална сглобка - предлагаме
                        цялостни решения за вашето производство.
                    </p>
                </div>
            </section>

            <section className="section pt-16">
                <div className="container">
                    {services.map((service, i) => (
                        <div
                            id={service.slug}
                            className="mb-20 grid items-center gap-8 last:mb-0 lg:grid-cols-2 lg:gap-16 py-8"
                            key={service.id}
                        >
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
                                        {translations.buttons.see_details}
                                    </Link>
                                    <Link
                                        href={contacts()}
                                        className="btn btn-primary"
                                    >
                                        {translations.buttons.send_inquiry}
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-secondary py-16">
                <div className="container flex items-center justify-between gap-8">
                    <div>
                        <h2>Нуждаете се от специализирано решение?</h2>
                        <p>
                            Свържете се с нас за персонализирана консултация и
                            оферта.
                        </p>
                    </div>
                    <div className='shrink-0'>
                        <Link
                            href={contacts()}
                            className="btn btn-accent btn-lg"
                        >
                            {translations.buttons.contact_us}
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
