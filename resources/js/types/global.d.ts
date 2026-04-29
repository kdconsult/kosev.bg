import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            appUrl: string;
            auth: Auth;
            currentYear: number;
            sidebarOpen: boolean;
            locale: string;
            primaryLocale: string;
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
            footer: {
                logoText: string;
                logoAlt: string;
                description: string;
                links: {
                    title: string;
                    home: string;
                    products: string;
                    services: string;
                    projects: string;
                    about: string;
                    contact: string;
                    privacyPolicy: string;
                    termsOfService: string;
                };
                services: {
                    title: string;
                    laserCutting: string;
                    metalBending: string;
                    welding: string;
                    assembly: string;
                    cncMachining: string;
                };
                contact: {
                    title: string;
                    address: string;
                    street: string;
                    phone: string;
                    email: string;
                };
                copyright: string;
            };
            [key: string]: unknown;
        };
    }
}
