import { Head } from '@inertiajs/react';
import { ClockIcon, MailIcon, MapPin, PhoneIcon } from 'lucide-react';
import ContactForm from '@/components/contact-form';
import { contacts } from '@/routes';

export default function Contacts() {
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
                                        <MapPin width={24} />
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
                                        <PhoneIcon size={24} />
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
                                        <MailIcon size={24} />
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
                                        <ClockIcon size={24} />
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

                        <div className="my-auto">
                            <ContactForm />
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
