import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import TagsController from '@/actions/App/Http/Controllers/Admin/TagsController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboard } from '@/routes';
import { index } from '@/routes/admin/tags';

interface AdminTag {
    slug: string;
    name: Record<string, string | undefined>;
    projects_count: number;
    products_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTags {
    data: AdminTag[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        per_page: number;
        to: number | null;
        total: number;
        links: PaginationLink[];
    };
}

interface Filters {
    search?: string | null;
    per_page?: number;
}

interface Props {
    tags: PaginatedTags;
    filters: Filters;
}

interface TagFormData {
    name: Record<string, string>;
}

const PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];

const getEmptyFormData = (locales: string[]): TagFormData => ({
    name: Object.fromEntries(locales.map((locale) => [locale, ''])),
});

const getTagFormData = (tag: AdminTag, locales: string[]): TagFormData => ({
    name: Object.fromEntries(locales.map((locale) => [locale, tag.name[locale] ?? ''])),
});

const getUsedCount = (tag: AdminTag): number => (tag.projects_count ?? 0) + (tag.products_count ?? 0);

const formatUsedCount = (tag: AdminTag): string => {
    const count = getUsedCount(tag);

    return count === 0 ? '—' : `${count} ${count === 1 ? 'item' : 'items'}`;
};

interface TagFormFieldsProps {
    data: TagFormData;
    setData: (key: 'name', value: TagFormData['name']) => void;
    errors: Record<string, string | undefined>;
    locales: string[];
    primaryLocale: string;
}

function TagFormFields({ data, setData, errors, locales, primaryLocale }: TagFormFieldsProps) {
    return (
        <div className="space-y-4">
            {locales.map((locale) => (
                <div key={locale} className="space-y-2">
                    <Label>
                        Name ({locale.toUpperCase()}){' '}
                        {locale === primaryLocale && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                        value={data.name[locale] ?? ''}
                        onChange={(e) => setData('name', { ...data.name, [locale]: e.target.value })}
                    />
                    <InputError message={errors[`name.${locale}`]} />
                </div>
            ))}
        </div>
    );
}

export default function Index({ tags, filters }: Props) {
    const { locales, primaryLocale } = usePage().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTag, setEditingTag] = useState<AdminTag | null>(null);
    const [pendingDelete, setPendingDelete] = useState<AdminTag | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const createForm = useForm<TagFormData>(getEmptyFormData(locales));
    const editForm = useForm<TagFormData>(getEmptyFormData(locales));

    const openEditModal = (tag: AdminTag) => {
        editForm.setData(getTagFormData(tag, locales));
        editForm.clearErrors();
        setEditingTag(tag);
    };

    const navigate = (url: string | null) => {
        if (!url) {
            return;
        }

        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const applyFilters = (overrides: Record<string, string | number | undefined>) => {
        router.get(
            index(),
            { search: search || undefined, per_page: filters.per_page ?? 15, ...overrides },
            { preserveScroll: true, preserveState: true, replace: true },
        );
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: search || undefined, page: 1 });
    };

    const handlePerPageChange = (value: string) => {
        applyFilters({ per_page: Number(value), page: 1 });
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        createForm.reset();
        createForm.clearErrors();
    };

    const closeEditModal = () => {
        setEditingTag(null);
        editForm.reset();
        editForm.clearErrors();
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createForm.post(TagsController.store.url(), {
            preserveScroll: true,
            onSuccess: () => closeCreateModal(),
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingTag) {
            return;
        }

        editForm.put(TagsController.update.url(editingTag), {
            preserveScroll: true,
            onSuccess: () => closeEditModal(),
        });
    };

    const handleDelete = () => {
        if (!pendingDelete) {
            return;
        }

        setIsDeleting(true);
        router.delete(TagsController.destroy.url(pendingDelete), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setPendingDelete(null);
            },
        });
    };

    const { meta } = tags;
    const pageLinks = meta.links.slice(1, -1);

    return (
        <>
            <Head title="Tags" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Tags" description="Manage tags for products and projects." />
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Tag
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <div className="relative max-w-sm flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search tags..."
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                        {(filters.search || search) && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setSearch('');
                                    applyFilters({ search: undefined, page: 1 });
                                }}
                            >
                                Clear
                            </Button>
                        )}
                    </form>

                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm whitespace-nowrap">Rows per page</span>
                        <Select value={String(filters.per_page ?? 15)} onValueChange={handlePerPageChange}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PER_PAGE_OPTIONS.map((n) => (
                                    <SelectItem key={n} value={String(n)}>
                                        {n}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name BG</TableHead>
                                <TableHead>Name EN</TableHead>
                                <TableHead>Used In</TableHead>
                                <TableHead className="w-24 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tags.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-muted-foreground py-12 text-center">
                                        No tags found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tags.data.map((tag) => {
                                    const usedCount = getUsedCount(tag);

                                    return (
                                        <TableRow key={tag.slug}>
                                            <TableCell className="font-medium">
                                                {tag.name.bg || <span className="text-muted-foreground italic">No BG name</span>}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {tag.name.en || <span className="text-muted-foreground italic">No EN name</span>}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatUsedCount(tag)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon-sm" onClick={() => openEditModal(tag)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => setPendingDelete(tag)}
                                                        disabled={usedCount > 0}
                                                        title={usedCount > 0 ? 'Cannot delete a tag that is in use.' : 'Delete tag'}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>

                {meta.total > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            Showing {meta.from}–{meta.to} of {meta.total} results
                        </p>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(tags.links.first)}
                                disabled={meta.current_page === 1}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(tags.links.prev)}
                                disabled={!tags.links.prev}
                            >
                                Prev
                            </Button>

                            {pageLinks.map((link, i) => (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => navigate(link.url)}
                                    disabled={!link.url || link.active}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(tags.links.next)}
                                disabled={!tags.links.next}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(tags.links.last)}
                                disabled={meta.current_page === meta.last_page}
                            >
                                Last
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={showCreateModal} onOpenChange={(open) => (!open ? closeCreateModal() : setShowCreateModal(true))}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add Tag</DialogTitle>
                        <DialogDescription>Create a new tag for products and projects.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <TagFormFields
                            data={createForm.data}
                            setData={createForm.setData}
                            errors={createForm.errors}
                            locales={locales}
                            primaryLocale={primaryLocale}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeCreateModal} disabled={createForm.processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing ? 'Saving...' : 'Create Tag'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingTag} onOpenChange={(open) => !open && closeEditModal()}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                        <DialogDescription>
                            Update <strong>{editingTag?.name.bg || editingTag?.name.en || editingTag?.slug}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <TagFormFields
                            data={editForm.data}
                            setData={editForm.setData}
                            errors={editForm.errors}
                            locales={locales}
                            primaryLocale={primaryLocale}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeEditModal} disabled={editForm.processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editForm.processing || !editingTag}>
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Tag</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{pendingDelete?.name.bg || pendingDelete?.name.en || pendingDelete?.slug}</strong>? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPendingDelete(null)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Tags', href: index() },
    ],
};
