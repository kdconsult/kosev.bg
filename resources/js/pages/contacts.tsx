import { usePage } from '@inertiajs/react';
import {
    ClockIcon,
    LucideIcon,
    MailIcon,
    MapPin,
    PhoneIcon,
} from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ContactForm from '@/components/contact-form';
import GMaps from '@/components/g-maps';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import { contacts } from '@/routes';
import { ContactForm as ContactFormTranslation } from '@/types/translations';

const recaptchaSiteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;

type ContactUsTranslations = {
    heroSection: {
        title: string;
        badge: string;
        description: string;
        image: string;
    };
    contactInfoSection: {
        title: string;
        badge?: string;
        description?: string;
        contactMethods: { label: string; value: string; icon: string }[];
    };
    form: ContactFormTranslation;
    faqSection: {
        title: string;
        badge?: string;
        description?: string;
        faqs: { question: string; answer: string }[];
    }
};

export default function Contacts({
    translations,
}: {
    translations: ContactUsTranslations;
}) {
    const contactMethods = Object.values(
        translations.contactInfoSection.contactMethods,
    );

    const faqs = translations.faqSection.faqs;

    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { contacts: { title: string; description: string } };
    };
    const hasMounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    const faqData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Начало', item: appUrl },
            {
                '@type': 'ListItem',
                position: 2,
                name: seo.contacts.title,
                item: `${appUrl}/contacts`,
            },
        ],
    };

    const iconMap: Record<string, LucideIcon> = {
        phone: PhoneIcon,
        mail: MailIcon,
        pin: MapPin,
        clock: ClockIcon,
    };

    return (
        <>
            <SeoHead
                title={seo.contacts.title}
                description={seo.contacts.description}
            >
                <JsonLd
                    headKey="contacts-jsonld"
                    data={[faqData, breadcrumbData]}
                />
            </SeoHead>
            <style>
                {`
.contact-grid {
  display: grid;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.contact-info {
  h2 {
    margin-bottom: 1rem;
  }
}

.contact-intro {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.info-cards {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-secondary);
  border-radius: var(--radius-lg);
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  flex-shrink: 0;
}

.info-content {
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}

.faq-section {
  background: var(--color-secondary);
}

.faq-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.faq-item {
  padding: 1.5rem;
  background: var(--color-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);

  h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
  }
}
`}
            </style>
            <section className="page-hero">
                <div className="hero-bg">
                    {translations.heroSection.image && (
                        <img
                            src={translations.heroSection.image}
                            alt={translations.heroSection.title}
                        />
                    )}
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">
                        {translations.heroSection.badge}
                    </span>
                    <h1>{translations.heroSection.title}</h1>
                    <p>{translations.heroSection.description}</p>
                </div>
            </section>

            <section className="p-2 md:p-8 lg:p-16">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>{translations.contactInfoSection.title}</h2>
                            <p className="contact-intro">
                                {translations.contactInfoSection.description}
                            </p>

                            <div className="info-cards">
                                {contactMethods.map((method, idx) => (
                                    <div className="info-card" key={idx}>
                                        <div className="info-icon">
                                            {(() => {
                                                const Icon =
                                                    iconMap[method.icon];
                                                return Icon ? (
                                                    <Icon width={24} />
                                                ) : null;
                                            })()}
                                        </div>
                                        <div className="info-content">
                                            <h4>{method.label}</h4>
                                            <p>{method.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="my-auto">
                            {hasMounted ? (
                                <GoogleReCaptchaProvider
                                    reCaptchaKey={recaptchaSiteKey}
                                >
                                    <ContactForm translations={translations?.form} />
                                </GoogleReCaptchaProvider>
                            ) : (
                                <ContactForm translations={translations?.form} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-2 md:p-8 lg:p-16">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                    {hasMounted ? (
                        <GMaps
                            position={{
                                lat: 43.8649131,
                                lng: 25.9887618,
                                alt: '1132m',
                            }}
                        />
                    ) : (
                        <div className="h-full w-full bg-muted" />
                    )}
                </div>
            </section>

            <section className="faq-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            {translations.faqSection.badge}
                        </span>
                        <h2 className="section-title">{translations.faqSection.title}</h2>
                    </div>

                    <div className="faq-grid">
                        {faqs.map((faq) => (
                            <div className="faq-item" key={faq.question}>
                                <h4>{faq.question}</h4>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

Contacts.layout = {
    breadcrumbs: [
        {
            title: 'Contacts',
            href: contacts(),
        },
    ],
};
