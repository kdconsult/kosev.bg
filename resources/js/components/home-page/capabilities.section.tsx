import { services } from '@/routes';
import { Link } from '@inertiajs/react';

const capabilities = [
    {
        title: 'Лазерно рязане',
        description:
            'Високопрецизно лазерно рязане на метални листове с модерно CNC оборудване за максимална точност.',
        image: 'https://kosev.bg/wp-content/uploads/2019/09/lazer-cutting-400x300.jpg',
        features: [
            'Дебелина до 25mm стомана',
            'Прецизност ±0.1mm',
            'Бърза обработка',
        ],
    },
    {
        title: 'Огъване на метал',
        description:
            'Прецизно огъване на метални листове с CNC абкант преси за сложни форми.',
        image: 'https://kosev.bg/wp-content/uploads/2019/09/1471259471.jpg',
        features: ['Дължина до 4000mm', 'Сила до 320 тона', 'Сложни профили'],
    },
    {
        title: 'Заваряване',
        description:
            'Професионално заваряване с MIG/MAG, TIG и електродъгово оборудване.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
        features: [
            'MIG/MAG заваряване',
            'TIG заваряване',
            'Сертифицирани заварчици',
        ],
    },
    {
        title: 'Монтаж',
        description:
            'Сглобяване на метални конструкции и завършени изделия по спецификация.',
        image: 'https://kosev.bg/wp-content/uploads/2019/09/1432706260-1024x579.jpg',
        features: ['Механичен монтаж', 'Нитове и болтове', 'Готови изделия'],
    },
    {
        title: 'Повърхностна обработка',
        description:
            'Финишна обработка включително шлифоване, полиране и подготовка за боядисване.',
        image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
        features: ['Шлифоване', 'Полиране', 'Обезмасляване'],
    },
    {
        title: 'CNC обработка',
        description:
            'Прецизна механична обработка на детайли с модерни CNC машини.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
        features: ['Фрезоване', 'Струговане', 'Пробиване'],
    },
];

export default function CapabilitiesSection() {
    return (
        <>
            <style>{`
.capabilities {
  background: var(--color-card);
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
  background: rgba(255, 255, 255, 0.9);
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
                        {capabilities.map((capability, index) => (
                            <div className="capability-card" key={index}>
                                <div className="capability-image">
                                    <img
                                        src={capability.image}
                                        alt={capability.title}
                                        loading="lazy"
                                    />
                                    <div className="capability-number">
                                        0{index + 1}
                                    </div>
                                </div>
                                <div className="capability-body">
                                    <div className="capability-content">
                                        <h3>{capability.title}</h3>
                                        <p>{capability.description}</p>
                                        <ul className="capability-features">
                                            {capability.features.map(
                                                (feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                    <Link
                                        href={services()}
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
