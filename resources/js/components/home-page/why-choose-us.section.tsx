const advantages = [
    {
        stat: '500+',
        title: 'Завършени проекта',
        description: 'Успешно изпълнени поръчки за европейски клиенти',
    },
    {
        stat: '50+',
        title: 'Европейски партньори',
        description: 'Работим с водещи компании от цяла Европа',
    },
    {
        stat: '99%',
        title: 'Спазени срокове',
        description: 'Надеждност и навременна доставка',
    },
    {
        stat: '24ч',
        title: 'Бърз отговор',
        description: 'Отговаряме на запитвания до 24 часа',
    },
];

export default function WhyChooseUsSection() {
    return (
        <>
            <style>{`
        .why-us {
  background: var(--color-cream);
}

.why-us-grid {
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}

.why-us-content {
  h2 {
    margin-bottom: 1.5rem;
    text-wrap: balance;
  }
}

.why-us-description {
  font-size: 1.0625rem;
  color: var(--color-gray-500);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.advantages {
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.advantage {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.advantage-number {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--color-brand-gold);
  line-height: 1;
}

.advantage-info {
  h4 {
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-gray-900);
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9375rem;
    color: var(--color-gray-500);
    line-height: 1.6;
  }
}

.why-us-visual {
  @media (max-width: 1023px) {
    order: -1;
  }
}

.visual-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;

    @media (min-width: 1024px) {
      aspect-ratio: 1;
    }
  }
}

.visual-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
}

.badge-number {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--color-gray-900);
  line-height: 1;
}

.badge-text {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin-top: 0.25rem;
}

        `}</style>
            <section className="section why-us">
                <div className="container">
                    <div className="why-us-grid">
                        <div className="why-us-content">
                            <span className="section-subtitle">Защо KOSEV</span>
                            <h2>Вашият надежден производствен партньор</h2>
                            <p className="why-us-description">
                                Над две десетилетия изграждаме репутация на
                                доверен партньор за европейски компании.
                                Съчетаваме опит, технологии и отдаденост към
                                качеството.
                            </p>

                            <div className="advantages">
                                {advantages.map((advantage, index) => (
                                    <div className="advantage" key={index}>
                                        <div className="advantage-number">
                                            {advantage.stat}
                                        </div>
                                        <div className="advantage-info">
                                            <h4>{advantage.title}</h4>
                                            <p>{advantage.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="why-us-visual">
                            <div className="visual-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
                                    alt="Модерно производствено оборудване в KOSEV"
                                    loading="lazy"
                                />
                                <div className="visual-badge">
                                    <span className="badge-number">20+</span>
                                    <span className="badge-text">
                                        години опит
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
