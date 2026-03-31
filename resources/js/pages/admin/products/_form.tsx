import { useState } from 'react';
import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { SpecFields, type SpecData } from '@/components/spec-fields';
import { TagInput } from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/models';

interface ProductFormData {
    title: { bg: string; en: string };
    description: { bg: string; en: string };
    category_slug: string;
    tags: string[];
    services: string[];
    specs: SpecData[];
}

interface ProductFormErrors {
    'title.bg'?: string;
    'title.en'?: string;
    'description.bg'?: string;
    'description.en'?: string;
    category_slug?: string;
    tags?: string;
    [key: string]: string | undefined;
}

interface TagSuggestion {
    slug: string;
    name: string;
}

interface ProductFormProps {
    data: ProductFormData;
    setData: (key: string, value: unknown) => void;
    errors: ProductFormErrors;
    processing: boolean;
    categories: Category[];
    availableTags: TagSuggestion[];
    availableServces: TagSuggestion[];
    slug?: string;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    cancelHref: NonNullable<InertiaLinkProps['href']>;
}

const LOCALES = [
    { key: 'bg', label: 'БГ' },
    { key: 'en', label: 'EN' },
] as const;

type Locale = (typeof LOCALES)[number]['key'];

export function ProductForm({
    data,
    setData,
    errors,
    processing,
    categories,
    availableTags,
    availableServces,
    slug,
    onSubmit,
    submitLabel,
    cancelHref,
}: ProductFormProps) {
    const [activeLocale, setActiveLocale] = useState<Locale>('bg');

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-6"
            encType="multipart/form-data"
        >
            {slug && (
                <div className="grid gap-2">
                    <Label>Slug</Label>
                    <Input
                        value={slug}
                        readOnly
                        className="cursor-default bg-muted text-muted-foreground"
                    />
                </div>
            )}

            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label>
                        Title <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex rounded-md border">
                        {LOCALES.map((locale) => (
                            <button
                                key={locale.key}
                                type="button"
                                onClick={() => setActiveLocale(locale.key)}
                                className={cn(
                                    'px-3 py-1 text-xs font-medium transition-colors first:rounded-l-md last:rounded-r-md',
                                    activeLocale === locale.key
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                {locale.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeLocale === 'bg' && (
                    <>
                        <Input
                            value={data.title.bg}
                            onChange={(e) =>
                                setData('title', {
                                    ...data.title,
                                    bg: e.target.value,
                                })
                            }
                            placeholder="Заглавие (БГ)"
                        />
                        <InputError message={errors['title.bg']} />
                    </>
                )}
                {activeLocale === 'en' && (
                    <>
                        <Input
                            value={data.title.en}
                            onChange={(e) =>
                                setData('title', {
                                    ...data.title,
                                    en: e.target.value,
                                })
                            }
                            placeholder="Title (EN)"
                        />
                        <InputError message={errors['title.en']} />
                    </>
                )}
            </div>

            <div className="grid gap-2">
                <Label>
                    Description <span className="text-destructive">*</span>
                </Label>
                {activeLocale === 'bg' && (
                    <>
                        <textarea
                            value={data.description.bg}
                            onChange={(e) =>
                                setData('description', {
                                    ...data.description,
                                    bg: e.target.value,
                                })
                            }
                            placeholder="Описание (БГ)"
                            rows={5}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                        <InputError message={errors['description.bg']} />
                    </>
                )}
                {activeLocale === 'en' && (
                    <>
                        <textarea
                            value={data.description.en}
                            onChange={(e) =>
                                setData('description', {
                                    ...data.description,
                                    en: e.target.value,
                                })
                            }
                            placeholder="Description (EN)"
                            rows={5}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                        <InputError message={errors['description.en']} />
                    </>
                )}
            </div>

            <div className="grid gap-2">
                <Label>Specifications</Label>
                <SpecFields
                    specs={data.specs}
                    onChange={(specs) => setData('specs', specs)}
                    activeLocale={activeLocale}
                    errors={errors}
                />
            </div>

            <div className="grid gap-2">
                <Label>
                    Category <span className="text-destructive">*</span>
                </Label>
                <Select
                    value={data.category_slug}
                    onValueChange={(val) => setData('category_slug', val)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.category_slug} />
            </div>

            <div className="grid gap-2">
                <Label>Tags</Label>
                <TagInput
                    value={data.tags}
                    onChange={(tags) => setData('tags', tags)}
                    suggestions={availableTags}
                    placeholder="Add tags..."
                />
                <InputError message={errors.tags} />
            </div>

            <div className="grid gap-2">
                <Label>Services</Label>
                <TagInput
                    value={data.services}
                    onChange={(services) => setData('services', services)}
                    suggestions={availableServces}
                    placeholder="Add services..."
                />
                <InputError message={errors.services} />
            </div>            

            <div className="grid gap-2">
                <Field>
                    <FieldLabel htmlFor="coverImage">Cover Image</FieldLabel>
                    <Input onChange={(e) => {
                        const file = e.target.files?.[0];
                        setData('coverImage', file || null);
                    }} type="file" />
                    <FieldDescription>
                        Select a cover_image to upload.
                    </FieldDescription>
                    <InputError message={errors.coverImage} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="images">Images</FieldLabel>
                    <Input onChange={(e) => {
                        const file = e.target.files;
                        setData('images', file || null);
                    }} type="file" multiple />
                    <FieldDescription>
                        Select images to upload.
                    </FieldDescription>
                    <InputError message={errors.images} />
                </Field>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : submitLabel}
                </Button>
                <Button variant="outline" asChild>
                    <Link href={cancelHref}>Cancel</Link>
                </Button>
            </div>
        </form>
    );
}
