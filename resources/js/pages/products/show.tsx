import { productsData } from '@/data/products';
import { cn } from '@/lib/utils';
import { contacts, services } from '@/routes';
import { index } from '@/routes/products';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail({ product }: { product: string }) {
    const [selected] = useState(productsData.find((p) => p.id === product));
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const activeImage = selected ? selected.images[activeImageIndex] : '';
    return (
        <>
            <Head title="Продукт" />
            <style>{`
.page-hero {
  position: relative;
  padding: 10rem 0 5rem;
  min-height: 400px;
  display: flex;
  align-items: flex-end;

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
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.back-link {
  display: inline-block;
  font-size: 0.875rem;
  color: var(--color-gray-400);
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
}

.hero-badge {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.hero-content h1 {
  color: var(--color-white);
  text-wrap: balance;
}

// Detail layout
.product-detail {
  background: var(--color-white);
}

.detail-grid {
  display: grid;
  gap: 4rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}

// Gallery

.gallery-thumbs {
  display: flex;
  gap: 0.75rem;
}

.thumb {
  width: 80px;
  height: 60px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid var(--color-gray-200);
  cursor: pointer;
  padding: 0;
  background: none;
  transition: border-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: var(--color-gray-400);
  }

  &.active {
    border-color: var(--color-accent);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// Product info

.product-desc {
  font-size: 1.0625rem;
  color: var(--color-gray-600);
  line-height: 1.8;
}

.specs-block,
.services-block {
  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-gray-900);
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-gray-200);
  }
}

.specs-table {
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid var(--color-gray-100);

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 0.75rem 0;
    font-size: 0.9375rem;
    vertical-align: top;
  }

  .spec-label {
    color: var(--color-gray-500);
    width: 55%;
    padding-right: 1rem;
  }

  .spec-value {
    color: var(--color-gray-900);
    font-weight: 500;
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
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 100px;
  font-size: 0.875rem;
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
  }
}

.tags-block {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.625rem;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-gray-600);
}

.cta-btn {
  align-self: flex-start;
}

// Not found
.not-found {
  padding: 10rem 0 6rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }
}
`}</style>

            {!selected ? (
                <section className="not-found">
                    <div className="container">
                        <h1>Продуктът не е намерен</h1>
                        <Link href={index()} className="btn btn-primary">
                            <ChevronLeft
                                size={18}
                                style={{ marginRight: '0.5rem' }}
                            />
                            Обратно към продуктите
                        </Link>
                    </div>
                </section>
            ) : (
                <>
                    <section className="page-hero">
                        <div className="hero-bg">
                            <img
                                src={selected.images[0]}
                                alt={selected.title}
                            />
                            <div className="hero-overlay"></div>
                        </div>
                        <div className="hero-content container">
                            <Link href={index()} className="back-link">
                                ← Всички продукти
                            </Link>
                            <span className="hero-badge">
                                {selected.category}
                            </span>
                            <h1>{selected.title}</h1>
                        </div>
                    </section>
                    <section className="section product-detail">
                        <div className="container">
                            <div className="detail-grid">
                                <div className="gallery">
                                    <div className="mb-4 aspect-4/3 overflow-hidden rounded-xl">
                                        <img
                                            src={activeImage}
                                            alt={selected.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        {selected.images.map((img, index) => (
                                            <button
                                                className={cn(
                                                    'thumb',
                                                    activeImageIndex ===
                                                        index && 'active',
                                                )}
                                                key={index}
                                                onClick={() =>
                                                    setActiveImageIndex(index)
                                                }
                                            >
                                                <img
                                                    src={img}
                                                    alt={
                                                        selected.title +
                                                        ' ' +
                                                        (index + 1)
                                                    }
                                                    loading="lazy"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <p className="product-desc">
                                        {selected.description}
                                    </p>

                                    <div className="specs-block">
                                        <h3>Технически характеристики</h3>
                                        <table className="specs-table">
                                            <tbody>
                                                {selected.specs.map(
                                                    (spec, index) => (
                                                        <tr key={index}>
                                                            <td className="spec-label">
                                                                {spec.label}
                                                            </td>
                                                            <td className="spec-value">
                                                                {spec.value}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="services-block">
                                        <h3>Свързани услуги</h3>
                                        <div className="services-badges">
                                            {selected.relatedServices.map(
                                                (service, index) => (
                                                    <Link
                                                        href={services()}
                                                        className="service-badge"
                                                        key={index}
                                                    >
                                                        {service}
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    <div className="tags-block">
                                        {selected.tags.map((tag, index) => (
                                            <span className="tag" key={index}>
                                                {tag}
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
            )}
        </>
    );
}
