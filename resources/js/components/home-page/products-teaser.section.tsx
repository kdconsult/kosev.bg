import { index as products, show } from '@/routes/products';
import type { Product } from '@/types';
import { Link } from '@inertiajs/react';

export default function ProductsTeaserSection({ featuredProducts }: { featuredProducts: Product[] }) {
    return (
        <>
            <style>{`
        .products-teaser {
  background: var(--color-gray-50);
}

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3.5rem;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-gray-500);
    line-height: 1.7;
  }
}

.products-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;

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
      color: var(--color-brand-gold);
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

.view-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  transition: color 0.2s ease;
}

.cta-row {
  display: flex;
  justify-content: center;
}

        `}</style>
            <section className="section products-teaser">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            Нашите продукти
                        </span>
                        <h2>Прецизни метални изделия</h2>
                        <p>
                            Произвеждаме широк спектър от метални изделия по
                            клиентски спецификации — от единични детайли до
                            серийно производство.
                        </p>
                    </div>

                    <div className="products-grid">
                        {featuredProducts.map((product) => (
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
                                    <span className="view-link">
                                        Виж детайли →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="cta-row">
                        <Link
                            href={products()}
                            className="btn btn-accent btn-lg"
                        >
                            Виж всички продукти
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
