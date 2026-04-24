import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { show } from '@/routes/services';
import { index } from '@/routes/services';
import type { Service } from '@/types/models';
import type { Translations } from '@/types/translations';

export default function CapabilitiesSection({
    services,
    translations,
}: {
    services: Service[];
    translations: Translations;
}) {
    void translations;

    return (
        <section className="section bg-background">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Нашите възможности</span>
                    <h2 className="section-title">
                        Цялостни решения за металообработка
                    </h2>
                    <p className="section-description">
                        От лазерно рязане до финална сглобка - предлагаме пълен
                        спектър услуги за производство на метални изделия с
                        изключително качество.
                    </p>
                </div>

                <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((capability, index) => (
                        <div
                            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-400 ease-in-out hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
                            key={capability.id}
                        >
                            <div className="relative h-50 shrink-0 overflow-hidden">
                                <img
                                    src={capability.cover_image?.originalUrl}
                                    alt={capability.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-50% to-black/30" />
                                <div className="absolute top-4 left-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-serif text-xs font-semibold text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-gold group-hover:text-primary-foreground">
                                    0{index + 1}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-7">
                                <div className="flex-1">
                                    <h3 className="mb-2.5 text-[1.25rem] leading-[1.3] text-foreground">
                                        {capability.name}
                                    </h3>
                                    <p className="mb-4.5 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                                        {capability.short_description}
                                    </p>
                                </div>
                                <Link
                                    href={show(capability.slug)}
                                    className="mt-auto inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-foreground"
                                >
                                    <span>
                                        {translations.buttons.learn_more}
                                    </span>
                                    <ArrowRight
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        size={16}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Link href={index()} className="btn btn-accent btn-lg">
                        {translations.buttons.view_all_services}
                    </Link>
                </div>
            </div>
        </section>
    );
}
