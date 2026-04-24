export interface Category {
    slug: string;
    name: string;
    id: number;
}

export interface Image {
    id: number;
    thumbUrl: string;
    originalUrl: string;
    alt?: string | null;
}

export interface Tag {
    slug: string;
    name: string;
}

export interface Spec {
    label: string;
    value: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    industry: string;
    category: Category;
    cover_image: Image | null;
    images: Image[];
    tags: Tag[];
    specs: Spec[];
}

export interface Product {
    slug: string;
    title: string;
    description: string;
    short_description: string | null;
    category: Category;
    cover_image: Image | null;
    images: Image[];
    tags: Tag[];
    specs: Spec[];
    services: Service[];
}

export interface Certificate {
    id: number;
    slug: string;
    name: string;
    description: string;
    imagePath: string;
    pdfPath: string;
    active: boolean;
}

export interface Service {
    id: number;
    slug: string;
    name: string;
    description: string;
    short_description: string | null;
    cover_image: Image | null;
    images: Image[];
    products: Product[];
    tags: Tag[];
    specs: Spec[];
    is_active: boolean;
}
