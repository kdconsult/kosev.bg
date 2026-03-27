import { cn } from '@/lib/utils';

const industries = [
    {
        name: 'Автомобилна индустрия',
        description:
            'Прецизни компоненти и части за водещи автомобилни производители в Европа.',
        image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80',
    },
    {
        name: 'Машиностроене',
        description: 'Компоненти за промишлени машини и оборудване.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
    {
        name: 'Строителство',
        description: 'Метални конструкции и елементи за строителния сектор.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    },
    {
        name: 'Мебелна индустрия',
        description: 'Метални рамки и компоненти за мебелно производство.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    },
    {
        name: 'Енергетика',
        description: 'Конструкции за енергийния сектор и възобновяема енергия.',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
    },
];

export default function IndustriesSection() {
    return (
        <>
            <style>{`
.industries {
  background: var(--color-gray-50);
}

.industries-layout {
  display: grid;
  gap: 4rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 2fr;
    gap: 5rem;
    align-items: start;
  }
}

.industries-header {
  @media (min-width: 1024px) {
    position: sticky;
    top: 120px;
  }

  h2 {
    margin-bottom: 1.25rem;
    text-wrap: balance;
  }

  p {
    font-size: 1.0625rem;
    color: var(--color-gray-500);
    line-height: 1.8;
  }
}

.industries-grid {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.industry-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: transparent;
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);

    .industry-image img {
      transform: scale(1.05);
    }
  }

  &.large {
    @media (min-width: 640px) {
      grid-column: span 2;
    }

    .industry-image {
      aspect-ratio: 21 / 9;
    }
  }
}

.industry-image {
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.industry-content {
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.industry-number {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  color: var(--color-brand-gold);
  display: block;
  margin-bottom: 0.75rem;
}

h3 {
  font-size: 1.25rem;
  color: var(--color-gray-900);
  margin-bottom: 0.5rem;
}

p {
  font-size: 0.9375rem;
  color: var(--color-gray-500);
  line-height: 1.6;
}

`}</style>
            <section className="section industries">
                <div className="container">
                    <div className="industries-layout">
                        <div className="industries-header">
                            <span className="section-subtitle">Индустрии</span>
                            <h2>Обслужваме водещи сектори в Европа</h2>
                            <p>
                                Нашите метални изделия намират приложение в
                                разнообразни индустрии, като осигуряваме
                                специализирани решения за всеки сектор.
                            </p>
                        </div>

                        <div className="industries-grid">
                            {industries.map((industry, i) => (
                                <div
                                    className={cn('industry-card', {
                                        large: i === 0,
                                    })}
                                    key={i}
                                >
                                    <div className="industry-image">
                                        <img
                                            src={industry.image}
                                            alt={industry.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="industry-content">
                                        <span className="industry-number">
                                            0{i + 1}
                                        </span>
                                        <h3>{industry.name}</h3>
                                        <p>{industry.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
