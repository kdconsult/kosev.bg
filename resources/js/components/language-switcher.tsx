import { router, usePage } from '@inertiajs/react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { switchMethod } from '@/routes/locale';

const localeLabels: Record<string, string> = {
    bg: 'БГ',
    en: 'EN',
};

export function LanguageSwitcher() {
    const { locale, locales } = usePage().props;

    function handleSwitch(newLocale: string) {
        if (newLocale === locale) {
            return;
        }

        router.post(
            switchMethod(newLocale).url,
            {},
            {
                preserveScroll: true,
                preserveState: false,
            },
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground focus:outline-none"
                aria-label="Смени езика"
            >
                {localeLabels[locale] ?? locale.toUpperCase()}
                <ChevronDownIcon size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-20 bg-muted">
                {locales.map((l) => (
                    <DropdownMenuItem
                        key={l}
                        onClick={() => handleSwitch(l)}
                        className="flex cursor-pointer items-center justify-between gap-3"
                    >
                        {localeLabels[l] ?? l.toUpperCase()}
                        {l === locale && <CheckIcon size={14} />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
