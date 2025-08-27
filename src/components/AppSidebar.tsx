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
    <Sidebar className={collapsed ? "w-20" : "w-80"} collapsible="icon">
      <SidebarContent className="bg-gradient-sidebar text-primary-foreground shadow-sidebar border-0">
        {/* Logo Section */}
        {!collapsed && (
          <div className="p-6 border-b border-primary-foreground/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Kaptanos</h2>
                <p className="text-xs text-primary-foreground/70">İnşaat Satın Alma</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 py-6">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/60 font-semibold text-xs uppercase tracking-wider px-6 mb-4">
              Ana Menü
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-3">
              <SidebarMenu className="space-y-2">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground font-semibold shadow-lg transform scale-[1.02]"
                              : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:transform hover:scale-[1.01]"
                          }`
                        }
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          currentPath === item.url 
                            ? "bg-primary-foreground/20" 
                            : "bg-primary-foreground/10 group-hover:bg-primary-foreground/20"
                        }`}>
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                        </div>
                        {!collapsed && (
                          <div className="flex-1">
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div className="mt-auto border-t border-primary-foreground/10 pt-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/60 font-semibold text-xs uppercase tracking-wider px-6 mb-4">
              Sistem
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-3">
              <SidebarMenu className="space-y-2">
                {systemItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
                              : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground/90"
                          }`
                        }
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          currentPath === item.url 
                            ? "bg-primary-foreground/20" 
                            : "bg-primary-foreground/10 group-hover:bg-primary-foreground/20"
                        }`}>
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                        </div>
                        {!collapsed && (
                          <span className="text-sm font-medium">{item.title}</span>
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