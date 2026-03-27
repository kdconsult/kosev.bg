const industries = [
    {
        name: 'Автомобилна индустрия',
        description: 'Прецизни компоненти и части за водещи автомобилни производители в Европа.',
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
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
                    <div className="mb-12 lg:mb-0 lg:sticky lg:top-[120px] lg:self-start">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                            Индустрии
                        </span>
                        <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                            Обслужваме водещи сектори в Европа
                        </h2>
                        <p className="text-gray-500 leading-relaxed">
                            Нашите метални изделия намират приложение в разнообразни индустрии, като
                            осигуряваме специализирани решения за всеки сектор.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {industries.map((industry, i) => (
                            <div
                                key={industry.name}
                                className={`group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl${i === 0 ? ' sm:col-span-2' : ''}`}
                            >
                                <div
                                    className={`relative overflow-hidden${i === 0 ? ' aspect-[21/9]' : ' aspect-[16/10]'}`}
                                >
                                    <img
                                        src={industry.image}
                                        alt={industry.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="font-serif text-sm font-semibold text-brand-gold">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-lg text-gray-900 mt-1 mb-1.5 leading-[1.3]">
                                        {industry.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {industry.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
