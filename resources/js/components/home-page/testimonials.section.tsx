const testimonials = [
    {
        name: 'Hans Mueller',
        role: 'Procurement Manager',
        company: 'AutoTech GmbH',
        quote: 'KOSEV е нашият основен доставчик на метални компоненти вече 8 години. Качеството е неизменно високо, а сроковете винаги се спазват.',
    },
    {
        name: 'Pierre Dubois',
        role: 'Operations Director',
        company: 'MechaParts SA',
        quote: 'Работата с KOSEV е истинско удоволствие. Техният екип е отзивчив и професионален, а техническите възможности им позволяват да изпълнят и най-сложните поръчки.',
    },
    {
        name: 'Marco Rossi',
        role: 'Technical Director',
        company: 'IndustriaItalia SpA',
        quote: 'Прецизността на лазерното рязане и качеството на заваръчните работи надминават очакванията ни. KOSEV е надежден партньор за нашето производство.',
    },
];

export default function TestimonialsSection() {
    return (
        <>
            <style>{`.testimonials {
  background: var(--color-white);
}

.testimonials-grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--color-white);
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
}

.testimonial-quote {
  color: var(--color-gray-200);
  margin-bottom: 1.5rem;
}

blockquote {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--color-gray-700);
  flex-grow: 1;
  margin-bottom: 2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-gray-200);
}

.author-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-gray-900);
  color: var(--color-white);
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 500;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.author-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.author-meta {
  font-size: 0.8125rem;
  color: var(--color-gray-500);
}
`}</style>
            <section className="section testimonials">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Отзиви</span>
                        <h2 className="section-title">
                            Какво казват нашите партньори
                        </h2>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, idx) => (
                            <div className="testimonial-card" key={idx}>
                                <div className="testimonial-quote">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
                                    </svg>
                                </div>
                                <blockquote>{testimonial.quote}</blockquote>
                                <div className="testimonial-author">
                                    <div className="author-avatar">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="author-info">
                                        <span className="author-name">
                                            {testimonial.name}
                                        </span>
                                        <span className="author-meta">
                                            {testimonial.role},{' '}
                                            {testimonial.company}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
