import { Link } from '@inertiajs/react';

import { products } from '@/data/products';

const featuredProducts = products.slice(0, 3);

export default function ProductsTeaserSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                        Нашите продукти
                    </span>
                    <h2 className="text-[2rem] md:text-[2.5rem] font-normal mt-3 mb-4 text-gray-900 leading-[1.2]">
                        Прецизни метални изделия
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Произвеждаме широк спектър от метални изделия по клиентски спецификации —
                        от единични детайли до серийно производство.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featuredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group block bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg text-gray-900 mb-2 leading-[1.3]">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <span className="text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-brand-gold">
                                    Виж детайли →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-300"
                    >
                        Виж всички продукти
                    </Link>
                </div>
            </div>
        </section>
    );
}
