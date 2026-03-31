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

interface Props {
    categories: Category[];
    availableTags: TagSuggestion[];
    availableServces: TagSuggestion[];
}

export default function Create({ categories, availableTags, availableServces }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: { bg: '', en: '' },
        description: { bg: '', en: '' },
        category_slug: '',
        tags: [] as string[],
        services: [] as string[],
        specs: [] as { label: { bg: string; en: string }; value: { bg: string; en: string } }[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ProductsController.store.url());
    };

    return (
        <>
            <Head title="Create Product" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading title="Create Product" description="Add a new product to the catalogue." />

                <div className="max-w-2xl">
                    <ProductForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        categories={categories}
                        availableTags={availableTags}
                        availableServces={availableServces}
                        onSubmit={handleSubmit}
                        submitLabel="Create Product"
                        cancelHref={index()}
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Products', href: index() },
        { title: 'Create', href: ProductsController.create.url() },
    ],
};
