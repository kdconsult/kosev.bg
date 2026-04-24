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
        <section className="section bg-background">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <span className="section-subtitle">Защо KOSEV</span>
                        <h2 className="mb-6 text-balance">
                            Вашият надежден производствен партньор
                        </h2>
                        <p className="mb-12 text-[1.0625rem] leading-[1.8] text-muted-foreground">
                            Над две десетилетия изграждаме репутация на доверен
                            партньор за европейски компании. Съчетаваме опит,
                            технологии и отдаденост към качеството.
                        </p>

                        <div className="grid gap-8 sm:grid-cols-2">
                            {advantages.map((advantage, index) => (
                                <div className="flex flex-col gap-3" key={index}>
                                    <div className="font-serif text-[2.5rem] leading-none font-normal text-brand-gold">
                                        {advantage.stat}
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-sans text-base font-semibold text-foreground">
                                            {advantage.title}
                                        </h4>
                                        <p className="text-[0.9375rem] leading-[1.6] text-muted-foreground">
                                            {advantage.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-first lg:order-none">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src="/storage/images/kosev/kosev-front.jpg"
                                alt="Модерно производствено оборудване в KOSEV"
                                loading="lazy"
                                className="h-auto w-full object-cover aspect-4/3 lg:aspect-square"
                            />
                            <div className="absolute top-6 left-6 flex flex-col rounded-md bg-card px-8 py-6 shadow-xl">
                                <span className="font-serif text-[2.5rem] leading-none font-normal text-foreground">
                                    20+
                                </span>
                                <span className="mt-1 text-sm text-muted-foreground">
                                    години опит
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
