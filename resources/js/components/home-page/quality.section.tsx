import { certificates } from '@/routes';
import { Link } from '@inertiajs/react';

const certifications = [
    { name: 'ISO 9001:2015', description: 'Управление на качеството' },
    { name: 'ISO 14001', description: 'Околна среда' },
    { name: 'EN 1090', description: 'Стоманени конструкции' },
    { name: 'ISO 3834', description: 'Качество при заваряване' },
];

const techFeatures = [
    'Fiber лазер 6kW',
    'CNC абкант 320т',
    'Роботизирано заваряване',
    'CAD/CAM',
    '3D измерване',
    'ERP система',
];

export default function QualitySection() {
    return (
        <>
            <style>
                {`
                .quality {
  background: var(--color-white);
}

.quality-grid {
  display: grid;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
  }
}

.quality-images {
  @media (min-width: 1024px) {
    order: 2;
  }
}

.image-stack {
  position: relative;
}

.image-main {
  border-radius: var(--radius-lg);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }
}

.image-secondary {
  position: absolute;
  bottom: -2rem;
  left: -2rem;
  width: 45%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 4px solid var(--color-white);

  @media (max-width: 767px) {
    display: none;
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.quality-content {
  @media (min-width: 1024px) {
    order: 1;
  }

  h2 {
    margin-bottom: 1.5rem;
    text-wrap: balance;
  }
}

.quality-intro {
  font-size: 1.0625rem;
  color: var(--color-gray-500);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.certifications {
  display: grid;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cert-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1.25rem;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-100);
}

.cert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-brand-gold);
  color: var(--color-white);
  flex-shrink: 0;
}

.cert-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cert-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.cert-desc {
  font-size: 0.8125rem;
  color: var(--color-gray-500);
}

.tech-features {
  h4 {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-gray-400);
    margin-bottom: 1rem;
  }
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  display: inline-flex;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  color: var(--color-gray-700);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 100px;
}

.certs-link {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-brand-gold);
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
  }
}
`}
            </style>
            <section className="section quality">
                <div className="container">
                    <div className="quality-grid">
                        <div className="quality-images">
                            <div className="image-stack">
                                <div className="image-main">
                                    <img
                                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                                        alt="CNC машина за прецизна обработка"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="image-secondary">
                                    <img
                                        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=2000&q=80"
                                        alt="Лазерно рязане в действие"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="quality-content">
                            <span className="section-subtitle">
                                Качество и технологии
                            </span>
                            <h2>Модерно оборудване, безкомпромисно качество</h2>
                            <p className="quality-intro">
                                Инвестираме непрекъснато в най-съвременно
                                оборудване и технологии. Нашият стриктен контрол
                                гарантира изделия с изключително качество.
                            </p>

                            <div className="certifications">
                                {certifications.map((cert, idx) => (
                                    <div className="cert-item" key={idx}>
                                        <div className="cert-icon">
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
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                                <path d="m9 12 2 2 4-4" />
                                            </svg>
                                        </div>
                                        <div className="cert-info">
                                            <span className="cert-name">
                                                {cert.name}
                                            </span>
                                            <span className="cert-desc">
                                                {cert.description}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="tech-features">
                                <h4>Технически възможности</h4>
                                <div className="features-list">
                                    {techFeatures.map((feature, idx) => (
                                        <span className="feature-tag" key={idx}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link href={certificates()} className="certs-link">
                                Виж всички сертификати →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
