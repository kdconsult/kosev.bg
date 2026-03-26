import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=2000&q=80"
                    className="hero-video h-full w-full object-cover"
                >
                    <source
                        src="https://herhovatuckrcuhmimem.supabase.co/storage/v1/object/public/blog-media/0721_web_no_audio.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="video-overlay absolute inset-0 bg-linear-to-b from-[#0f171e66] via-[#0f171e4d] to-[#0f171e80]"></div>
            </div>

            <div className="relative z-10 max-w-2xl flex min-h-screen flex-col items-start justify-center md:flex-row md:items-center md:justify-between mx-auto">
                <div className="hero-text max-w-xl">
                    <span className="border border-yellow-200 dark:border-yellow-400 text-yellow-200 dark:text-yellow-400 bg-yellow-100/30 rounded-4xl px-3 py-4 hidden md:block ">
                        Над 20 години опит в металообработката
                    </span>

                    <h1 className="text-7xl">
                        Прецизност в детайла,
                        <br />
                        качество в резултата
                    </h1>

                    <p className="hero-description text-xl hidden md:block">
                        KOSEV LTD е вашият партньор за висококачествено лазерно
                        рязане и метални конструкции. Обслужваме водещи
                        европейски компании с прецизност и надеждност.
                    </p>

                    <div className="hero-actions">
                        <Link href="/contact">
                            Изпратете запитване
                            <ChevronRight />
                        </Link>
                        <Link href="/services"> Нашите услуги </Link>
                    </div>
                </div>

                <div className="hero-stats mt-12 hidden md:block lg:mt-0">
                    <div className="flex items-center gap-6 md:gap-10 bg-[#ffffff1a] backdrop-blur px-8 py-8 md:px-10 md:py-12 rounded-md border border-gray-100/15 ">
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-light">500+</span>
                            <span className="text-sm mt-2 whitespace-nowrap">
                                Завършени проекта
                            </span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-light">50+</span>
                            <span className="text-sm mt-2 whitespace-nowrap">
                                Европейски партньори
                            </span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-light">20+</span>
                            <span className="text-sm mt-2 whitespace-nowrap">Години опит</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <span>Разгледайте</span>
                <div className="scroll-line"></div>
            </div>

            <div className="trust-bar">
                <div className="container">
                    <div className="trust-content">
                        <div className="trust-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span>ISO 9001:2015</span>
                        </div>
                        <div className="trust-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                            <span>Европейски стандарти</span>
                        </div>
                        <div className="trust-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Навременна доставка</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
