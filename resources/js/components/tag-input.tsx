import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagSuggestion {
    slug: string;
    name: string;
}

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    suggestions?: TagSuggestion[];
    placeholder?: string;
    className?: string;
}

export function TagInput({
    value,
    onChange,
    suggestions = [],
    placeholder = 'Add tags...',
    className,
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredSuggestions = suggestions.filter(
        (s) =>
            s.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.includes(s.name),
    );

    const addTag = (name: string) => {
        const trimmed = name.trim();

        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }

        setInputValue('');
        setShowDropdown(false);
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value[value.length - 1]);
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasDropdownItems =
        filteredSuggestions.length > 0 ||
        (inputValue.trim() !== '' &&
            !suggestions.some(
                (s) => s.name.toLowerCase() === inputValue.trim().toLowerCase(),
            ));

    return (
        <div ref={containerRef} className={cn('relative', className)}>
            <div
                className="flex min-h-10 w-full cursor-text flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                onClick={() => inputRef.current?.focus()}
            >
                {value.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeTag(tag);
                            }}
                            className="ml-0.5 rounded-sm hover:text-destructive"
                            aria-label={`Remove ${tag}`}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowDropdown(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="min-w-30 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                />
            </div>

            {showDropdown && hasDropdownItems && (
                <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                    {filteredSuggestions.slice(0, 8).map((s) => (
                        <button
                            key={s.slug}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                addTag(s.name);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                            {s.name}
                        </button>
                    ))}
                    {inputValue.trim() !== '' &&
                        !suggestions.some(
                            (s) =>
                                s.name.toLowerCase() ===
                                inputValue.trim().toLowerCase(),
                        ) && (
                            <button
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    addTag(inputValue);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                Create &ldquo;{inputValue}&rdquo;
                            </button>
                        )}
                </div>
            )}
        </div>
    );
}
