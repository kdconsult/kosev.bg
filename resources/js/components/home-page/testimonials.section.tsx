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
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                        Отзиви
                    </span>
                    <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 text-gray-900 leading-[1.2]">
                        Какво казват нашите партньори
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="flex flex-col bg-gray-50 rounded-lg p-8 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="text-gray-200 mb-4">
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

                            <blockquote className="font-serif italic text-gray-700 leading-relaxed flex-1 mb-6">
                                {testimonial.quote}
                            </blockquote>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-serif text-lg flex-shrink-0">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="block text-sm font-semibold text-gray-900">
                                        {testimonial.name}
                                    </span>
                                    <span className="block text-xs text-gray-500 mt-0.5">
                                        {testimonial.role}, {testimonial.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
