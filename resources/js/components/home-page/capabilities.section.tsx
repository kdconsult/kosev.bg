import { Link } from '@inertiajs/react';
import { index as servicesIndex } from '@/routes/services';
import type { Service } from '@/types/models';

export default function CapabilitiesSection({services}: {services: Service[]}) {
    return (
        <>
            <style>{`
.capabilities {
  background: var(--color-background);
}

.capabilities-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.capability-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--color-brand-gold);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);

    .capability-image img {
      transform: scale(1.05);
    }

    .capability-number {
      background: var(--color-brand-gold);
      color: var(--color-primary-foreground);
    }

    .capability-link svg {
      transform: translateX(4px);
    }
  }

  &.featured {
    @media (min-width: 1024px) {
      grid-row: span 2;

      .capability-image {
        height: 340px;
      }

      h3 {
        font-size: 1.625rem;
      }
    }
  }

  &.last {
    @media (min-width: 1024px) {
      grid-column: span 3;

      .capability-image {
        height: 400px;
      }

      h3 {
        font-size: 1.625rem;
      }
    }
  }
}

.capability-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
}

.capability-number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--color-accent);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-foreground);
  transition: all 0.3s ease;
}

.capability-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.75rem;
}

.capability-content {
  flex: 1;
}

.capability-content h3 {
  font-size: 1.25rem;
  color: var(--color-foreground);
  margin-bottom: 0.625rem;
  line-height: 1.3;
}

.capability-content p {
  font-size: 0.9375rem;
  color: var(--color-muted-foreground);
  line-height: 1.7;
  margin-bottom: 1.125rem;
}

.capability-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;

  li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin-bottom: 0.4rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-brand-gold);
    }
  }
}

.capability-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-foreground);
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);

  svg {
    transition: transform 0.3s ease;
  }
}

`}</style>
            <section className="section capabilities">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            Нашите възможности
                        </span>
                        <h2 className="section-title">
                            Цялостни решения за металообработка
                        </h2>
                        <p className="section-description">
                            От лазерно рязане до финална сглобка - предлагаме
                            пълен спектър услуги за производство на метални
                            изделия с изключително качество.
                        </p>
                    </div>

                    <div className="capabilities-grid">
                        {services.map((capability, index) => (
                            <div className="capability-card" key={capability.id}>
                                <div className="capability-image">
                                    <img
                                        src={capability.cover_image?.originalUrl}
                                        alt={capability.name}
                                        loading="lazy"
                                    />
                                    <div className="capability-number">
                                        0{index + 1}
                                    </div>
                                </div>
                                <div className="capability-body">
                                    <div className="capability-content">
                                        <h3>{capability.name}</h3>
                                        <p>{capability.description?.slice(0, 100)}...</p>
                                        <ul className="capability-features">
                                            {capability.specs?.map((spec, idx) => (
                                                <li key={idx}>{spec.label}: {spec.value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link
                                        href={servicesIndex()}
                                        className="capability-link"
                                    >
                                        <span>Научи повече</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
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
                </div>
            </section>
        </>
    );
}
