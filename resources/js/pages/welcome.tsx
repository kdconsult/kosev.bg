import CapabilitiesSection from '@/components/home-page/capabilities.section';
import CtaFormSection from '@/components/home-page/cta-form.section';
import HeroSection from '@/components/home-page/hero.section';
import IndustriesSection from '@/components/home-page/industries.section';
import ProductsTeaserSection from '@/components/home-page/products-teaser.section';
import QualitySection from '@/components/home-page/quality.section';
import TestimonialsSection from '@/components/home-page/testimonials.section';
import WhyChooseUsSection from '@/components/home-page/why-choose-us.section';
import type { Product, Service } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome({ featuredProducts, services }: { featuredProducts: Product[], services: Service[] }) {
    return (
        <>
            <Head title="Начало" />
            <HeroSection />
            <CapabilitiesSection services={services} />
            <ProductsTeaserSection featuredProducts={featuredProducts} />
            <WhyChooseUsSection />
            <IndustriesSection />
            <QualitySection />
            <TestimonialsSection />
            <CtaFormSection />
        </>
    );
}
