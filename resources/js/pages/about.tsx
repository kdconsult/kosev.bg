import { Link, usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import {
    CheckIcon,
    GavelIcon,
    HandshakeIcon,
    LightbulbIcon,
    SproutIcon,
    UserCircleIcon,
} from 'lucide-react';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { about, contacts } from '@/routes';

type TeamMember = {
    name: string;
    position: string;
    description: string;
};

type ValueItem = {
    title: string;
    description: string;
    icon: string;
};

type AboutUsTrans = {
    heroSection: {
        title: string;
        badge: string;
        description: string;
        image?: string;
    };
    storySection: {
        title: string;
        badge: string;
        description: string;
        image?: string;
    };
    valuesSection: {
        title: string;
        badge: string;
        description: string;
        image?: string;
        values: ValueItem[];
    };
    teamSection: {
        title: string;
        badge: string;
        description: string;
        image?: string;
        team: TeamMember[];
    };
    productionSiteSection: {
        title: string;
        badge: string;
        description: string;
        image?: string[];
        equipment: string[];
    };
    statsSection: { number: string; label: string }[];
    ctaSection: {
        title: string;
        description: string;
        button: string;
    };
};

export default function AboutUs({
    translations,
}: {
    translations: AboutUsTrans;
}) {
    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { about: { title: string; description: string } };
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: seo.about.title,
                item: `${appUrl}/about`,
            },
        ],
    };

    const iconMap: Record<string, LucideIcon> = {
        gavel: GavelIcon,
        verified_user: UserCircleIcon,
        lightbulb: LightbulbIcon,
        handshake: HandshakeIcon,
        sprout: SproutIcon,
    };

    const values = Object.values(translations.valuesSection.values) as ValueItem[];
    const team = Object.values(translations.teamSection.team) as TeamMember[];

    return (
        <>
            <SeoHead
                title={seo.about.title}
                description={seo.about.description}
            >
                <JsonLd
                    headKey="about-breadcrumb-jsonld"
                    data={breadcrumbData}
                />
            </SeoHead>
            <style>
                {`
.story-grid {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.story-content {
  h2 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.story-image {
  img {
    width: 100%;
    border-radius: var(--radius-xl);
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
}

.values {
  background: var(--color-secondary);
}

.values-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.value-card {
  background: var(--color-card);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }

  h3 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}

.value-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  margin: 0 auto 1rem;
}

.team-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-card {
  text-align: center;
  padding: 2rem;
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);

  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.6;
    margin-top: 0.75rem;
  }
}

.team-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-accent-foreground);
  font-size: 2rem;
  font-weight: 600;
  margin: 0 auto 1rem;
}

.team-role {
  font-size: 0.875rem;
  color: var(--color-brand-gold);
  font-weight: 500;
}

.facility {
  background: var(--color-secondary);
}

.facility-grid {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.facility-content {
  h2 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}

.facility-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;

    svg {
      flex-shrink: 0;
      color: var(--color-brand-gold);
    }
  }
}

.facility-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  img {
    width: 100%;
    border-radius: var(--radius-lg);
    aspect-ratio: 1;
    object-fit: cover;
  }
}

.stats-section {
  background: var(--color-iron);
  padding: 4rem 0;
}

.stats-grid {
  display: grid;
  gap: 2rem;
  text-align: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-brand-gold);
}

.stat-label {
  font-size: 1rem;
  color: var(--color-gray-400);
}
`}
            </style>
            <section className="page-hero">
                <div className="hero-bg">
                    {translations.heroSection.image && (
                        <img
                            src={translations.heroSection.image}
                            alt="Производствена база KOSEV"
                        />
                    )}
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">{translations.heroSection.badge}</span>
                    <h1>{translations.heroSection.title}</h1>
                    <p> {translations.heroSection.description} </p>
                </div>
            </section>

            <section className="section story">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <span className="section-subtitle">
                                {translations.storySection.badge}
                            </span>
                            <h2>{translations.storySection.title}</h2>
                            <p>
                                {translations.storySection.description}
                            </p>
                        </div>
                        <div className="story-image">
                            {translations.storySection.image && (
                                <img
                                    src={translations.storySection.image}
                                    alt="Производствена база"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section values">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            {translations.valuesSection.badge}
                        </span>
                        <h2 className="section-title">
                            {translations.valuesSection.title}
                        </h2>
                    </div>

                    <div className="values-grid">
                        { values.map((value, idx) => (
                            <div className="value-card" key={idx}>
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    {(() => {
                                        const Icon = iconMap[value.icon];

                                        return Icon ? (
                                            <Icon className="h-10 w-10 min-w-10" />
                                        ) : null;
                                    })()}
                                    <h3>{value.title}</h3>
                                </div>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section team">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">{translations.teamSection.badge}</span>
                        <h2 className="section-title">{translations.teamSection.title}</h2>
                        <p className="section-description">
                            {translations.teamSection.description}
                        </p>
                    </div>

                    <div className="team-grid">
                        { team.map((member, idx) => (
                            <div className="team-card" key={idx}>
                                <div className="team-avatar">
                                    {member.name.charAt(0)}
                                </div>
                                <h4>{member.name}</h4>
                                <span className="team-role">{member.position}</span>
                                <p>{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section facility">
                <div className="container">
                    <div className="facility-grid">
                        <div className="facility-content">
                            <span className="section-subtitle">
                                {translations.productionSiteSection.badge}
                            </span>
                            <h2>{translations.productionSiteSection.title}</h2>
                            <p>{translations.productionSiteSection.description}</p>

                            <ul className="facility-features">
                                {translations.productionSiteSection.equipment.map((feature, idx) => (
                                    <li key={idx}>
                                        <CheckIcon className="h-5 w-5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="facility-images">
                            {translations.productionSiteSection.image?.length && (
                                translations.productionSiteSection.image.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Производствена база ${idx + 1}`}
                                        loading="lazy"
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section stats-section">
                <div className="container">
                    <div className="stats-grid">
                        { translations.statsSection.map((stat, idx) => (
                            <div className="stat-item" key={idx}>
                                <span className="stat-value">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="container">
                    <div className="cta-content">
                        <h2>{translations.ctaSection.title}</h2>
                        <p>
                            {translations.ctaSection.description}
                        </p>
                    </div>
                    <Link href={contacts()} className="btn btn-accent btn-lg min-w-max">
                        {translations.ctaSection.button}
                    </Link>
                </div>
            </section>
        </>
    );
}

AboutUs.layout = {
    breadcrumbs: [
        {
            title: 'About Us',
            href: about(),
        },
    ],
};
