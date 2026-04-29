import { Link } from '@inertiajs/react';
import { Award, Cog, LayoutGrid, Link2Icon, Package, Tag, Tags, Wrench } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { index as certificatesIndex } from '@/routes/admin/certificates';
import { index as productsIndex } from '@/routes/admin/products';
import { index as projectsIndex } from '@/routes/admin/projects';
import { index as servicesIndex } from '@/routes/admin/services';
import { index as tagsIndex } from '@/routes/admin/tags';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: productsIndex(),
        icon: Package,
    },
    {
        title: 'Projects',
        href: projectsIndex(),
        icon: Wrench,
    },
    {
        title: 'Services',
        href: servicesIndex(),
        icon: Cog,
    },
    {
        title: 'Certificates',
        href: certificatesIndex(),
        icon: Award,
    },
    {
        title: 'Categories',
        href: categoriesIndex(),
        icon: Tag,
    },
    {
        title: 'Tags',
        href: tagsIndex(),
        icon: Tags,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Storefront',
        href: '/',
        icon: Link2Icon
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
