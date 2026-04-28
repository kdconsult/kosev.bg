import { MailIcon, PhoneIcon } from 'lucide-react';
import ContactForm from '../contact-form';
import { Translations } from '@/types/translations';

export default function CtaFormSection({translations}: { translations?: Translations['ctaFormSection'] }) {
    return (
        <>
            <style>
                {`

.cta-content {
  h2 {
    margin-bottom: 1.25rem;
    text-wrap: balance;
  }

  > p {
    font-size: 1.0625rem;
    color: var(--color-muted-foreground);
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
}

.cta-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-card);
  color: var(--color-brand-gold);
  border: 1px solid var(--color-border);
}

.info-text {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8125rem;
  color: var(--color-muted-foreground);
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-foreground);
}

.cta-form-card {
  background: var(--color-card);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);

  @media (min-width: 768px) {
    padding: 3rem;
  }

  h3 {
    font-size: 1.5rem;
    color: var(--color-foreground);
    margin-bottom: 2rem;
  }
}
`}
            </style>
            <section className="section bg-background">
                <div className="container">
                    <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] lg:gap-20">
                        <div className="cta-content">
                            <span className="section-subtitle">
                                {translations?.badge || 'Свържете се с нас'}
                            </span>
                            <h2>{translations?.title || 'Готови да обсъдим вашия проект?'}</h2>
                            <p>
                                {translations?.description || 'Изпратете ни запитване и нашият екип ще се свърже с вас в рамките на 24 часа.'}
                            </p>

                            <div className="cta-info">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <PhoneIcon size={20} />
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">
                                            {translations?.phone.label || 'Телефон'}
                                        </span>
                                        <span className="info-value">
                                            {translations?.phone.value || '+359 88 123 4567'}
                                        </span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon">
                                        <MailIcon size={20} />
                                    </div>
                                    <div className="info-text">
                                        <span className="info-label">
                                            {translations?.email.label || 'Имейл'}
                                        </span>
                                        <span className="info-value">
                                            {translations?.email.value || 'marketing@kosev.bg'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ContactForm translations={translations?.form} />
                    </div>
                </div>
            </section>
        </>
    );
}
