import { Head, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/products';
import type { Category } from '@/types/models';
import { ProjectForm } from './_form';
import ProjectsController from '@/actions/App/Http/Controllers/Admin/ProjectsController';
import { SubmitEvent } from 'react';

interface TagSuggestion {
    slug: string;
    name: string;
}

interface Props {
    categories: Category[];
    availableTags: TagSuggestion[];
}

export default function Create({ categories, availableTags }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: { bg: '', en: '' },
        description: { bg: '', en: '' },
        category_id: '',
        tags: [] as string[],
        services: [] as string[],
        specs: [] as { label: { bg: string; en: string }; value: { bg: string; en: string } }[],
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(ProjectsController.store.url());
    };

    return (
        <>
            <Head title="Create Project" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <Heading title="Create Project" description="Add a new project to the catalogue." />

                <div className="max-w-2xl">
                    <ProjectForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        categories={categories}
                        availableTags={availableTags}
                        onSubmit={handleSubmit}
                        submitLabel="Create Project"
                        cancelHref={index()}
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Projects', href: index() },
        { title: 'Create', href: ProjectsController.create.url() },
    ],
};
