import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { TooltipProvider } from '@/components/ui/tooltip';
import BaseLayout from '@/layouts/app/app-header-layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import ReactDOMServer from 'react-dom/server';

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

createServer((page) =>
    createInertiaApp({
        page,
        render: (element) => ReactDOMServer.renderToString(element),        
        title: (title) => (title ? `${title} - ${appName}` : appName),
        layout: resolveLayout,
        resolve: async (name) => {
            const pages = import.meta.glob<{ default: React.ComponentType }>(
                './pages/**/*.tsx',
            );
            return pages[`./pages/${name}.tsx`]().then(
                (module) => module.default,
            );
        },
        setup: ({ App, props }) => (
            <TooltipProvider delayDuration={0}>
                <App {...props} />
            </TooltipProvider>
        ),
    }),
);
