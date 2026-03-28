import { Head, Link } from '@inertiajs/react';
import { contacts, services } from '@/routes';
import { cn } from '@/lib/utils';
import {
    Cpu,
    GitBranch,
    Zap,
    Wrench,
    Paintbrush,
    LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    precision_manufacturing: Cpu,
    polyline: GitBranch,
    electric_bolt: Zap,
    handyman: Wrench,
    format_paint: Paintbrush,
};

export default function Services() {
    const services = [
        {
            id: 'laser-cutting',
            title: 'Лазерно рязане',
            description:
                'Високопрецизно лазерно рязане на метални листове с модерно CNC оборудване. Нашите fiber лазери осигуряват изключителна точност и бързина при обработката на различни метални материали.',
            image: 'https://kosev.bg/wp-content/uploads/2019/09/lazer-cutting-400x300.jpg',
            icon: 'precision_manufacturing',
            specs: [
                { label: 'Максимална дебелина стомана', value: 'до 25mm' },
                {
                    label: 'Максимална дебелина неръждаема стомана',
                    value: 'до 15mm',
                },
                { label: 'Максимална дебелина алуминий', value: 'до 15mm' },
                { label: 'Работна площ', value: '4000 x 2000mm' },
                { label: 'Прецизност', value: '±0.2mm' },
            ],
            benefits: [
                'Бърза обработка',
                'Минимален отпадък',
                'Чисти ръбове',
                'Сложни контури',
                'Повторяемост',
                'Гъвкавост на материалите',
            ],
        },
        {
            id: 'bending',
            title: 'Огъване на метал',
            description:
                'Прецизно огъване на метални листове с CNC абкант преси. Можем да създаваме сложни профили и форми с висока точност и повторяемост.',
            image: 'https://kosev.bg/wp-content/uploads/2019/09/1471259471.jpg',
            icon: 'polyline',
            specs: [
                { label: 'Максимална дължина', value: 'до 4000mm' },
                { label: 'Сила на натиск', value: 'до 320 тона' },
                { label: 'Максимална дебелина', value: 'до 16mm' },
                { label: 'Брой оси', value: '6 оси' },
                { label: 'Точност на ъгъла', value: '±0.5°' },
            ],
            benefits: [
                'Сложни профили',
                'Висока повторяемост',
                'Бърза настройка',
                'Многообразие от инструменти',
                'CNC управление',
                'Автоматична корекция',
            ],
        },
        {
            id: 'welding',
            title: 'Заваряване',
            description:
                'Професионално заваряване с MIG/MAG, TIG и електродъгово оборудване. Нашите сертифицирани заварчици гарантират здрави и качествени заварки.',
            image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
            icon: 'electric_bolt',
            specs: [
                { label: 'MIG/MAG заваряване', value: 'до 500A' },
                { label: 'TIG заваряване', value: 'AC/DC' },
                { label: 'Роботизирано заваряване', value: 'Да' },
                { label: 'Материали', value: 'Стомана, неръжд., алуминий' },
                { label: 'Сертификация', value: 'EN ISO 3834-2' },
            ],
            benefits: [
                'Сертифицирани заварчици',
                'Роботизирани процеси',
                'Визуален контрол',
                'NDT тестване',
                'Различни материали',
                'Конструктивно заваряване',
            ],
        },
        {
            id: 'assembly',
            title: 'Монтаж и сглобяване',
            description:
                'Сглобяване на метални конструкции и завършени изделия по спецификация. Предлагаме цялостни решения от отделни компоненти до готови продукти.',
            image: 'https://kosev.bg/wp-content/uploads/2019/09/1432706260-1024x579.jpg',
            icon: 'handyman',
            specs: [
                { label: 'Тип монтаж', value: 'Механичен и заварен' },
                { label: 'Нитове', value: 'Всички типове' },
                { label: 'Резби', value: 'M3 до M30' },
                { label: 'Тестване', value: 'Функционално и визуално' },
                { label: 'Опаковка', value: 'По спецификация' },
            ],
            benefits: [
                'Комплексни решения',
                'Готови продукти',
                'Контрол на качеството',
                'Гъвкава производственост',
                'Персонализирана опаковка',
                'JIT доставки',
            ],
        },
        {
            id: 'surface-treatment',
            title: 'Повърхностна обработка',
            description:
                'Финишна обработка включително шлифоване, полиране, почистване и подготовка за боядисване. Осигуряваме перфектна повърхност за всяко приложение.',
            image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
            icon: 'format_paint',
            specs: [
                { label: 'Шлифоване', value: 'Грубост Ra 0.8-6.3' },
                { label: 'Полиране', value: 'Огледално и матово' },
                { label: 'Почистване', value: 'Обезмасляване, киселинно' },
                { label: 'Пясъкоструене', value: 'SA 2.5 / SA 3' },
                { label: 'Грундиране', value: 'По спецификация' },
            ],
            benefits: [
                'Естетичен вид',
                'Защита от корозия',
                'Подготовка за боя',
                'Различни степени на грапавост',
                'Почистване и обезмасляване',
                'Пасивиране на неръждаема стомана',
            ],
        },
    ];
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
                            className={cn('service-block', {
                                reverse: i % 2 !== 0,
                            })}
                            key={service.id}
                        >
                            <div className="service-image">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                />
                            </div>
                            <div className="service-content">
                                <div className="flex items-baseline gap-4">
                                    {(() => {
                                        const Icon = iconMap[service.icon];
                                        return Icon ? (
                                            <Icon className="h-10 w-10 min-w-10" />
                                        ) : null;
                                    })()}
                                    <h2>{service.title}</h2>
                                </div>
                                <p className="service-description">
                                    {service.description}
                                </p>

                                <div className="service-specs">
                                    <h4>Технически възможности</h4>
                                    <ul className="specs-list">
                                        {service.specs.map((spec) => (
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
                                        {service.benefits.map((benefit) => (
                                            <li key={benefit}>
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
                                                {benefit}
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
