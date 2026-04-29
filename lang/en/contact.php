<?php

return [
    'heroSection' => [
        'title' => 'Get in Touch with Kosev EOOD',
        'badge' => 'Contact',
        'description' => 'Do you have questions or want to discuss a potential partnership? Get in touch with us and our team will be happy to assist you.',
        'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
    ],
    'contactInfoSection' => [
        'title' => 'Contact Information',
        'badge' => null,
        'description' => 'Get in touch with us by phone, email, or visit our production facility.',
        'contactMethods' => [
            'phone' => [
                'label' => 'Phone',
                'value' => '+359 895 573 233',
                'icon' => 'phone',
            ],
            'email' => [
                'label' => 'Email',
                'value' => 'marketing@kosev.bg',
                'icon' => 'mail',
            ],
            'address' => [
                'label' => 'Address',
                'value' => 'Traction Street #2, 7003 Ruse, Bulgaria',
                'icon' => 'pin',
            ],
            'workingHours' => [
                'label' => 'Working Hours',
                'value' => 'Monday - Friday: 8:00 AM - 5:00 PM',
                'icon' => 'clock',
            ],
        ],
    ],
    'form' => [
        'title' => 'Get in Touch',
        'description' => 'If you have any questions, need a consultation, or want to discuss your project, do not hesitate to contact us. Our team is ready to assist you and provide the necessary information.',
        'name' => 'Name',
        'company' => 'Company',
        'email' => 'Email',
        'phone' => 'Phone',
        'message' => 'Message',
        'submitting' => 'Submitting...',
        'submitButton' => 'Submit',
        'successMessage' => 'Your message has been successfully sent! We will get back to you as soon as possible.',
    ],
    'faqSection' => [
        'title' => 'Have Questions?',
        'badge' => 'Frequently Asked Questions',
        'description' => 'Find answers to the most frequently asked questions about our services, processes, and partnerships.',
        'faqs' => [
            [
                'question' => 'What are the lead times?',
                'answer' => 'Lead times depend on the complexity and volume of the order. Standard orders are usually completed within 2-4 weeks. For urgent orders, we can offer expedited processing.',
            ],
            [
                'question' => 'Do you have a minimum order?',
                'answer' => 'No, we do not have strict requirements for a minimum order. We work with both single parts and series production.',
            ],
            [
                'question' => 'What materials do you process?',
                'answer' => 'We process all types of steel (black, stainless, galvanized), aluminum, copper, and brass with various thicknesses and sizes.',
            ],
            [
                'question' => 'Do you offer delivery?',
                'answer' => 'Yes, we have our own transport and work with established logistics companies for deliveries throughout Europe.',
            ],
            [
                'question' => 'How can I get a quote?',
                'answer' => 'Send us your technical documentation (drawings, 3D models) and quantities via the contact form or our email. You will receive a quote within 24 hours.',
            ],
            [
                'question' => 'Do you accept 3D files?',
                'answer' => 'Yes, we accept all standard CAD formats: STEP, IGES, DXF, DWG, PDF, as well as SolidWorks and AutoCAD files.',
            ],
        ],
    ],
];
