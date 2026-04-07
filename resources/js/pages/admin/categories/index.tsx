import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CategoriesController from '@/actions/App/Http/Controllers/Admin/CategoriesController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dashboard } from '@/routes';
import { index } from '@/routes/admin/categories';

interface AdminCategory {
    slug: string;
    name: { bg?: string; en?: string };
    type: 'project' | 'product';
    type_label: string;
    projects_count: number;
    products_count: number;
}

interface CategoryTypeOption {
    value: AdminCategory['type'];
    label: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCategories {
    data: AdminCategory[];
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
    type?: AdminCategory['type'] | null;
}

interface Props {
    categories: PaginatedCategories;
    filters: Filters;
    types: CategoryTypeOption[];
}

interface CategoryFormData {
    name: {
        bg: string;
        en: string;
    };
    type: '' | AdminCategory['type'];
}

interface CategoryFormFieldsProps {
    data: CategoryFormData;
    setData: (key: 'name' | 'type', value: CategoryFormData['name'] | CategoryFormData['type']) => void;
    errors: Record<string, string | undefined>;
    activeLocale: 'bg' | 'en';
    setActiveLocale: (locale: 'bg' | 'en') => void;
    types: CategoryTypeOption[];
}

const PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];
const LOCALES = [
    { key: 'bg', label: 'БГ' },
    { key: 'en', label: 'EN' },
] as const;

const getEmptyFormData = (): CategoryFormData => ({
    name: { bg: '', en: '' },
    type: '',
});

const getCategoryFormData = (category: AdminCategory): CategoryFormData => ({
    name: {
        bg: category.name.bg ?? '',
        en: category.name.en ?? '',
    },
    type: category.type,
});

const getRelatedCount = (category: AdminCategory): number => {
    return category.type === 'project' ? category.projects_count ?? 0 : category.products_count ?? 0;
};

const formatRelatedCount = (category: AdminCategory): string => {
    const count = getRelatedCount(category);
    const noun = category.type === 'project' ? 'project' : 'product';

    return `${count} ${count === 1 ? noun : `${noun}s`}`;
};

function CategoryFormFields({
    data,
    setData,
    errors,
    activeLocale,
    setActiveLocale,
    types,
}: CategoryFormFieldsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                    <Label>
                        Category Name <span className="text-destructive">*</span>
                    </Label>
                    <Tabs value={activeLocale} onValueChange={(value) => setActiveLocale(value as 'bg' | 'en')}>
                        <TabsList>
                            {LOCALES.map((locale) => (
                                <TabsTrigger key={locale.key} value={locale.key}>
                                    {locale.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {LOCALES.map((locale) => (
                    <div key={locale.key} className={activeLocale === locale.key ? 'block' : 'hidden'}>
                        <Input
                            value={data.name[locale.key]}
                            onChange={(e) =>
                                setData('name', {
                                    ...data.name,
                                    [locale.key]: e.target.value,
                                })
                            }
                            placeholder={locale.key === 'bg' ? 'Име на категория (БГ)' : 'Category name (EN)'}
                        />
                        <InputError message={errors[`name.${locale.key}`]} className="mt-2" />
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <Label>
                    Type <span className="text-destructive">*</span>
                </Label>
                <Select value={data.type || undefined} onValueChange={(value) => setData('type', value as AdminCategory['type'])}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        {types.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                                {type.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.type} />
            </div>
        </div>
    );
}

export default function Index({ categories, filters, types }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
    const [pendingDelete, setPendingDelete] = useState<AdminCategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeCreateLocale, setActiveCreateLocale] = useState<'bg' | 'en'>('bg');
    const [activeEditLocale, setActiveEditLocale] = useState<'bg' | 'en'>('bg');

    const createForm = useForm<CategoryFormData>(getEmptyFormData());
    const editForm = useForm<CategoryFormData>(getEmptyFormData());

    const openEditModal = (category: AdminCategory) => {
        editForm.setData(getCategoryFormData(category));
        editForm.clearErrors();
        setActiveEditLocale('bg');
        setEditingCategory(category);
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
            {
                search: search || undefined,
                per_page: filters.per_page ?? 15,
                type: filters.type || undefined,
                ...overrides,
            },
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

    const handleTypeFilterChange = (value: string) => {
        applyFilters({ type: value === 'all' ? undefined : value, page: 1 });
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        createForm.reset();
        createForm.clearErrors();
        setActiveCreateLocale('bg');
    };

    const closeEditModal = () => {
        setEditingCategory(null);
        editForm.reset();
        editForm.clearErrors();
        setActiveEditLocale('bg');
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createForm.post(CategoriesController.store.url(), {
            preserveScroll: true,
            onSuccess: () => closeCreateModal(),
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingCategory) {
            return;
        }

        editForm.put(CategoriesController.update.url(editingCategory), {
            preserveScroll: true,
            onSuccess: () => closeEditModal(),
        });
    };

    const handleDelete = () => {
        if (!pendingDelete) {
            return;
        }

        setIsDeleting(true);
        router.delete(CategoriesController.destroy.url(pendingDelete), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setPendingDelete(null);
            },
        });
    };

    const { meta } = categories;
    const pageLinks = meta.links.slice(1, -1);

    return (
        <>
            <Head title="Categories" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Categories" description="Manage project and product categories." />
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <div className="relative max-w-sm flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search categories..."
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
                        <span className="text-muted-foreground text-sm whitespace-nowrap">Type</span>
                        <Select value={filters.type ?? 'all'} onValueChange={handleTypeFilterChange}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {types.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Related Count</TableHead>
                                <TableHead className="w-24 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-muted-foreground py-12 text-center">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.data.map((category) => {
                                    const relatedCount = getRelatedCount(category);

                                    return (
                                        <TableRow key={category.slug}>
                                            <TableCell className="font-medium">
                                                {category.name.bg || category.name.en || category.slug}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{category.type_label}</Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatRelatedCount(category)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon-sm" onClick={() => openEditModal(category)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() => setPendingDelete(category)}
                                                        disabled={relatedCount > 0}
                                                        title={relatedCount > 0 ? 'Cannot delete a category that is already in use.' : 'Delete category'}
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
                                onClick={() => navigate(categories.links.first)}
                                disabled={meta.current_page === 1}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(categories.links.prev)}
                                disabled={!categories.links.prev}
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
                                onClick={() => navigate(categories.links.next)}
                                disabled={!categories.links.next}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(categories.links.last)}
                                disabled={meta.current_page === meta.last_page}
                            >
                                Last
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={showCreateModal} onOpenChange={(open) => !open ? closeCreateModal() : setShowCreateModal(true)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>Create a new category for projects or products.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <CategoryFormFields
                            data={createForm.data}
                            setData={createForm.setData}
                            errors={createForm.errors}
                            activeLocale={activeCreateLocale}
                            setActiveLocale={setActiveCreateLocale}
                            types={types}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeCreateModal} disabled={createForm.processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createForm.processing}>
                                {createForm.processing ? 'Saving...' : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingCategory} onOpenChange={(open) => !open && closeEditModal()}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update{' '}
                            <strong>{editingCategory?.name.bg || editingCategory?.name.en || editingCategory?.slug}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <CategoryFormFields
                            data={editForm.data}
                            setData={editForm.setData}
                            errors={editForm.errors}
                            activeLocale={activeEditLocale}
                            setActiveLocale={setActiveEditLocale}
                            types={types}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeEditModal} disabled={editForm.processing}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editForm.processing || !editingCategory}>
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{pendingDelete?.name.bg || pendingDelete?.name.en || pendingDelete?.slug}</strong>?
                            This action cannot be undone.
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
        { title: 'Categories', href: index() },
    ],
};
