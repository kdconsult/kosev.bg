import { Head, router, useForm, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import ServicesController from '@/actions/App/Http/Controllers/Admin/ServicesController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { deleteMedia } from '@/routes/admin';
import { index } from '@/routes/admin/services';
import { ServiceForm } from './_form';

interface AdminService {
    slug: string;
    name: { bg: string; en: string };
    description: { bg: string; en: string };
    is_active: boolean;
    cover_image: string | null;
    products: {
        slug: string;
        title: { bg: string; en: string };
    }[];
    tags: {
        slug: string;
        name: string;
    }[];
    specs: {
        label: { bg: string; en: string };
        value: { bg: string; en: string };
    }[];
}

interface Props {
    service: AdminService;
    availableProducts: { slug: string; name: string }[];
    availableTags: { slug: string; name: string }[];
    coverImageUrl: string | null;
    images: { url: string; alt: string; id: number }[];
    from?: string;
}

export default function Edit({
    service,
    coverImageUrl,
    images,
    availableProducts,
    availableTags,
    from,
}: Props) {
    const { post } = useHttp();
    const [imagesState, setImagesState] = useState(images);

    const { data, setData, put, processing, errors } = useForm({
        name: { bg: service.name.bg ?? '', en: service.name.en ?? '' },
        description: {
            bg: service.description.bg ?? '',
            en: service.description.en ?? '',
        },
        is_active: service.is_active,
        products: service.products.map(p => p.title.bg),
        tags: service.tags.map(t => t.name),
        specs: service.specs ?? [],
    });    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updateUrl = from
            ? `${ServicesController.update.url(service)}?from=${encodeURIComponent(from)}`
            : ServicesController.update.url(service);
        put(updateUrl);
    };

    const removeImage = (index: number) => {
        if (!confirm('Are you sure you want to remove this image?')) {
            return;
        }

        const media = imagesState[index];
        post(deleteMedia.url({ query: { media_id: media.id } }), {
            onSuccess: () => {
                setImagesState(imagesState.filter((im) => im.id !== media.id));
            },
        });
    };

    const onDelete = () => {
        if (
            !confirm(
                'Are you sure you want to delete this service? This action cannot be undone.',
            )
        ) {
            return;
        }

        router.delete(ServicesController.destroy.url(service.slug), {
            onSuccess: () => {
                console.log('Service deleted successfully');
                router.visit(index());
            },
            onError: (errors) => {
                console.error('Error deleting service:', errors);
            },
        });
    };

    return (
        <>
            <Head title={`Edit: ${service.name.bg || service.slug}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Edit Service"
                    description={`Editing: ${service.name.bg || service.slug}`}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="max-w-2xl">
                        <ServiceForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            onDelete={onDelete}
                            submitLabel="Save Changes"
                            cancelHref={index()}
                            availableProducts={availableProducts}
                            availableTags={availableTags}
                        />
                    </div>
                    <div className="grid gap-4">
                        <h2 className="mb-2 text-lg font-semibold">Cover Image</h2>
                        <img
                            src={coverImageUrl ?? undefined}
                            alt={data.name.bg}
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
                                                alt={image.alt || `Image ${index + 1}`}
                                                className="relative z-20 aspect-video w-full object-cover"
                                            />
                                            <CardFooter>
                                                <Button
                                                    className="w-full"
                                                    variant="destructive"
                                                    onClick={() => removeImage(index)}
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
        { title: 'Services', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
