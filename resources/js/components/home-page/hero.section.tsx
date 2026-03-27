import { Link } from '@inertiajs/react';
import { ChevronRight, Clock, Globe, ShieldCheck } from 'lucide-react';

const stats = [
    { value: '500+', label: 'Завършени проекта' },
    { value: '50+', label: 'Европейски партньори' },
    { value: '20+', label: 'Години опит' },
];

const trustItems = [
    { icon: ShieldCheck, label: 'ISO 9001:2015' },
    { icon: Globe, label: 'Европейски стандарти' },
    { icon: Clock, label: 'Навременна доставка' },
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden text-white">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=2000&q=80"
                    className="w-full h-full object-cover"
                >
                    <source
                        src="https://herhovatuckrcuhmimem.supabase.co/storage/v1/object/public/blog-media/0721_web_no_audio.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f171e66] via-[#0f171e4d] to-[#0f171e80]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center min-h-screen pt-[120px] pb-[180px] lg:flex-row lg:justify-between lg:items-center">
                <div className="max-w-[680px]">
                    <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/15 px-5 py-2.5 rounded-full mb-8 border border-brand-gold/30">
                        Над 20 години опит в металообработката
                    </span>

                    <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.1] text-white mb-6 tracking-[-0.02em] text-balance">
                        Прецизност в детайла,
                        <br />
                        качество в резултата
                    </h1>

                    <p className="hidden md:block text-[1.125rem] md:text-xl leading-[1.8] text-white/75 mb-10 max-w-[520px]">
                        KOSEV LTD е вашият партньор за висококачествено лазерно
                        рязане и метални конструкции. Обслужваме водещи
                        европейски компании с прецизност и надеждност.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-4 md:h-[68px] bg-brand-gold text-white font-medium rounded-sm hover:bg-[#b89558] transition-colors"
                        >
                            Изпратете запитване
                            <ChevronRight />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center px-6 py-4 md:h-[68px] border border-brand-gold/30 text-white rounded-sm hover:bg-white/10 hover:border-white/50 transition-colors"
                        >
                            Нашите услуги
                        </Link>
                    </div>
                </div>

                <div className="mt-12 hidden md:block lg:mt-0">
                    <div className="flex items-center gap-6 md:gap-10 bg-white/10 backdrop-blur-[20px] px-8 py-8 md:px-12 md:py-10 rounded-lg border border-white/15">
                        {stats.flatMap((stat, i) => [
                            i > 0 && <div key={`d${i}`} className="w-px h-12.5 bg-white/20" />,
                            <div key={stat.value} className="flex flex-col items-center text-center">
                                <span className="text-[2rem] md:text-[2.75rem] font-medium leading-none">{stat.value}</span>
                                <span className="text-[0.8125rem] text-white/60 mt-2 whitespace-nowrap">{stat.label}</span>
                            </div>,
                        ])}
                    </div>
                </div>
            </div>

            <div className="absolute left-8 bottom-[120px] hidden lg:flex flex-col items-center gap-4 z-[2]">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 [writing-mode:vertical-rl] [text-orientation:mixed]">
                    Разгледайте
                </span>
                <div className="w-px h-[60px] bg-gradient-to-b from-white/50 to-transparent animate-scroll-pulse" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-[10px] border-t border-white/10 py-5 z-[2]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {trustItems.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2.5 text-sm text-white/70">
                                <Icon className="text-brand-gold size-5" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
