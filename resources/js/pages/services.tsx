import { Head, Link } from '@inertiajs/react';
import { contacts } from '@/routes';
import { index as services } from '@/routes/services';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

export default function Services({services}: {services: Service[]}) {    
    return (
        <>
            <Head title="Services" />
            <style>{`
.services-list {
  padding-top: 4rem;
}

.service-block {
  display: grid;
  gap: 2rem;
  margin-bottom: 5rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.reverse {
    @media (min-width: 1024px) {
      .service-image {
        order: 2;
      }
      .service-content {
        order: 1;
      }
    }
  }
}

.service-image {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-xl);
    aspect-ratio: 4 / 3;
  }
}

.service-content {
  h2 {
    margin-bottom: 1rem;
  }
}

.service-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  color: var(--color-primary-foreground);
  margin-bottom: 1.5rem;
}

.service-description {
  font-size: 1.125rem;
  color: var(--color-muted-foreground);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.service-specs,
.service-benefits {
  margin-bottom: 1.5rem;

  h4 {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-foreground);
    margin-bottom: 0.75rem;
  }
}

.specs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;

  li {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9375rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .spec-label {
    color: var(--color-muted-foreground);
  }

  .spec-value {
    color: var(--color-foreground);
    font-weight: 500;
  }
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9375rem;
    color: var(--color-foreground);

    svg {
      flex-shrink: 0;
      color: var(--color-primary);
    }
  }
}
`}</style>

            <section className="page-hero">
                <div className="hero-bg">
                    <img
                        src="https://kosev.bg/wp-content/uploads/2015/09/wood-service-bg-3.jpg"
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

            <section className="section services-list">
                <div className="container">
                    {services.map((service, i) => (
                        <div
                            id={service.slug}
                            className={cn('service-block', {
                                reverse: i % 2 !== 0,
                            })}
                            key={service.id}
                        >
                            <div className="service-image">
                                <img
                                    src={service.cover_image?.originalUrl}
                                    alt={service.name}
                                    loading="lazy"
                                />
                            </div>
                            <div className="service-content">
                                <div className="flex items-baseline gap-4">                                    
                                    <h2>{service.name}</h2>
                                </div>
                                <p className="service-description">
                                    {service.description}
                                </p>

                                <div className="service-specs">
                                    <h4>Технически възможности</h4>
                                    <ul className="specs-list">
                                        {service.specs?.map((spec) => (
                                            <li key={spec.label}>
                                                <span className="spec-label">
                                                    {spec.label}:
                                                </span>
                                                <span className="spec-value">
                                                    {spec.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="service-benefits">
                                    <h4>Предимства</h4>
                                    <ul className="benefits-list">
                                        {service.tags?.map((tag, idx) => (
                                            <li key={idx}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20 6 9 17l-5-5" />
                                                </svg>
                                                {tag.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={contacts()}
                                    className="btn btn-primary"
                                >
                                    Изпрати запитване
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>Нуждаете се от специализирано решение?</h2>
                        <p>
                            Свържете се с нас за персонализирана консултация и
                            оферта.
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg">
                        Свържете се с нас
                    </Link>
                </div>
            </section>
        </>
    );
}

Services.layout = {
    breadcrumbs: [
        {
            title: 'Services',
            href: services(),
        },
    ],
};
