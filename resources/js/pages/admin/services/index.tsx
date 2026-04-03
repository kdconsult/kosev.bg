import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import ServicesController from '@/actions/App/Http/Controllers/Admin/ServicesController';
import Heading from '@/components/heading';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboard } from '@/routes';
import { index, create } from '@/routes/admin/services';

interface AdminService {
    slug: string;
    name: { bg?: string; en?: string };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedServices {
    data: AdminService[];
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

interface Props {
    services: PaginatedServices;
    filters: {
        search?: string;
        per_page?: number;
    };
}

const PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];

export default function Index({ services, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [pendingDelete, setPendingDelete] = useState<AdminService | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navigate = (url: string | null) => {
        if (!url) {
            return;
        }

        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const applyFilters = (overrides: Record<string, string | number | undefined>) => {
        router.get(
            index(),
            { search: search || undefined, per_page: filters.per_page, ...overrides },
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

    const handleDelete = () => {
        if (!pendingDelete) {
            return;
        }

        setIsDeleting(true);
        router.delete(ServicesController.destroy.url(pendingDelete), {
            onFinish: () => {
                setIsDeleting(false);
                setPendingDelete(null);
            },
        });
    };

    const { meta } = services;
    const pageLinks = meta.links.slice(1, -1);

    return (
        <>
            <Head title="Services" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Services" description="Manage the services offered." />
                    <Link href={create()} as="button" className="btn btn-xs btn-outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <div className="relative max-w-sm flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                ref={searchInputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search services..."
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
                        <Select
                            value={String(filters.per_page ?? 15)}
                            onValueChange={handlePerPageChange}
                        >
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
                                <TableHead>Slug</TableHead>
                                <TableHead className="w-24 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-muted-foreground py-12 text-center">
                                        No services found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                services.data.map((service) => (
                                    <TableRow key={service.slug}>
                                        <TableCell className="font-medium">
                                            {service.name.bg || service.name.en || service.slug}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {service.slug}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon-sm" asChild>
                                                    <Link href={ServicesController.edit.url(service)}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => setPendingDelete(service)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
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
                                onClick={() => navigate(services.links.first)}
                                disabled={meta.current_page === 1}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(services.links.prev)}
                                disabled={!services.links.prev}
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
                                onClick={() => navigate(services.links.next)}
                                disabled={!services.links.next}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(services.links.last)}
                                disabled={meta.current_page === meta.last_page}
                            >
                                Last
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>
                                {pendingDelete?.name.bg || pendingDelete?.name.en || pendingDelete?.slug}
                            </strong>
                            ? This action cannot be undone.
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
        { title: 'Services', href: index() },
    ],
};
