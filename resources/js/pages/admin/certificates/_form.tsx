import { Link } from '@inertiajs/react';
import type { MouseEventHandler, SubmitEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { RouteDefinition } from '@/wayfinder';

export default function CertificateForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
    cancelHref,
    locales,
    onDelete,
}: {
    data: any;
    setData: (field: string, value: any) => void;
    errors: any;
    processing: boolean;
    onSubmit: SubmitEventHandler<HTMLFormElement>;
    submitLabel: string;
    cancelHref: RouteDefinition<'get'>;
    locales: string[];
    onDelete?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <form onSubmit={onSubmit} className="grid w-full gap-6">
                    <Tabs defaultValue={locales[0]} className="w-full">
                        <TabsList className="ml-auto">
                            {locales.map((locale) => (
                                <TabsTrigger key={locale} value={locale}>
                                    {locale.toUpperCase()}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {locales.map((locale) => (
                            <TabsContent key={locale} value={locale}>
                                <FieldSet>
                                    <FieldLegend>Profile</FieldLegend>
                                    <FieldDescription>
                                        This appears on invoices and emails.
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
                                                id="active"
                                                checked={data.active}
                                                onCheckedChange={(checked) =>
                                                    setData('active', checked)
                                                }
                                            />
                                            <FieldLabel htmlFor="active">
                                                Active
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            </TabsContent>
                        ))}
                    </Tabs>
                    <Field>
                        <FieldLabel htmlFor="pdf">PDF</FieldLabel>
                        <Input id="pdf" type="file" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setData('pdf', file);
                            }} 
                            aria-invalid={errors.pdf ? 'true' : 'false'} 
                        />
                        <FieldDescription>
                            Select a PDF to upload.
                        </FieldDescription>
                        {errors.pdf && <FieldError>{errors.pdf}</FieldError>}
                    </Field>
                    <div className="flex items-center justify-between">
                        <Button variant="destructive" onClick={onDelete} >
                            Delete Certificate
                        </Button>
                        <div className='grid grid-cols-2 gap-4'>

                        <Button variant="outline" asChild>
                            <Link href={cancelHref}>Cancel</Link>
                        </Button>
                        <Button
                            variant='default'
                            type="submit"
                            disabled={processing}
                            className='bg-green-400/30 hover:bg-green-400/40 text-green-600 dark:hover:text-green-600'
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
