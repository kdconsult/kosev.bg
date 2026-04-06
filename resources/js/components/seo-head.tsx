import { Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/json-ld';

type SeoHeadProps = {
    title: string;
    description: string | null;
    ogImage?: string | null;
    canonical?: string;
    type?: 'website' | 'article' | 'product';
    children?: ReactNode;
};

type SeoSharedProps = {
    appUrl?: string;
    locale?: string;
    name?: string;
};

function toAbsoluteUrl(pathOrUrl: string, baseUrl: string): string {
    try {
        return new URL(pathOrUrl).toString();
    } catch {
        return new URL(pathOrUrl, `${baseUrl}/`).toString();
    }
}

export function SeoHead({
    title,
    description,
    ogImage,
    canonical,
    type = 'website',
    children,
}: SeoHeadProps) {
    const page = usePage<SeoSharedProps>();
    const baseUrl = (page.props.appUrl || 'http://localhost').replace(
        /\/$/,
        '',
    );
    const locale = page.props.locale || 'bg';
    const siteName = page.props.name || 'KOSEV';
    const cleanDescription = description?.trim()?.replace(/\s+/g, ' ') ?? '';
    const fullUrl = toAbsoluteUrl(canonical || page.url, baseUrl);
    const image = toAbsoluteUrl(ogImage || '/apple-touch-icon.png', baseUrl);

    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: baseUrl,
        logo: toAbsoluteUrl('/apple-touch-icon.png', baseUrl),
        email: 'info@kosev.bg',
        telephone: '+359 32 123 456',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'ул. Тракция №2',
            addressLocality: 'Русе',
            postalCode: '7003',
            addressCountry: 'BG',
        },
    };

    return (
        <Head title={title}>
            <meta
                head-key="description"
                name="description"
                content={cleanDescription}
            />
            <meta head-key="robots" name="robots" content="index,follow" />
            <link head-key="canonical" rel="canonical" href={fullUrl} />

            <meta head-key="og:title" property="og:title" content={title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={cleanDescription}
            />
            <meta head-key="og:url" property="og:url" content={fullUrl} />
            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:image" property="og:image" content={image} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={siteName}
            />
            <meta
                head-key="og:locale"
                property="og:locale"
                content={locale === 'bg' ? 'bg_BG' : 'en_US'}
            />

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={title}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={cleanDescription}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={image}
            />

            <JsonLd headKey="organization-jsonld" data={organizationData} />
            {children}
        </Head>
    );
}
