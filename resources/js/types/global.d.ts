import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            currentYear: number;
            sidebarOpen: boolean;
            locale: string;
            locales: string[];
            nav: {
                home: string;
                services: string;
                projects: string;
                products: string;
                about: string;
                certificates: string;
                contact_cta: string;
            };
            [key: string]: unknown;
        };
    }
}
