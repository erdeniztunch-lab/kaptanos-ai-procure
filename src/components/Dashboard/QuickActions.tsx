import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Yeni Talep Oluştur",
    description: "Form doldurarak hızlı talep girişi yapın",
    icon: FileText,
    href: "/request",
    primary: true
  },
  {
    title: "Excel Yükle",
    description: "Toplu talep girişi için Excel dosyası yükleyin",
    icon: Upload,
    href: "/upload",
    primary: false
  },
  {
    title: "Raporları Görüntüle",
    description: "Harcama ve tasarruf analizlerini inceleyin",
    icon: BarChart3,
    href: "/reports",
    primary: false
  }
];

export function QuickActions() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Hızlı İşlemler
        </CardTitle>
        <CardDescription>
          Sık kullanılan işlemlere hızlı erişim
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Button
                variant={action.primary ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center gap-3 w-full ${
                  action.primary 
                    ? "bg-gradient-primary hover:shadow-elevated" 
                    : "hover:bg-primary-subtle/50"
                }`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}