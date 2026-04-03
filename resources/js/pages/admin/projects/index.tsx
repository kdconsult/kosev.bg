import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectsController from '@/actions/App/Http/Controllers/Admin/ProjectsController';
import Heading from '@/components/heading';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index, create } from '@/routes/admin/projects';

interface Tag {
    slug: string;
    name: string;
}

interface AdminProject {
    slug: string;
    title: string;
    description: string;
    industry: string;
    category_slug: string | null;
    tags: Tag[];
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProjects {
    data: AdminProject[];
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
    projects: PaginatedProjects;
    filters: {
        search?: string;
        per_page?: number;
    };
}

const PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];

export default function ProjectsIndex({ projects, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [pendingDelete, setPendingDelete] = useState<AdminProject | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navigate = (url: string | null) => {
        if (!url) {
            return;
        }

        router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const applyFilters = (
        overrides: Record<string, string | number | undefined>,
    ) => {
        router.get(
            index(),
            {
                search: search || undefined,
                per_page: filters.per_page,
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

    const handleDelete = () => {
        if (!pendingDelete) {
            return;
        }

        setIsDeleting(true);
        router.delete(ProjectsController.destroy.url(pendingDelete), {
            onFinish: () => {
                setIsDeleting(false);
                setPendingDelete(null);
            },
        });
    };

    const { meta } = projects;
    const pageLinks = meta.links.slice(1, -1);

    return (
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Projects"
                        description="Manage your project catalogue."
                    />
                    <Button variant="default" asChild>
                        <Link
                            href={create()}
                            className="btn btn-xs btn-outline"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Project
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <div className="relative max-w-sm flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={searchInputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search projects..."
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
                                    applyFilters({
                                        search: undefined,
                                        page: 1,
                                    });
                                }}
                            >
                                Clear
                            </Button>
                        )}
                    </form>
                    <div className="flex items-center gap-2">
                        <span className="text-sm whitespace-nowrap text-muted-foreground">
                            Rows per page
                        </span>
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
                                <TableHead>Title</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead className="w-24 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="py-12 text-center text-muted-foreground"
                                    >
                                        No projects found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.data.map((project) => (
                                    <TableRow key={project.slug}>
                                        <TableCell className="font-medium">
                                            {project.title || project.slug}
                                        </TableCell>
                                        <TableCell>
                                            {project.industry ? (
                                                <Badge variant="outline">
                                                    {project.industry}
                                                </Badge>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <Badge
                                                            key={tag.slug}
                                                            variant="secondary"
                                                        >
                                                            {tag.name}
                                                        </Badge>
                                                    ))}
                                                {project.tags.length > 3 && (
                                                    <Badge variant="secondary">
                                                        +
                                                        {project.tags.length -
                                                            3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={ProjectsController.edit.url(
                                                            project,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        setPendingDelete(
                                                            project,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Delete
                                                    </span>
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
                        <p className="text-sm text-muted-foreground">
                            Showing {meta.from}–{meta.to} of {meta.total}{' '}
                            results
                        </p>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(projects.links.first)}
                                disabled={meta.current_page === 1}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(projects.links.prev)}
                                disabled={!projects.links.prev}
                            >
                                Prev
                            </Button>

                            {pageLinks.map((link, i) => (
                                <Button
                                    key={i}
                                    variant={
                                        link.active ? 'default' : 'outline'
                                    }
                                    size="sm"
                                    onClick={() => navigate(link.url)}
                                    disabled={!link.url || link.active}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(projects.links.next)}
                                disabled={!projects.links.next}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(projects.links.last)}
                                disabled={meta.current_page === meta.last_page}
                            >
                                Last
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Dialog
                open={!!pendingDelete}
                onOpenChange={(open) => !open && setPendingDelete(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>
                                {pendingDelete?.title || pendingDelete?.slug}
                            </strong>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDelete(null)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
