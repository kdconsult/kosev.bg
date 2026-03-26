import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-accent p-1" >
                <AppLogoIcon  />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Kosev EOOD
                </span>
            </div>
        </>
    );
}
