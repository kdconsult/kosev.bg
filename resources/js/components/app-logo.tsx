import AppLogoIcon from '@/components/app-logo-icon';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const appName = usePage().props.name || 'Laravel';
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-card p-1" >
                <AppLogoIcon  />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {appName}
                </span>
            </div>
        </>
    );
}
