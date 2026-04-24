import type { Auth } from '@/types/auth';
import type { Translations } from '@/types/translations';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            appUrl: string;
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
            seo: {
                home: { title: string; description: string };
                services: { title: string; description: string };
                products: { title: string; description: string };
                projects: { title: string; description: string };
                about: { title: string; description: string };
                certificates: { title: string; description: string };
                contacts: { title: string; description: string };
            };
            translations: Translations
            [key: string]: unknown;
        };
    }
}
