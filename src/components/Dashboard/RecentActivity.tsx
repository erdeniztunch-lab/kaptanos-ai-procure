import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Package,
  ExternalLink 
} from "lucide-react";

const activityData = [
  {
    id: 1,
    type: "request",
    title: "Çimento Talebi",
    description: "50 ton Portland çimentosu - Şantiye A",
    status: "pending",
    time: "2 saat önce",
    user: "Ahmet Yılmaz"
  },
  {
    id: 2,
    type: "approval",
    title: "Demir Çubuk Onayı",
    description: "10mm demir çubuk - 5 ton",
    status: "approved",
    time: "4 saat önce",
    user: "Mehmet Kaya"
  },
  {
    id: 3,
    type: "delivery",
    title: "Tuğla Teslimatı",
    description: "Kırmızı tuğla - 10,000 adet",
    status: "completed",
    time: "6 saat önce",
    user: "Sistem"
  },
  {
    id: 4,
    type: "quote",
    title: "Beton Mikser Teklifi",
    description: "3 tedarikçiden teklif alındı",
    status: "review",
    time: "1 gün önce",
    user: "AI Asistan"
  },
  {
    id: 5,
    type: "request",
    title: "Elektrik Malzemesi",
    description: "Kablo ve priz setleri",
    status: "urgent",
    time: "2 gün önce",
    user: "Fatma Öz"
  }
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "pending":
      return { 
        label: "Beklemede", 
        variant: "secondary" as const, 
        icon: Clock,
        color: "text-status-pending" 
      };
    case "approved":
      return { 
        label: "Onaylandı", 
        variant: "default" as const, 
        icon: CheckCircle,
        color: "text-status-approved" 
      };
    case "completed":
      return { 
        label: "Tamamlandı", 
        variant: "default" as const, 
        icon: Package,
        color: "text-status-completed" 
      };
    case "urgent":
      return { 
        label: "Acil", 
        variant: "destructive" as const, 
        icon: AlertTriangle,
        color: "text-status-error" 
      };
    default:
      return { 
        label: "İnceleme", 
        variant: "outline" as const, 
        icon: Clock,
        color: "text-muted-foreground" 
      };
  }
};

export function RecentActivity() {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Son Aktiviteler
        </CardTitle>
        <Button variant="ghost" size="sm">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activityData.map((activity) => {
              const statusInfo = getStatusInfo(activity.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                >
                  <div className={`p-2 rounded-full bg-background shadow-sm`}>
                    <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm text-foreground">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                      </div>
                      <Badge variant={statusInfo.variant} className="text-xs">
                        {statusInfo.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}