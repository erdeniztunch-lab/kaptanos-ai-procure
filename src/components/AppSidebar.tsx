import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Upload,
  Scale,
  CheckSquare,
  TruckIcon,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Yeni Talep", url: "/request", icon: FileText },
  { title: "Excel Yükle", url: "/upload", icon: Upload },
  { title: "Teklif Karşılaştır", url: "/quotes", icon: Scale },
  { title: "Onaylar", url: "/approvals", icon: CheckSquare },
  { title: "Sipariş Takibi", url: "/tracking", icon: TruckIcon },
  { title: "Raporlar", url: "/reports", icon: BarChart3 },
];

const systemItems = [
  { title: "Ayarlar", url: "/settings", icon: Settings },
  { title: "Yardım", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gradient-sidebar text-primary-foreground shadow-sidebar border-0">
        {/* Logo Section */}
        {!collapsed && (
          <div className="p-4 border-b border-primary-foreground/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-base">Kaptanos</h2>
                <p className="text-xs text-primary-foreground/60">İnşaat Satın Alma</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/50 font-medium text-xs uppercase tracking-wide px-4 mb-3">
              Ana Menü
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu className="space-y-1">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-primary-foreground/15 text-primary-foreground font-medium"
                              : "text-primary-foreground/70 hover:bg-primary-foreground/8 hover:text-primary-foreground/90"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="border-t border-primary-foreground/10 pt-3">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/50 font-medium text-xs uppercase tracking-wide px-4 mb-3">
              Sistem
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2 pb-4">
              <SidebarMenu className="space-y-1">
                {systemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-primary-foreground/15 text-primary-foreground font-medium"
                              : "text-primary-foreground/60 hover:bg-primary-foreground/8 hover:text-primary-foreground/80"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}