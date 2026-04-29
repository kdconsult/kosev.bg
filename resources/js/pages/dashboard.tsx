import { Head, Link } from '@inertiajs/react';
import { Award, Briefcase, FolderOpen, Package } from 'lucide-react';
import {  useEffect, useState } from 'react';
import type {ComponentProps} from 'react';
import { dashboard } from '@/routes';
import { index as adminCertificates } from '@/routes/admin/certificates';
import { index as adminProducts } from '@/routes/admin/products';
import { index as adminProjects } from '@/routes/admin/projects';
import { index as adminServices } from '@/routes/admin/services';

interface RecentItem {
    slug: string;
    title: string | null;
    category: string | null;
    cover_url: string | null;
}

interface Props {
    stats: {
        products: number;
        projects: number;
        services: number;
        certificates: number;
    };
    recentProducts: RecentItem[];
    recentProjects: RecentItem[];
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const duration = 1000;
            const startTime = Date.now();
            const tick = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(Math.round(eased * value));

                if (progress < 1) {
requestAnimationFrame(tick);
}
            };
            requestAnimationFrame(tick);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return <>{display}</>;
}

function timeGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
return 'Good morning';
}

    if (hour < 17) {
return 'Good afternoon';
}

    return 'Good evening';
}

function formattedDate(): string {
    return new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

const statCards = [
    { label: 'Total Products', key: 'products' as const, icon: Package, href: () => adminProducts() },
    { label: 'Total Projects', key: 'projects' as const, icon: FolderOpen, href: () => adminProjects() },
    { label: 'Active Services', key: 'services' as const, icon: Briefcase, href: () => adminServices() },
    { label: 'Active Certificates', key: 'certificates' as const, icon: Award, href: () => adminCertificates() },
];

export default function Dashboard({ stats, recentProducts, recentProjects }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-10 overflow-x-auto px-6 py-8">

                {/* ── Page header ── */}
                <header
                    className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationFillMode: 'both' }}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                                Overview
                            </p>
                            <h1 className="font-serif text-[2.5rem] font-normal leading-tight tracking-tight">
                                Dashboard
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{timeGreeting()}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{formattedDate()}</p>
                        </div>
                    </div>
                    {/* Gold gradient rule */}
                    <div className="mt-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-linear-to-r from-accent/80 via-accent/30 to-transparent" />
                        <div className="size-1 rounded-full bg-accent/50" />
                    </div>
                </header>

                {/* ── Stat cards ── */}
                <section>
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                        At a glance
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {statCards.map(({ label, key, icon: Icon, href }, index) => (
                            <Link
                                key={key}
                                href={href()}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:ring-accent/30"
                                style={{
                                    animationDelay: `${120 + index * 70}ms`,
                                    animationFillMode: 'both',
                                }}
                            >
                                {/* Top gold reveal bar */}
                                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Faded large background number */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute -right-3 -bottom-4 font-serif text-[7rem] font-normal leading-none text-foreground/4 select-none"
                                >
                                    {stats[key]}
                                </span>

                                <div className="relative flex flex-col gap-5 p-6">
                                    {/* Icon + label row */}
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20">
                                            <Icon className="size-4" />
                                        </div>
                                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                                            {label}
                                        </span>
                                    </div>

                                    {/* Big number */}
                                    <p className="font-serif text-6xl font-normal leading-none tabular-nums text-foreground">
                                        <AnimatedNumber value={stats[key]} delay={250 + index * 70} />
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className="h-px bg-linear-to-r from-accent/40 to-transparent" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ── Recent content ── */}
                <section className="grid gap-6 lg:grid-cols-2">
                    <RecentList
                        title="Recent Products"
                        count={recentProducts.length}
                        items={recentProducts}
                        viewAllHref={adminProducts()}
                        animationDelay={480}
                    />
                    <RecentList
                        title="Recent Projects"
                        count={recentProjects.length}
                        items={recentProjects}
                        viewAllHref={adminProjects()}
                        animationDelay={560}
                    />
                </section>
            </div>
        </>
    );
}

function ItemThumbnail({ url, title }: { url: string | null; title: string | null }) {
    if (url) {
        return (
            <img
                src={url}
                alt={title ?? ''}
                className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-border"
            />
        );
    }

    const initials = (title ?? '?')
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div className="size-10 shrink-0 rounded-lg bg-accent/10 ring-1 ring-accent/20 flex items-center justify-center">
            <span className="font-serif text-xs font-medium text-accent">{initials}</span>
        </div>
    );
}

function RecentList({
    title,
    count,
    items,
    viewAllHref,
    animationDelay = 0,
}: {
    title: string;
    count: number;
    items: RecentItem[];
    viewAllHref: ComponentProps<typeof Link>['href'];
    animationDelay?: number;
}) {
    return (
        <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
            style={{ animationDelay: `${animationDelay}ms`, animationFillMode: 'both' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2.5">
                    <h2 className="font-serif text-lg font-medium">{title}</h2>
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent/10 text-[10px] font-semibold text-accent">
                        {count}
                    </span>
                </div>
                <Link
                    href={viewAllHref}
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors hover:text-accent"
                >
                    View all →
                </Link>
            </div>

            {/* Items */}
            {items.length === 0 ? (
                <div className="flex flex-1 items-center justify-center px-6 py-12">
                    <p className="text-sm italic text-muted-foreground/60">No items yet.</p>
                </div>
            ) : (
                <ul className="flex flex-col divide-y divide-border/50">
                    {items.map((item, index) => (
                        <li
                            key={item.slug}
                            className="flex items-center gap-3.5 px-6 py-3.5 transition-colors hover:bg-muted/30"
                        >
                            {/* Row number */}
                            <span className="w-5 shrink-0 font-serif text-[11px] tabular-nums text-accent/50">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Thumbnail */}
                            <ItemThumbnail url={item.cover_url} title={item.title} />

                            {/* Title */}
                            <span className="flex-1 truncate text-sm font-medium leading-snug">
                                {item.title ?? item.slug}
                            </span>

                            {/* Category */}
                            {item.category && (
                                <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                                    {item.category}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Footer rule */}
            <div className="mt-auto h-px bg-linear-to-r from-accent/30 to-transparent" />
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
