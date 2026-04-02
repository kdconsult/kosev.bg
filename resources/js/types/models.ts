export interface Category {
    slug: string;
    name: string;
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

export interface Service {
    slug: string;
    name: string;
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
}

export interface Service {
    id: number;
    slug: string;
    name: string;
    description: string;
    cover_image: Image | null;
    products: Product[];
    tags: Tag[];
    specs: Spec[];
    is_active: boolean;
}
