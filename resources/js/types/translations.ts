export type ContactForm = {
    title: string;
    description: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submitting: string;
    submitButton: string;
};

export type Translations = {
    heroSection: {
        video: {
            poster: string;
            sources: {
                src: string;
                type: string;
            }[];
        };
        badge: string;
        title: string;
        description: string;
        ctaButton: string;
        ourServicesButton: string;
        stats: {
            number: string;
            label: string;
        }[];
        scrollIndicator: string;
        trustBar: {
            title: string;
            icon: string;
        }[];
    };
    capabilitiesSection: {
        badge: string;
        title: string;
        description: string;
        learnMore: string;
        viewAllServices: string;
    };
    productsTeaserSection: {
        badge: string;
        title: string;
        description: string;
        seeDetails: string;
        viewAllProducts: string;
    };
    whyChooseUsSection: {
        badge: string;
        title: string;
        description: string;
        advantages: {
            stat: string;
            title: string;
            description: string;
        }[];
        featuredImage: {
            src: string;
            alt: string;
            info: {
                number: string;
                label: string;
            };
        };
    };
    industriesSection: {
        badge: string;
        title: string;
        description: string;
        industries: {
            name: string;
            description: string;
            image: string;
        }[];
    };          
    qualitySection: {
        badge: string;
        title: string;
        description: string;
        images: {
            src: string;
            alt: string;
        }[];
        certifications: {
            name: string;
            description: string;
            icon: string;
        }[];
        techFeaturesSection: {
            title: string;
            features: string[];
            ctaButton: string;
        };
    };          
    testimonialsSection: {
        badge: string;
        title: string;
        description: string;
        testimonials: {
            name: string;
            role: string;
            company: string;
            quote: string;
        }[];
    };
    ctaFormSection: {
        badge: string;
        title: string;
        description: string;
        phone: {
            label: string;
            value: string;
        };
        email: {
            label: string;
            value: string;
        };
        form: ContactForm;
    };
};