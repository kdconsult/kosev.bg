import { Link } from '@inertiajs/react';

const certifications = [
    { name: 'ISO 9001:2015', description: 'Управление на качеството' },
    { name: 'ISO 14001', description: 'Околна среда' },
    { name: 'EN 1090', description: 'Стоманени конструкции' },
    { name: 'ISO 3834', description: 'Качество при заваряване' },
];

const techFeatures = [
    'Fiber лазер 6kW',
    'CNC абкант 320т',
    'Роботизирано заваряване',
    'CAD/CAM',
    '3D измерване',
    'ERP система',
];

export default function QualitySection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <div className="mb-12 lg:mb-0">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                            Качество и технологии
                        </span>
                        <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                            Модерно оборудване, безкомпромисно качество
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Инвестираме непрекъснато в най-съвременно оборудване и технологии.
                            Нашият стриктен контрол гарантира изделия с изключително качество.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {certifications.map((cert) => (
                                <div key={cert.name} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
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
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-semibold text-gray-900">
                                            {cert.name}
                                        </span>
                                        <span className="block text-xs text-gray-500 mt-0.5">
                                            {cert.description}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                                Технически възможности
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {techFeatures.map((feature) => (
                                    <span
                                        key={feature}
                                        className="text-sm text-gray-700 border border-gray-200 px-3 py-1 rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/certificates"
                            className="text-sm font-semibold text-brand-gold hover:opacity-70 transition-opacity duration-300"
                        >
                            Виж всички сертификати →
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
                            <img
                                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                                alt="CNC машина за прецизна обработка"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-6 left-6 w-[45%] hidden lg:block">
                            <div className="rounded-lg overflow-hidden border-4 border-white shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80"
                                    alt="Лазерно рязане в действие"
                                    loading="lazy"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
