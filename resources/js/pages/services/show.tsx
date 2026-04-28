import { Link, usePage } from '@inertiajs/react';
import { CheckIcon, LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index as servicesIndex, show } from '@/routes/services';
import type { BreadcrumbItem, Service } from '@/types';

type ServiceDetailTranslations = {
    seo: {
        home: string;
        services: string;
    };
    heroSection: {
        badge: string;
    };
    ctaButton: string;
    specs: string;
    tags: string;
    linkedProducts: string;
    sendInquiryForService: string;
};

export default function ServiceDetail({ service, translations }: { service: Service, translations: ServiceDetailTranslations }) {
    const [activeImageIndex, setActiveImageIndex] = useState(-1);
    const activeImage =
        activeImageIndex === -1
            ? service.cover_image?.originalUrl
            : service.images[activeImageIndex]?.originalUrl;

    const { appUrl } = usePage().props as {
        appUrl: string;        
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: translations.seo.home,
                item: appUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: translations.seo.services,
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: translations.seo.home,
            href: appUrl,
        },
        {
            title: translations.seo.services,
            href: servicesIndex(),
        },
        {
            title: service.name,
            href: show(service.slug),
        },
    ];

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
                <div className="relative">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">{translations.heroSection.badge}</span>
                    <h1>{service.name}</h1>
                </div>
            </section>

            <section className="section bg-background">
                <div className="container">
                    <div className="detail-grid">
                        <div className="gallery">
                            <div className="mb-4 overflow-hidden rounded-xl">
                                <img
                                    className="aspect-4/3 h-auto w-full rounded-xl "
                                    src={activeImage || 'https://placehold.co/800x600'}
                                    alt={service.name}
                                />
                            </div>
                            {service.images?.length > 0 && (
                                <div className="flex gap-3">
                                    <button
                                        className={cn('thumb', activeImageIndex === -1 && 'active')}
                                        onClick={() => setActiveImageIndex(-1)}
                                    >
                                        <img
                                            src={service.cover_image?.thumbUrl || 'https://placehold.co/400x300'}
                                            alt={service.name + ' cover'}
                                            loading="lazy"
                                        />
                                    </button>
                                    {service.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            className={cn('thumb', activeImageIndex === idx && 'active')}
                                            onClick={() => setActiveImageIndex(idx)}
                                        >
                                            <img
                                                src={img.thumbUrl}
                                                alt={service.name + ' ' + (idx + 1)}
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-8">
                            <p className="text-[1.0625rem] leading-[1.8]">
                                {service.description}
                            </p>

                            {service.specs?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="mb-3 text-[0.9375rem] font-semibold text-foreground">
                                        {translations.specs}
                                    </h4>
                                    <ul className="m-0 grid list-none gap-2 p-0">
                                        {service.specs?.map((spec) => (
                                            <li
                                                key={spec.label}
                                                className="flex gap-2 border-b border-border py-2 text-[0.9375rem]"
                                            >
                                                <span className="text-muted-foreground">
                                                    {spec.label}:
                                                </span>
                                                <span className="font-medium text-foreground">
                                                    {spec.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {service.tags?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="mb-3 text-[0.9375rem] font-semibold text-foreground">
                                        {translations.tags}
                                    </h4>
                                    <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
                                        {service.tags?.map((tag, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-2 text-[0.9375rem] text-foreground"
                                            >
                                                <CheckIcon className="h-5 w-5 text-primary" />
                                                {tag.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {service.products?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="mb-3 text-[0.9375rem] font-semibold text-foreground">
                                        {translations.linkedProducts}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {service.products?.map((product) => (
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="tag flex items-center gap-1"
                                                key={product.slug}
                                            >
                                                {product.title}
                                                <LinkIcon className="ml-1 h-4 w-4 text-muted-foreground" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link
                                href={contacts()}
                                className="btn btn-accent btn-lg self-start"
                            >
                                {translations.sendInquiryForService}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

ServiceDetail.layout = {
    breadcrumbs: [
        {
            title: 'Services',
            href: servicesIndex(),
        },
        {
            title: 'Service Detail',
        },
    ],
};
