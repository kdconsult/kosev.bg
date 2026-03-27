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
        <section className="py-24 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <div className="mb-12 lg:mb-0">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                            Защо KOSEV
                        </span>
                        <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                            Вашият надежден производствен партньор
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-10">
                            Над две десетилетия изграждаме репутация на доверен партньор за
                            европейски компании. Съчетаваме опит, технологии и отдаденост към
                            качеството.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            {advantages.map((advantage) => (
                                <div key={advantage.title} className="flex gap-4">
                                    <div className="font-serif text-[2.5rem] text-brand-gold leading-none flex-shrink-0">
                                        {advantage.stat}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                            {advantage.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {advantage.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-lg overflow-hidden aspect-[4/5]">
                            <img
                                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
                                alt="Модерно производствено оборудване в KOSEV"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-6 left-6 bg-white rounded-lg px-6 py-5 shadow-xl">
                            <span className="block font-serif text-[2.5rem] text-gray-900 leading-none">
                                20+
                            </span>
                            <span className="block text-sm text-gray-500 mt-1">години опит</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
