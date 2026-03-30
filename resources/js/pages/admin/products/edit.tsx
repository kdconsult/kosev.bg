import { Head, useForm } from '@inertiajs/react';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/products';
import type { Category } from '@/types/models';
import { ProductForm } from './_form';

interface TagSuggestion {
    slug: string;
    name: string;
}

interface AdminProduct {
    slug: string;
    title: { bg: string; en: string };
    description: { bg: string; en: string };
    category_slug: string | null;
    tags: TagSuggestion[];
}

interface Props {
    product: AdminProduct;
    categories: Category[];
    availableTags: TagSuggestion[];
}

export default function Edit({ product, categories, availableTags }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: { bg: product.title.bg ?? '', en: product.title.en ?? '' },
        description: { bg: product.description.bg ?? '', en: product.description.en ?? '' },
        category_slug: product.category_slug ?? '',
        tags: product.tags.map((t) => t.name),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(ProductsController.update.url(product));
    };

    return (
        <>
            <Head title={`Edit: ${product.title.bg || product.slug}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Edit Product"
                    description={`Editing: ${product.title.bg || product.slug}`}
                />

                <div className="max-w-2xl">
                    <ProductForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        categories={categories}
                        availableTags={availableTags}
                        slug={product.slug}
                        onSubmit={handleSubmit}
                        submitLabel="Save Changes"
                        cancelHref={index()}
                    />
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Products', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
