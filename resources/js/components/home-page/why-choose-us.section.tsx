import type { Translations } from "@/types/translations";

export default function WhyChooseUsSection({ translations }: { translations: Translations['whyChooseUsSection'] }) {
    return (
        <section className="section bg-background">
            <div className="container">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <span className="section-subtitle">{translations.badge}</span>
                        <h2 className="mb-6 text-balance">
                            {translations.title}
                        </h2>
                        <p className="mb-12 text-[1.0625rem] leading-[1.8] text-muted-foreground">
                            {translations.description}
                        </p>

                        <div className="grid gap-8 sm:grid-cols-2">
                            {translations.advantages.map((advantage, index) => (
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

                    <div className="order-first lg:order-0">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={translations.featuredImage.src}
                                alt={translations.featuredImage.alt}
                                loading="lazy"
                                className="h-auto w-full object-cover aspect-4/3 lg:aspect-square"
                            />
                            <div className="absolute top-6 left-6 flex flex-col rounded-md bg-card px-8 py-6 shadow-xl">
                                <span className="font-serif text-[2.5rem] leading-none font-normal text-foreground">
                                    {translations.featuredImage.info.number}
                                </span>
                                <span className="mt-1 text-sm text-muted-foreground">
                                    {translations.featuredImage.info.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
