import { Head, Link } from '@inertiajs/react';
import { index, show } from '@/routes/products';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { contacts } from '@/routes';
import type { Category, Product } from '@/types';

export default function ProductList({ products, categories }: { products: Product[]; categories: Category[] }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = [
        { id: 'all', label: 'Всички' },
        ...categories.map((c) => ({ id: c.slug, label: c.name })),
    ];

    const filteredProducts =
        activeFilter === 'all'
            ? products
            : products.filter((p) => p.category.slug === activeFilter);

    return (
        <>
            <Head title="Продукти" />
            <style>{`
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
      background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.8) 100%);
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

    h1 {
      color: var(--color-white);
      margin-bottom: 1rem;
      text-wrap: balance;
    }

    .hero-content p {
      font-size: 1.25rem;
      color: var(--color-gray-300);
      line-height: 1.7;
    }

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 3rem;
      justify-content: center;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.9375rem;
      font-weight: 500;
      background: var(--color-white);
      border: 1px solid var(--color-gray-200);
      border-radius: 100px;
      color: var(--color-gray-600);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--color-gray-300);
        color: var(--color-gray-900);
      }

      &.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-white);
      }
    }

    .products-grid {
      display: grid;
      gap: 2rem;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .product-card {
      background: var(--color-white);
      border-radius: var(--radius-xl);
      overflow: hidden;
      border: 1px solid var(--color-gray-200);
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
      display: block;

      &:hover {
        box-shadow: var(--shadow-xl);
        transform: translateY(-4px);

        .product-image img {
          transform: scale(1.05);
        }

        .view-link {
          color: var(--color-accent);
        }
      }
    }

    .product-image {
      position: relative;
      overflow: hidden;
      aspect-ratio: 4 / 3;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }

    .product-overlay {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    .product-category {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-white);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .product-content {
      padding: 1.5rem;

      h3 {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 0.9375rem;
        color: var(--color-gray-600);
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }

    .product-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      padding: 0.25rem 0.625rem;
      background: var(--color-gray-100);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-gray-600);
    }

    .view-link {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-primary);
      transition: color 0.2s ease;
    }

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
    }`}</style>

            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
                        alt="Метални продукти"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">Нашите продукти</span>
                    <h1>Метални изделия по поръчка</h1>
                    <p>
                        Произвеждаме прецизни метални изделия по клиентски
                        спецификации. От единични детайли до серийно
                        производство — всичко с гарантирано качество.
                    </p>
                </div>
            </section>

            <section className="section products">
                <div className="container">
                    <div className="filter-bar">
                        {filters.map((filter) => (
                            <button
                                className={cn('filter-btn', {
                                    active: activeFilter === filter.id,
                                })}
                                onClick={() => setActiveFilter(filter.id)}
                                key={filter.id}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <Link
                                className="product-card"
                                href={show(product.slug)}
                                key={product.slug}
                            >
                                <div className="product-image">
                                    <img
                                        src={product.cover_image?.path}
                                        alt={product.title}
                                        loading="lazy"
                                    />
                                    <div className="product-overlay">
                                        <span className="product-category">
                                            {product.category.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <div className="product-tags">
                                        {product.tags.slice(0, 3).map((tag) => (
                                            <span className="tag" key={tag.slug}>
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="view-link">
                                        Виж детайли →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>Търсите конкретен продукт?</h2>
                        <p>
                            Изпратете ни чертеж или спецификация и ще ви
                            предложим решение.
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg">
                        Изпрати запитване
                    </Link>
                </div>
            </section>
        </>
    );
}

ProductList.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: index(),
        },
    ],
};
