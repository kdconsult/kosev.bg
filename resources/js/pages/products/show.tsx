import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { cn } from '@/lib/utils';
import { contacts } from '@/routes';
import { index, show } from '@/routes/products';
import { show as showService } from '@/routes/services';
import type { Product } from '@/types';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function ProductDetail({ product }: { product: Product }) {
    const { appUrl } = usePage().props as { appUrl: string };
    const [activeImageIndex, setActiveImageIndex] = useState(-1);
    const activeImage =
        activeImageIndex === -1
            ? product.cover_image?.originalUrl
            : product.images[activeImageIndex]?.originalUrl;
    const description =
        product.description.length > 160
            ? `${product.description.slice(0, 157)}...`
            : product.description;

    const productData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description,
        image: product.cover_image?.originalUrl,
        category: product.category.name,
        brand: {
            '@type': 'Brand',
            name: 'KOSEV',
        },
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Продукти',
                item: `${appUrl}/products`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.title,
                item: `${appUrl}/products/${product.slug}`,
            },
        ],
    };

    const breadcrumbs = [
        { title: 'Начало', href: appUrl },
        {
            title: 'Продукти',
            href: index(),
        },
        {
            title: product.title,
            href: show(product.slug),
        },
    ];

    return (
        <>
            <SeoHead
                title={product.title}
                description={description}
                ogImage={product.cover_image?.originalUrl}
                type="product"
            >
                <JsonLd headKey="product-jsonld" data={productData} />
                <JsonLd
                    headKey="product-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>
            <style>{`
/* show pages: hero aligns to bottom, not center */
.page-hero { align-items: flex-end; }

.product-detail {
  background: var(--color-background);
}

.product-desc {
  font-size: 1.0625rem;
  line-height: 1.8;
}

.specs-block,
.services-block {
  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }
}

.services-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-primary-foreground);
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

.not-found {
  padding: 10rem 0 6rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }
}
`}</style>

            <>
                <section className="page-hero">
                    <div className="hero-bg">
                        <img
                            src={product.cover_image?.originalUrl}
                            alt={product.title}
                        />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="relative">
                        <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    </div>
                    <div className="hero-content container">
                        <span className="hero-badge">
                            {product.category.name}
                        </span>
                        <h1>{product.title}</h1>
                    </div>
                </section>
                <section className="section product-detail">
                    <div className="container">
                        <div className="detail-grid">
                            <div className="gallery">
                                <div className="mb-4 overflow-hidden rounded-xl">
                                    <img
                                        src={activeImage}
                                        alt={product.title}
                                        className="aspect-4/3 h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className={cn(
                                            'thumb',
                                            activeImageIndex === -1 && 'active',
                                        )}
                                        onClick={() => setActiveImageIndex(-1)}
                                    >
                                        <img
                                            src={
                                                product.cover_image?.thumbUrl ||
                                                'https://placehold.co/400x300'
                                            }
                                            alt={product.title + ' cover'}
                                            loading="lazy"
                                        />
                                    </button>
                                    {product.images.map((img, idx) => (
                                        <button
                                            className={cn(
                                                'thumb',
                                                activeImageIndex === idx &&
                                                    'active',
                                            )}
                                            key={idx}
                                            onClick={() =>
                                                setActiveImageIndex(idx)
                                            }
                                        >
                                            <img
                                                src={img.thumbUrl}
                                                alt={
                                                    product.title +
                                                    ' ' +
                                                    (idx + 1)
                                                }
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <p className="product-desc">
                                    {product.description}
                                </p>

                                <div className="specs-block">
                                    <h3>Технически характеристики</h3>
                                    <table className="specs-table">
                                        <tbody>
                                            {product.specs.map((spec, idx) => (
                                                <tr key={idx}>
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

                                <div className="services-block">
                                    <h3>Свързани услуги</h3>
                                    <div className="services-badges">
                                        {product.services.map((service) => (
                                            <Link
                                                href={showService(service.slug)}
                                                className="service-badge"
                                                key={service.slug}
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="tags-block">
                                    {product.tags.map((tag) => (
                                        <span className="tag" key={tag.slug}>
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={contacts()}
                                    className="btn btn-accent btn-lg cta-btn"
                                >
                                    Изпрати запитване за този продукт
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    );
}
