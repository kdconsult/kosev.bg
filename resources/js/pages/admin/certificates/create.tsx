import { Head, useForm, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import CertificatesController from '@/actions/App/Http/Controllers/Admin/CertificatesController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/certificates';
import CertificateForm from './_form';

export default function CertificatesCreate() {
    const { locales } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: Object.fromEntries(locales.map((l) => [l, ''])),
        description: Object.fromEntries(locales.map((l) => [l, ''])),
        active: true,
        pdf: null as File | null,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(CertificatesController.store.url());
    };

    return (
        <>
            <Head title="Create Certificate" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Create Certificate"
                    description="Fill in the details to create a new certificate"
                />

                <div className="max-w-2xl">
                    <CertificateForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={handleSubmit}
                        submitLabel="Create Certificate"
                        cancelHref={index()}
                    />
                </div>
            </div>
        </>
    );
}
