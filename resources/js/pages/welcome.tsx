import { usePage } from '@inertiajs/react';
import { useSyncExternalStore } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import CapabilitiesSection from '@/components/home-page/capabilities.section';
import CtaFormSection from '@/components/home-page/cta-form.section';
import HeroSection from '@/components/home-page/hero.section';
import IndustriesSection from '@/components/home-page/industries.section';
import ProductsTeaserSection from '@/components/home-page/products-teaser.section';
import QualitySection from '@/components/home-page/quality.section';
import TestimonialsSection from '@/components/home-page/testimonials.section';
import WhyChooseUsSection from '@/components/home-page/why-choose-us.section';
import { JsonLd } from '@/components/json-ld';
import { SeoHead } from '@/components/seo-head';
import type { Product, Service } from '@/types';
import type { Translations } from '@/types/translations';

const recaptchaSiteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;

export default function Welcome({
    featuredProducts,
    services,
    translations
}: {
    featuredProducts: Product[];
    services: Service[];
    translations: Translations;
}) {
    const { appUrl, seo } = usePage().props as {
        appUrl: string;
        seo: { home: { title: string; description: string } };
        translations: Translations;
    };
    const hasMounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'KOSEV',
        url: appUrl,
        description: seo.home.description,
    };

    return (
        <>
            <SeoHead title={seo.home.title} description={seo.home.description}>
                <JsonLd headKey="website-jsonld" data={websiteData} />
            </SeoHead>
            <HeroSection translations={translations.heroSection} />
            <CapabilitiesSection services={services} translations={translations.capabilitiesSection} />
            <ProductsTeaserSection featuredProducts={featuredProducts} translations={translations.productsTeaserSection} />
            <WhyChooseUsSection translations={translations.whyChooseUsSection} />
            <IndustriesSection translations={translations.industriesSection} />
            <QualitySection translations={translations.qualitySection} />
            <TestimonialsSection translations={translations.testimonialsSection} />
            {hasMounted ? (
                <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
                    <CtaFormSection />
                </GoogleReCaptchaProvider>
            ) : (
                <CtaFormSection />
            )}
        </>
    );
}
