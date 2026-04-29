import { Link } from '@inertiajs/react';
import { MoveRight, ShieldCheckIcon } from 'lucide-react';
import { index as certificates } from '@/routes/certificates/index';
import type { Translations } from '@/types/translations';

export default function QualitySection({ translations }: { translations: Translations['qualitySection'] }) {
    return (
        <>
            <style>
                {`
.quality {
  background: var(--color-card);
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
  color: var(--color-muted-foreground);
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
  background: var(--color-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.cert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-brand-gold);
  color: var(--color-primary-foreground);
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
  color: var(--color-foreground);
}

.cert-desc {
  font-size: 0.8125rem;
  color: var(--color-muted-foreground);
}

.tech-features {
  h4 {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-muted-foreground);
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
  color: var(--color-foreground);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 100px;
}

.certs-link {
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
                        <div className="grid grid-cols-1 gap-2 md:gap-4 md:order-2">
                          {translations.images.map((img, idx) => (
                            <img
                                key={idx}
                                className="rounded-lg"
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                            />    
                          ))}
                        </div>

                        <div className="quality-content">
                            <span className="section-subtitle">
                                {translations.badge}
                            </span>
                            <h2>{translations.title}</h2>
                            <p className="quality-intro">
                                {translations.description}
                            </p>

                            <div className="certifications">
                                {translations.certifications.map((cert, idx) => (
                                    <div className="cert-item" key={idx}>
                                        <div className="cert-icon">
                                          <ShieldCheckIcon size={18} />
                                            
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
                                <h4>{translations.techFeaturesSection.title}</h4>
                                <div className="features-list">
                                    {translations.techFeaturesSection.features.map((feature, idx) => (
                                        <span className="feature-tag" key={idx}>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link href={certificates()} className="certs-link flex items-center gap-4">
                                <span>{translations.techFeaturesSection.ctaButton}</span>
                                 <MoveRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
