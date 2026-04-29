import { Head, router, useForm, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import CertificatesController from '@/actions/App/Http/Controllers/Admin/CertificatesController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/certificates';
import CertificateForm from './_form';

interface Certificate {
    id: number;
    slug: string;
    name: Record<string, string>;
    description: Record<string, string>;
    active: boolean;
}

export default function CertificateEdit({
    certificate,
    imagePath,
    from,
}: {
    certificate: Certificate;
    imagePath: string;
    from?: string;
}) {
    const { locales, primaryLocale } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: Object.fromEntries(locales.map((l) => [l, certificate.name[l] ?? ''])),
        description: Object.fromEntries(locales.map((l) => [l, certificate.description[l] ?? ''])),
        active: certificate.active,
        pdf: null,
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateUrl = from
            ? `${CertificatesController.update.url(certificate.slug)}?from=${encodeURIComponent(from)}`
            : CertificatesController.update.url(certificate.slug);

        put(updateUrl);
    };

    const onDelete = () => {
        if (!confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
            return;
        }

        router.delete(CertificatesController.destroy.url(certificate.slug), {
            onSuccess: () => {
                router.visit(index());
            },
        });
    };

    const displayName = certificate.name[primaryLocale] || certificate.name[locales[0]] || certificate.slug;

    return (
        <>
            <Head title={`Edit Certificate - ${displayName}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title={`Edit Certificate - ${displayName}`}
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
                            onDelete={onDelete}
                        />
                    </div>
                    <div className="w-full max-w-xs">
                        <img src={imagePath} alt={displayName} className="rounded-md" />
                    </div>
                </div>
            </div>
        </>
    );
}
