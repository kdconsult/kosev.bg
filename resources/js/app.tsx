import { createInertiaApp } from '@inertiajs/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import BaseLayout from '@/layouts/app/app-header-layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function resolveLayout(name: string) {
    if (name === 'dashboard' || name.startsWith('admin/')) {
        return AppLayout;
    }

    if (name.startsWith('auth/')) {
        return AuthLayout;
    }

    if (name.startsWith('settings/')) {
        return [AppLayout, SettingsLayout];
    }

    return BaseLayout;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: resolveLayout,
    strictMode: true,
    withApp(app) {
        return <TooltipProvider delayDuration={0}>{app}</TooltipProvider>;
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
