import { usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface SpecData {
    label: Record<string, string>;
    value: Record<string, string>;
}

interface SpecFieldsProps {
    specs: SpecData[];
    onChange: (specs: SpecData[]) => void;
    activeLocale: string;
    errors?: Record<string, string | undefined>;
}

export function SpecFields({ specs, onChange, activeLocale, errors = {} }: SpecFieldsProps) {
    const { locales } = usePage().props;

    const addSpec = () => {
        onChange([
            ...specs,
            {
                label: Object.fromEntries(locales.map((l) => [l, ''])),
                value: Object.fromEntries(locales.map((l) => [l, ''])),
            },
        ]);
    };

    const removeSpec = (index: number) => {
        onChange(specs.filter((_, i) => i !== index));
    };

    const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
        const updated = specs.map((spec, i) => {
            if (i !== index) {
                return spec;
            }

            return { ...spec, [field]: { ...spec[field], [activeLocale]: val } };
        });

        onChange(updated);
    };

    return (
        <div className="grid gap-3">
            {specs.length > 0 && (
                <div className="grid gap-2">
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-sm font-medium text-muted-foreground">
                        <Label>Label</Label>
                        <Label>Value</Label>
                        <span />
                    </div>

                    {specs.map((spec, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-start gap-2">
                            <div>
                                <Input
                                    value={spec.label[activeLocale] ?? ''}
                                    onChange={(e) => updateSpec(index, 'label', e.target.value)}
                                    placeholder="Label"
                                />
                                <InputError message={errors[`specs.${index}.label.${activeLocale}`]} />
                                <InputError message={errors[`specs.${index}.label.bg`]} />
                            </div>
                            <div>
                                <Input
                                    value={spec.value[activeLocale] ?? ''}
                                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                                    placeholder="Value"
                                />
                                <InputError message={errors[`specs.${index}.value.${activeLocale}`]} />
                                <InputError message={errors[`specs.${index}.value.bg`]} />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSpec(index)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <Button type="button" variant="outline" size="sm" onClick={addSpec} className="w-fit">
                <Plus className="mr-2 h-4 w-4" />
                Add Spec
            </Button>
        </div>
    );
}
