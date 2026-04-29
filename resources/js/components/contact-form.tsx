import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import {
    useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import MailController from '@/actions/App/Http/Controllers/MailController';
import type { ContactForm as ContactFormTranslation } from '@/types/translations';
import { Button } from './ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const initialFormData = {
    email: '',
    name: '',
    company: '',
    phone: '',
    message: '',
    'g-recaptcha-response': '',
};

export default function ContactForm({translations}: { translations: ContactFormTranslation | undefined }) {
    const {
        data,
        setData,
        transform,
        post,
        processing,
        errors,
        isDirty,
        hasErrors,
    } = useForm(initialFormData);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function submit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!executeRecaptcha) {
            console.error('reCAPTCHA not yet available');

            return;
        }

        const token = await executeRecaptcha('contact_form');

        if (!token) {
            console.error('reCAPTCHA token not available');

            return;
        }

        transform((currentData) => ({
            ...currentData,
            'g-recaptcha-response': token,
        }));

        post(MailController.__invoke.url(), {
            preserveScroll: true,
            onSuccess: (msg: { flash: { success?: string } }) => {
                setData(initialFormData);

                setSuccessMessage(
                    msg.flash['success'] ||
                        'Вашето съобщение беше изпратено успешно! Ще се свържем с вас скоро.',
                );
            },
            onError: (error) => {
                console.error('Error submitting form:', error);
            },
            onFinish: () => {
                transform((currentData) => currentData);
            },
        });
    }

    return (
        <div className="grid w-full max-w-xl gap-6 rounded-xl border border-primary/10 bg-card p-4 lg:p-8">
            {successMessage && (
                <div className="rounded bg-green-100 p-4 text-green-800 dark:bg-green-800 dark:text-green-200">
                    {successMessage}
                </div>
            )}
            <form onSubmit={submit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>
                            <h4>{translations?.title || 'Свържете се с нас'}</h4>
                        </FieldLegend>
                        <FieldDescription>
                            {translations?.description || 'Ако имате въпроси, нужда от консултация или искате да обсъдим вашия проект, не се колебайте да се свържете с нас.'}
                        </FieldDescription>
                        <FieldGroup>
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        {translations?.name || 'Име'} *
                                    </FieldLabel>
                                    <Input
                                        name="name"
                                        type="text"
                                        required
                                        value={data.name}
                                        placeholder={translations?.name || 'Име'}
                                        className="bg-background p-6"
                                        aria-invalid={!!errors.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="company">
                                        {translations?.company || 'Компания'}
                                    </FieldLabel>
                                    <Input
                                        name="company"
                                        type="text"
                                        required
                                        value={data.company}
                                        placeholder={translations?.company || 'Компания'}
                                        className="bg-background p-6"
                                        aria-invalid={!!errors.company}
                                        onChange={(e) =>
                                            setData('company', e.target.value)
                                        }
                                    />
                                    {errors.company && (
                                        <FieldError>
                                            {errors.company}
                                        </FieldError>
                                    )}
                                </Field>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        {translations?.email || 'Имейл'} *
                                    </FieldLabel>
                                    <Input
                                        name="email"
                                        value={data.email}
                                        type="email"
                                        aria-invalid={!!errors.email}
                                        required
                                        placeholder={translations?.email || 'Имейл'}
                                        className="bg-background p-6"
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <FieldError>{errors.email}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="phone">
                                        {translations?.phone || 'Телефон'} *
                                    </FieldLabel>
                                    <Input
                                        name="phone"
                                        type="text"
                                        required
                                        placeholder={translations?.phone || 'Телефон'}
                                        className="bg-background p-6"
                                        value={data.phone}
                                        aria-invalid={!!errors.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                    />
                                    {errors.phone && (
                                        <FieldError>{errors.phone}</FieldError>
                                    )}
                                </Field>
                            </div>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="message">
                                    {translations?.message || 'Съобщение'} *
                                </FieldLabel>
                                <Textarea
                                    rows={4}
                                    name="message"
                                    placeholder={translations?.message || 'Съобщение'}
                                    color="red"
                                    className="field-sizing-fixed resize-none bg-background p-6 dark:bg-background"
                                    value={data.message}
                                    aria-invalid={!!errors.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                />
                                {errors.message && (
                                    <FieldError>{errors.message}</FieldError>
                                )}
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal" className="grid gap-4">
                        {errors['g-recaptcha-response'] && (
                            <FieldError>
                                {errors['g-recaptcha-response']}
                            </FieldError>
                        )}
                        {processing ? (
                            <span className="w-full animate-pulse rounded bg-primary/20 p-6 text-center text-sm text-primary">
                                {translations?.submitting || 'Изпращане...'}
                            </span>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-accent p-6 lg:p-8"
                                disabled={processing || !isDirty || hasErrors}
                            >
                                {translations?.submitButton || 'Изпрати'}
                                <ArrowRight className="ml-2" />
                            </Button>
                        )}
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
