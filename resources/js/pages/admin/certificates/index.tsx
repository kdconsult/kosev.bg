import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { create, edit } from '@/routes/admin/certificates';
import { Certificate } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function CertificatesIndex({
    certificates,
}: {
    certificates: Certificate[];
}) {
    return (
        <>
            <Head title="Certificates" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Certificates" description="Manage your certificate catalogue." />
                    <Button variant='default' size='default' asChild>
                        <Link href={create()} >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Certificate
                        </Link>
                    </Button>
                </div>
        
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                {certificates.map((certificate) => (
                    <Card
                        className="relative mx-auto w-full max-w-sm pt-0"
                        key={certificate.id}
                    >
                        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                        <img
                            src={certificate.imagePath}
                            alt={certificate.name}
                            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
                        />
                        <CardHeader className="flex-1">
                            <CardAction>
                                <Badge variant="secondary">Featured</Badge>
                            </CardAction>
                            <CardTitle>{certificate.name}</CardTitle>
                            <CardDescription>
                                {certificate.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant='secondary' className="w-full" asChild>
                                <Link href={edit(certificate.slug)}>Edit</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            </div>
        </>
    );
}
