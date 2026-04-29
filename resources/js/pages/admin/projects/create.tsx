import { Head, useForm, usePage } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import ProjectsController from '@/actions/App/Http/Controllers/Admin/ProjectsController';
import Heading from '@/components/heading';
import { index } from '@/routes/admin/products';
import type { Category } from '@/types/models';
import { ProjectForm } from './_form';

interface TagSuggestion {
    slug: string;
    name: string;
}

interface Props {
    categories: Category[];
    availableTags: TagSuggestion[];
}

export default function Create({ categories, availableTags }: Props) {
    const { locales } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: Object.fromEntries(locales.map((l) => [l, ''])),
        description: Object.fromEntries(locales.map((l) => [l, ''])),
        category_id: '',
        tags: [] as string[],
        specs: [] as { label: Record<string, string>; value: Record<string, string> }[],
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
