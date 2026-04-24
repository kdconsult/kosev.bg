import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { index as products, show } from '@/routes/products';
import type { Product } from '@/types';
import { Translations } from '@/types/translations';

export default function ProductsTeaserSection({
    featuredProducts,
    translations
}: {
    featuredProducts: Product[];
    translations: Translations;
}) {
    return (
        <section className="section bg-secondary">
            <div className="container">
                <div className="mx-auto mb-16 max-w-175 text-center md:mb-20">
                    <span className="section-subtitle">Нашите продукти</span>
                    <h2>Прецизни метални изделия</h2>
                    <p>
                        Произвеждаме широк спектър от метални изделия по
                        клиентски спецификации — от единични детайли до
                        серийно производство.
                    </p>
                </div>

                <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <Link
                            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            href={show(product.slug)}
                            key={product.slug}
                        >
                            <div className="relative aspect-4/3 overflow-hidden">
                                <img
                                    src={product.cover_image?.thumbUrl}
                                    alt={product.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-block rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                                        {product.category.name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-lg">{product.title}</h3>
                                <p className="mb-4 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                                    {product.short_description}
                                </p>
                                <span className="text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-brand-gold">
                                    {translations.buttons.see_details}
                                    <ChevronRight className="inline-block h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link href={products()} className="btn btn-accent btn-lg">
                        {translations.buttons.view_all_products}
                    </Link>
                </div>
            </div>
        </section>
    );
}
