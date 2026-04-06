import { createInertiaApp } from '@inertiajs/react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import BaseLayout from '@/layouts/app/app-header-layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type InertiaAppProps = {
    children?: {
        props?: {
            initialPage?: {
                props?: {
                    recaptchaSiteKey?: string | null;
                };
            };
        };
    };
};

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

function getRecaptchaSiteKey(props: unknown): string | undefined {
    const appProps = props as InertiaAppProps;

    return appProps.children?.props?.initialPage?.props?.recaptchaSiteKey ?? undefined;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: resolveLayout,
    strictMode: true,
    withApp(app) {
        const wrappedApp = <TooltipProvider delayDuration={0}>{app}</TooltipProvider>;
        const recaptchaSiteKey = getRecaptchaSiteKey(app.props);

        if (!recaptchaSiteKey) {
            return wrappedApp;
        }

        return (
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
                {wrappedApp}
            </GoogleReCaptchaProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
