import { useNavigate } from "react-router-dom";
import { LucideIcon, LogOut } from "lucide-react";
import LogoMonogram from "@/components/shared/LogoMonogram";

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  path?: string; // Optional path for navigation
}

interface DashboardSidebarProps {
  variant: "brand" | "creator";
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userInitial: string;
  onLogout?: () => void;
}

const DashboardSidebar = ({
  variant,
  navItems,
  activeTab,
  onTabChange,
  userName,
  userInitial,
  onLogout
}: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const hubLabel = variant === "brand" ? "Brand Hub" : "Creator Hub";

  const handleNavClick = (item: NavItem) => {
    if (item.path) {
      navigate(item.path);
    } else {
      onTabChange(item.id);
    }
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <LogoMonogram size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) =>
        <button
          key={item.id}
          onClick={() => handleNavClick(item)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          activeTab === item.id ?
          "bg-primary text-primary-foreground" :
          "text-muted-foreground hover:bg-muted hover:text-foreground"}`
          }>

            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        )}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
            {userInitial}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground text-sm">{userName}</p>
            <p className="text-xs text-muted-foreground">{hubLabel}</p>
          </div>
          {onLogout &&
          <button
            onClick={onLogout}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Logout">

              <LogOut className="w-5 h-5" />
            </button>
          }
        </div>
      </div>
    </aside>);

};

export default DashboardSidebar;