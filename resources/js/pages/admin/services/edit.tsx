import { Head, router, useForm } from '@inertiajs/react';
import ServicesController from '@/actions/App/Http/Controllers/Admin/ServicesController';
import Heading from '@/components/heading';
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
}

export default function Edit({
    service,
    coverImageUrl,
    availableProducts,
    availableTags,
}: Props) {
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
        put(ServicesController.update.url(service));
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

                <div className="flex w-full justify-between">
                    <div className="w-full max-w-2xl">
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
                    <div className="w-fit">
                        <img
                            src={coverImageUrl ?? undefined}
                            alt={data.name.bg}
                            className="rounded-md"
                        />
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
