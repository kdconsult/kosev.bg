import Heading from '@/components/heading';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import CertificateForm from './_form';
import { SubmitEvent } from 'react';
import CertificatesController from '@/actions/App/Http/Controllers/Admin/CertificatesController';
import { index } from '@/routes/admin/certificates';

interface Certificate {
    id: number;
    slug: string;
    name: { bg: string; en: string };
    description: { bg: string; en: string };
    active: boolean;
}

export default function CertificateEdit({
    certificate,
    locales,
    imagePath,
}: {
    certificate: Certificate;
    locales: string[];
    imagePath: string;
}) {
    const { locale } = usePage().props as { locale: 'bg' | 'en' };
    const { data, setData, put, processing, errors } = useForm({
        name: { bg: certificate.name.bg, en: certificate.name.en },
        description: {
            bg: certificate.description.bg,
            en: certificate.description.en,
        },
        active: certificate.active,
        pdf: null,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(CertificatesController.update.url(certificate.slug), {
            onSuccess: () => {
                console.log('Certificate updated successfully');
            },
            onError: (errors) => {
                console.error('Error updating certificate:', errors);
            },
        });
    };

    const onDelete = () => {
        console.log('deleting');

        if (
            !confirm(
                'Are you sure you want to delete this certificate? This action cannot be undone.',
            )
        ) {
            return;
        }

        router.delete(CertificatesController.destroy.url(certificate.slug), {
            onSuccess: () => {
                console.log('Certificate deleted successfully');
                router.visit(index());
            },
            onError: (errors) => {
                console.error('Error deleting certificate:', errors);
            },
        });
    };

    return (
        <>
            <Head title={`Edit Certificate - ${certificate.name[locale]}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title={`Edit Certificate - ${certificate.name[locale]}`}
                    description="Update the details of your certificate"
                />

                <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
                    <div className="flex w-full max-w-2xl flex-col gap-4">
                        <CertificateForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={handleSubmit}
                            submitLabel="Update Certificate"
                            cancelHref={index()}
                            locales={locales}
                            onDelete={onDelete}
                        />
                    </div>
                    <div className="w-full max-w-xs">
                        <img
                            src={imagePath}
                            alt={certificate.name.bg}
                            className="rounded-md"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
