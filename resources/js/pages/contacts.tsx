import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { contacts } from '@/routes';
import { useState } from 'react';

export default function Contacts() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        message: '',
    });

    const faqs = [
        {
            question: 'Какви са сроковете за изпълнение?',
            answer: 'Сроковете зависят от сложността и обема на поръчката. Обикновено стандартни поръчки се изпълняват за 2-4 седмици. За спешни поръчки можем да предложим експресна обработка.',
        },
        {
            question: 'Имате ли минимална поръчка?',
            answer: 'Не, нямаме строги изисквания за минимална поръчка. Работим както с единични детайли, така и със серийни производства.',
        },
        {
            question: 'Какви материали обработвате?',
            answer: 'Обработваме всички видове стомана (черна, неръждаема, галванизирана), алуминий, мед и месинг с различни дебелини и размери.',
        },
        {
            question: 'Предлагате ли доставка?',
            answer: 'Да, разполагаме със собствен транспорт и работим с утвърдени логистични компании за доставки в цяла Европа.',
        },
        {
            question: 'Как да получа оферта?',
            answer: 'Изпратете ни техническа документация (чертежи, 3D модели) и количества чрез формата за контакт или на нашия имейл. Ще получите оферта до 24 часа.',
        },
        {
            question: 'Приемате ли 3D файлове?',
            answer: 'Да, приемаме всички стандартни CAD формати: STEP, IGES, DXF, DWG, PDF, както и SolidWorks и AutoCAD файлове.',
        },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = () => {
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            alert('Благodarим ви за запитването! Ще се свържем с вас скоро.');
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                country: '',
                message: '',
            });
        }, 1500);
    };
    return (
        <>
            <Head title="Свържете се с нас" />
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

.map-placeholder {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  span {
    padding: 0.75rem 1.5rem;
    background: var(--color-background);
    border-radius: var(--radius-md);
    font-weight: 500;
    color: var(--color-foreground);
  }
}

.contact-form {
  background: var(--color-card);
  padding: 2rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);

  @media (min-width: 768px) {
    padding: 2.5rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
}

.form-intro {
  font-size: 1rem;
  margin-bottom: 2rem;
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
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
                        alt="Свържете се с KOSEV"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <span className="hero-badge">Контакти</span>
                    <h1>Свържете се с нас</h1>
                    <p>
                        Имате въпроси или проект за обсъждане? Нашият екип е
                        готов да ви помогне.
                    </p>
                </div>
            </section>

            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>Информация за контакт</h2>
                            <p className="contact-intro">
                                Свържете се с нас по телефон, имейл или ни
                                посетете в нашата производствена база.
                            </p>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div className="info-content">
                                        <h4>Адрес</h4>
                                        <p>
                                            ул. Тракция №2
                                            <br />
                                            7003 гр. Русе, България
                                            <br />
                                        </p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <div className="info-content">
                                        <h4>Телефон</h4>
                                        <p>
                                            +359 32 123 456
                                            <br />
                                            +359 88 123 4567
                                        </p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <div className="info-content">
                                        <h4>Имейл</h4>
                                        <p>
                                            info&#64;kosev.bg
                                            <br />
                                            marketing&#64;kosev.bg
                                        </p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div className="info-content">
                                        <h4>Работно време</h4>
                                        <p>
                                            Понеделник - Петък
                                            <br />
                                            08:00 - 17:00
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="map-placeholder">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                                    alt="Карта на локацията"
                                />
                                <div className="map-overlay">
                                    <span>Вижте ни на картата</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <form onSubmit={onSubmit} className="contact-form">
                                <h2>Изпратете запитване</h2>
                                <p className="form-intro">
                                    Попълнете формата и нашият екип ще се свърже
                                    с вас в рамките на 24 часа.
                                </p>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Име *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            name="name"
                                            placeholder="Вашето име"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Фирма</label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    company: e.target.value,
                                                })
                                            }
                                            name="company"
                                            placeholder="Име на фирмата"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Имейл *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            name="email"
                                            placeholder="email&#64;company.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Телефон</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    phone: e.target.value,
                                                })
                                            }
                                            name="phone"
                                            placeholder="+359 88 123 4567"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="country">Държава</label>
                                    <select
                                        id="country"
                                        value={formData.country}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                country: e.target.value,
                                            })
                                        }
                                        name="country"
                                    >
                                        <option value="">
                                            Изберете държава
                                        </option>
                                        <option value="BG">България</option>
                                        <option value="DE">Германия</option>
                                        <option value="AT">Австрия</option>
                                        <option value="FR">Франция</option>
                                        <option value="IT">Италия</option>
                                        <option value="NL">Холандия</option>
                                        <option value="other">Друга</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        Съобщение / Запитване *
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        name="message"
                                        rows={5}
                                        placeholder="Опишете вашия проект или запитване..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-accent btn-lg submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span>Изпращане...</span>
                                    ) : (
                                        <>
                                            <span>Изпрати запитване</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
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
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">
                            Често задавани въпроси
                        </span>
                        <h2 className="section-title">Имате въпроси?</h2>
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
