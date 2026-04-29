import { Link, usePage } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { SpecFields } from '@/components/spec-fields';
import type { SpecData } from '@/components/spec-fields';
import { TagInput } from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    title: Record<string, string>;
    description: Record<string, string>;
    category_slug: string;
    tags: string[];
    services: string[];
    specs: SpecData[];
}

interface ProductFormErrors {
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
    const { locales, primaryLocale } = usePage().props;
    const [activeLocale, setActiveLocale] = useState(primaryLocale);

    return (
        <form onSubmit={onSubmit} className="space-y-6" encType="multipart/form-data">
            {slug && (
                <div className="grid gap-2">
                    <Label>Slug</Label>
                    <Input value={slug} readOnly className="cursor-default bg-muted text-muted-foreground" />
                </div>
            )}

            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label>
                        Title <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex rounded-md border">
                        {locales.map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => setActiveLocale(locale)}
                                className={cn(
                                    'px-3 py-1 text-xs font-medium transition-colors first:rounded-l-md last:rounded-r-md',
                                    activeLocale === locale
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                {locale.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <Input
                    value={data.title[activeLocale] ?? ''}
                    onChange={(e) => setData('title', { ...data.title, [activeLocale]: e.target.value })}
                />
                <InputError message={errors[`title.${activeLocale}`]} />
            </div>

            <div className="grid gap-2">
                <Label>
                    Description{' '}
                    {activeLocale === primaryLocale && <span className="text-destructive">*</span>}
                </Label>
                <textarea
                    value={data.description[activeLocale] ?? ''}
                    onChange={(e) => setData('description', { ...data.description, [activeLocale]: e.target.value })}
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                />
                <InputError message={errors[`description.${activeLocale}`]} />
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
                <Select value={data.category_slug} onValueChange={(val) => setData('category_slug', val)}>
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
                    <Input
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setData('coverImage', file || null);
                        }}
                        type="file"
                    />
                    <FieldDescription>Select a cover image to upload.</FieldDescription>
                    <InputError message={errors.coverImage} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="images">Images</FieldLabel>
                    <Input
                        onChange={(e) => {
                            const file = e.target.files;
                            setData('images', file || null);
                        }}
                        type="file"
                        multiple
                    />
                    <FieldDescription>Select images to upload.</FieldDescription>
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
