import { Link } from '@inertiajs/react';

const capabilities = [
    {
        title: 'Лазерно рязане',
        description:
            'Високопрецизно лазерно рязане на метални листове с модерно CNC оборудване за максимална точност.',
        image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
        features: ['Дебелина до 25mm стомана', 'Прецизност ±0.1mm', 'Бърза обработка'],
    },
    {
        title: 'Огъване на метал',
        description: 'Прецизно огъване на метални листове с CNC абкант преси за сложни форми.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
        features: ['Дължина до 4000mm', 'Сила до 320 тона', 'Сложни профили'],
    },
    {
        title: 'Заваряване',
        description: 'Професионално заваряване с MIG/MAG, TIG и електродъгово оборудване.',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
        features: ['MIG/MAG заваряване', 'TIG заваряване', 'Сертифицирани заварчици'],
    },
    {
        title: 'Монтаж',
        description: 'Сглобяване на метални конструкции и завършени изделия по спецификация.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        features: ['Механичен монтаж', 'Нитове и болтове', 'Готови изделия'],
    },
    {
        title: 'Повърхностна обработка',
        description: 'Финишна обработка включително шлифоване, полиране и подготовка за боядисване.',
        image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?auto=format&fit=crop&w=800&q=80',
        features: ['Шлифоване', 'Полиране', 'Обезмасляване'],
    },
    {
        title: 'CNC обработка',
        description: 'Прецизна механична обработка на детайли с модерни CNC машини.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?auto=format&fit=crop&w=800&q=80',
        features: ['Фрезоване', 'Струговане', 'Пробиване'],
    },
];

export default function CapabilitiesSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                        Нашите възможности
                    </span>
                    <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                        Цялостни решения за металообработка
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        От лазерно рязане до финална сглобка — предлагаме пълен спектър услуги за
                        производство на метални изделия с изключително качество.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((capability, i) => (
                        <div
                            key={capability.title}
                            className="group flex flex-col rounded-lg overflow-hidden bg-white border border-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
                        >
                            <div className="relative h-[200px] overflow-hidden flex-shrink-0">
                                <img
                                    src={capability.image}
                                    alt={capability.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/30" />
                                <div className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-semibold text-gray-800 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 p-7">
                                <div className="flex-1">
                                    <h3 className="text-xl text-gray-900 mb-2.5 leading-[1.3]">
                                        {capability.title}
                                    </h3>
                                    <p className="text-[0.9375rem] text-gray-500 leading-[1.7] mb-4">
                                        {capability.description}
                                    </p>
                                    <ul className="space-y-1.5 mb-6">
                                        {capability.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="relative pl-4 text-sm text-gray-600 before:content-[''] before:absolute before:left-0 before:top-[0.5em] before:w-1 before:h-1 before:rounded-full before:bg-brand-gold"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 pt-5 border-t border-gray-100 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1"
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
    );
}
