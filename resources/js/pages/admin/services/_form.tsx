import { Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RouteDefinition } from '@/wayfinder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { TagInput } from '@/components/tag-input';
import { SpecFields } from '@/components/spec-fields';

const LOCALES = [
    { key: 'bg', label: 'BG' },
    { key: 'en', label: 'EN' },
] as const;

type Locale = (typeof LOCALES)[number]['key'];

interface ServiceFormData {
    name: { bg: string; en: string };
    description: { bg: string; en: string };
    is_active: boolean;
    products: string[];
    tags: string[];
    specs: {
        label: { bg: string; en: string };
        value: { bg: string; en: string };
    }[];
}

interface ServiceFormErrors {
    'name.bg'?: string;
    'name.en'?: string;
    'description.bg'?: string;
    'description.en'?: string;
    [key: string]: string | undefined;
}

interface Props {
    data: ServiceFormData;
    setData: (key: string, value: unknown) => void;
    errors: ServiceFormErrors;
    processing: boolean;
    slug?: string;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    cancelHref: RouteDefinition<'get'>;
    onDelete?: () => void;
    availableProducts: { slug: string; name: string }[];
    availableTags: { slug: string; name: string }[];
}

const locales = LOCALES.map((locale) => locale.key);

export function ServiceForm({
    data,
    setData,
    errors,
    processing,
    slug,
    onSubmit,
    submitLabel,
    cancelHref,
    onDelete,
    availableProducts,
    availableTags,
}: Props) {
    const [activeLocale, setActiveLocale] = useState<Locale>('bg');

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <form onSubmit={onSubmit} className="grid w-full gap-6">
                    <Tabs defaultValue={locales[0]} className="w-full">
                        <TabsList className="ml-auto">
                            {locales.map((locale) => (
                                <TabsTrigger
                                    key={locale}
                                    value={locale}
                                    onClick={() => setActiveLocale(locale)}
                                >
                                    {locale.toUpperCase()}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {locales.map((locale) => (
                            <TabsContent key={locale} value={locale}>
                                <FieldSet>
                                    <FieldLegend>Default data</FieldLegend>
                                    <FieldDescription>
                                        This is the basic information about the
                                        service, such as its name, description,
                                        and whether it is active or not.
                                    </FieldDescription>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="name">
                                                Name ({locale})
                                            </FieldLabel>
                                            <Input
                                                autoComplete="off"
                                                placeholder="ISO 9001:2015"
                                                value={data.name?.[locale]}
                                                onChange={(e) =>
                                                    setData(
                                                        `name.${locale}`,
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={
                                                    errors['name.' + locale]
                                                        ? 'true'
                                                        : 'false'
                                                }
                                            />
                                            <FieldDescription>
                                                This is the name of the
                                                certificate.
                                            </FieldDescription>
                                            {errors['name.' + locale] && (
                                                <FieldError>
                                                    {errors['name.' + locale]}
                                                </FieldError>
                                            )}
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="description">
                                                Description ({locale})
                                            </FieldLabel>
                                            <Textarea
                                                autoComplete="off"
                                                placeholder="Description of the certificate"
                                                value={
                                                    data.description?.[locale]
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        `description.${locale}`,
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={
                                                    errors[
                                                        'description.' + locale
                                                    ]
                                                        ? 'true'
                                                        : 'false'
                                                }
                                            ></Textarea>
                                            <FieldDescription>
                                                This is the description of the
                                                certificate.
                                            </FieldDescription>
                                            {errors[
                                                'description.' + locale
                                            ] && (
                                                <FieldError>
                                                    {
                                                        errors[
                                                            'description.' +
                                                                locale
                                                        ]
                                                    }
                                                </FieldError>
                                            )}
                                        </Field>
                                        <Field orientation="horizontal">
                                            <Switch
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) =>
                                                    setData(
                                                        'is_active',
                                                        checked,
                                                    )
                                                }
                                            />
                                            <FieldLabel htmlFor="is_active">
                                                Active
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </TabsContent>
                        ))}
                    </Tabs>
                    <FieldSet>
                        <FieldLegend>Additional data</FieldLegend>
                        <FieldDescription>
                            Relation with other entities, tags, specs, etc.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Products</FieldLabel>
                                <TagInput
                                    value={data.products}
                                    onChange={(products) =>
                                        setData('products', products)
                                    }
                                    suggestions={availableProducts}
                                    placeholder="Add products..."
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="tags">
                                    Предимства
                                </FieldLabel>
                                <TagInput
                                    value={data.tags}
                                    onChange={(tags) => setData('tags', tags)}
                                    suggestions={availableTags}
                                    placeholder="Добавете предимство..."
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="tags">
                                    Спецификации {activeLocale.toUpperCase()}
                                </FieldLabel>
                                <SpecFields
                                    specs={data.specs}
                                    onChange={(specs) => {
console.log(specs);

                                        setData('specs', specs)
                                    }
                                    }
                                    activeLocale={activeLocale}
                                    errors={errors}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <Field>
                        <FieldLabel htmlFor="cover_image">
                            Cover Image
                        </FieldLabel>
                        <Input
                            id="cover_image"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setData('cover_image', file);
                            }}
                            aria-invalid={errors.cover_image ? 'true' : 'false'}
                        />
                        <FieldDescription>
                            Select a cover image to upload.
                        </FieldDescription>
                        {errors.cover_image && (
                            <FieldError>{errors.cover_image}</FieldError>
                        )}
                    </Field>
                    <div className="flex items-center justify-between">
                        {onDelete && (
                            <Button variant="destructive" onClick={onDelete}>
                                Delete Service
                            </Button>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" asChild>
                                <Link href={cancelHref}>Cancel</Link>
                            </Button>
                            <Button
                                variant="default"
                                type="submit"
                                disabled={processing}
                                className="bg-green-400/30 text-green-600 hover:bg-green-400/40 dark:hover:text-green-600"
                            >
                                {submitLabel}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
