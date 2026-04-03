import { Head, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import CertificatesController from '@/actions/App/Http/Controllers/Admin/CertificatesController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/certificates';
import CertificateForm from './_form';

export default function CertificatesIndex({ locales }: { locales: string[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: { bg: '', en: '' },
        description: { bg: '', en: '' },
        active: true,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('creating', data);
        
        post(CertificatesController.store.url(), {
            onSuccess: () => {
                console.log('Certificate created successfully');
            },
            onError: (errors) => {
                console.error('Error creating certificate:', errors);
            },
        });
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
                        locales={locales}
                    />
                </div>
            </div>
        </>
    );
}
