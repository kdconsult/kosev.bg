import { Head, useForm, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import ProductsController from '@/actions/App/Http/Controllers/Admin/ProductsController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { deleteMedia } from '@/routes/admin';
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
    services: TagSuggestion[];
    specs: { label: { bg: string; en: string }; value: { bg: string; en: string } }[];
}

interface Props {
    product: AdminProduct;
    categories: Category[];
    coverImageUrl?: string;
    coverImageAlt?: string;
    images: { url: string; alt: string, id: number }[];
    availableTags: TagSuggestion[];
    availableServces: TagSuggestion[];
    from?: string;
}

export default function Edit({
    product,
    categories,
    coverImageUrl,
    coverImageAlt,
    images,
    availableTags,
    availableServces,
    from,
}: Props) {
    const {post}= useHttp();

    const [imagesState, setImages] = useState(images);

    const { data, setData, put, processing, errors } = useForm({
        title: { bg: product.title.bg ?? '', en: product.title.en ?? '' },
        description: {
            bg: product.description.bg ?? '',
            en: product.description.en ?? '',
        },
        category_slug: product.category_slug ?? '',
        tags: product.tags.map((t) => t.name),
        services: product.services.map((s) => s.name),
        specs: (product.specs ?? []).map((s) => ({
            label: { bg: s.label.bg ?? '', en: s.label.en ?? '' },
            value: { bg: s.value.bg ?? '', en: s.value.en ?? '' },
        })),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updateUrl = from
            ? `${ProductsController.update.url(product)}?from=${encodeURIComponent(from)}`
            : ProductsController.update.url(product);
        put(updateUrl);
    };

    const removeImage = (index: number) => {
        if (!confirm('Are you sure you want to remove this image?')) {
            return;
        }

        const media = images[index];
        post(deleteMedia.url({ "query": { media_id: media.id } }), {
            onSuccess: () => {
                setImages(images.filter((im) => im.id !== media.id));
            },
        });
    }

    return (
        <>
            <Head title={`Edit: ${product.title.bg || product.slug}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Edit Product"
                    description={`Editing: ${product.title.bg || product.slug}`}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="max-w-2xl">
                        <ProductForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            categories={categories}
                            availableTags={availableTags}
                            availableServces={availableServces}
                            slug={product.slug}
                            onSubmit={handleSubmit}
                            submitLabel="Save Changes"
                            cancelHref={index()}
                        />
                    </div>
                    <div className="grid gap-4">
                        <h2 className="mb-2 text-lg font-semibold">Cover Image</h2>                        
                        <img
                            src={coverImageUrl || 'https://placehold.co/800x600'}
                            alt={coverImageAlt || 'Cover Image'}
                            className="h-auto max-w-full rounded-xl"
                        />

                        {imagesState.length > 0 && (
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Additional Images
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {imagesState.map((image, index) => (
                                        <Card
                                            className="relative w-full max-w-42 pt-0"
                                            size="sm"
                                            key={image.id}
                                        >
                                            <img
                                                src={image.url}
                                                alt={
                                                    image.alt ||
                                                    `Image ${index + 1}`
                                                }
                                                className="relative z-20 aspect-video w-full object-cover"
                                            />
                                            <CardFooter>
                                                <Button
                                                    className="w-full"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                >
                                                    Remove Image
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
