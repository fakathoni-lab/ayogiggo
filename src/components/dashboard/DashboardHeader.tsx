import { ReactNode } from "react";
import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  actions?: ReactNode;
}

const DashboardHeader = ({
  title,
  subtitle,
  showSearch = true,
  searchPlaceholder = "Search...",
  actions,
}: DashboardHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 bg-muted rounded-xl border-0 focus:ring-2 focus:ring-primary text-sm w-48 lg:w-64"
            />
          </div>
        )}
        <button className="relative p-2 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        {actions}
      </div>
    </header>
  );
};

export default DashboardHeader;
