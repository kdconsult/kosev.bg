import { Head, useForm, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import ProjectsController from '@/actions/App/Http/Controllers/Admin/ProjectsController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { deleteMedia } from '@/routes/admin';
import { index } from '@/routes/admin/products';
import type { Category } from '@/types/models';
import { ProjectForm } from './_form';

interface TagSuggestion {
    slug: string;
    name: string;
}

interface AdminProject {
    slug: string;
    title: { bg: string; en: string };
    description: { bg: string; en: string };
    category_id: number | null;
    tags: TagSuggestion[];
    services: TagSuggestion[];
    specs: {
        label: { bg: string; en: string };
        value: { bg: string; en: string };
    }[];
}

interface Props {
    project: AdminProject;
    categories: Category[];
    coverImageUrl?: string;
    coverImageAlt?: string;
    images: {
        thumbUrl: string;
        alt: string;
        id: number;
    }[];
    availableTags: TagSuggestion[];
}

export default function Edit({
    project,
    categories,
    coverImageUrl,
    coverImageAlt,
    images,
    availableTags,
}: Props) {
    const { post } = useHttp();

    const [imagesState, setImages] = useState(images);

    const { data, setData, put, processing, errors } = useForm({
        title: { bg: project.title.bg ?? '', en: project.title.en ?? '' },
        description: {
            bg: project.description.bg ?? '',
            en: project.description.en ?? '',
        },
        category_id: project.category_id ?? '',
        tags: project.tags.map((t) => t.name),
        specs: (project.specs ?? []).map((s) => ({
            label: { bg: s.label.bg ?? '', en: s.label.en ?? '' },
            value: { bg: s.value.bg ?? '', en: s.value.en ?? '' },
        })),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(ProjectsController.update.url(project.slug));
    };

    const removeImage = (index: number) => {
        if (!confirm('Are you sure you want to remove this image?')) {
            return;
        }

        const media = images[index];
        post(deleteMedia.url({ query: { media_id: media.id } }), {
            onSuccess: () => {
                setImages(images.filter((im) => im.id !== media.id));
            },
        });
    };

    return (
        <>
            <Head title={`Edit: ${project.title.bg || project.slug}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading
                    title="Edit Project"
                    description={`Editing: ${project.title.bg || project.slug}`}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="max-w-2xl">
                        <ProjectForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            categories={categories}
                            availableTags={availableTags}
                            slug={project.slug}
                            onSubmit={handleSubmit}
                            submitLabel="Save Changes"
                            cancelHref={index()}
                        />
                    </div>
                    <div className="grid gap-4">
                        <h2 className="mb-2 text-lg font-semibold">
                            Cover Image
                        </h2>
                        <img
                            src={
                                coverImageUrl || 'https://placehold.co/800x600'
                            }
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
                                                src={image.thumbUrl}
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
        { title: 'Projects', href: index() },
        { title: 'Edit', href: '#' },
    ],
};
