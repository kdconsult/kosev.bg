import { Head, useForm } from '@inertiajs/react';
import ServicesController from '@/actions/App/Http/Controllers/Admin/ServicesController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/services';
import { ServiceForm } from './_form';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: { bg: '', en: '' },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(ServicesController.store.url());
    };

    return (
        <>
            <Head title="Create Service" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading title="Create Service" description="Add a new service." />

                <div className="max-w-2xl">
                    <ServiceForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleSubmit}
                        submitLabel="Create Service"
                        cancelHref={index()}
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Services', href: index() },
        { title: 'Create', href: ServicesController.create.url() },
    ],
};
