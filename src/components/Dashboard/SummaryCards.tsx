import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  Package
} from "lucide-react";

const summaryData = [
  {
    title: "Bekleyen Talepler",
    value: "24",
    change: "+3 bugün",
    trend: "up",
    icon: FileText,
    color: "status-pending",
    bgColor: "bg-status-pending/10"
  },
  {
    title: "Onay Bekleyen",
    value: "8",
    change: "2 acil",
    trend: "urgent",
    icon: AlertTriangle,
    color: "status-error",
    bgColor: "bg-status-error/10"
  },
  {
    title: "Toplam Tasarruf",
    value: "₺127,450",
    change: "+12% bu ay",
    trend: "up",
    icon: TrendingUp,
    color: "status-completed",
    bgColor: "bg-status-completed/10"
  },
  {
    title: "Aktif Siparişler",
    value: "15",
    change: "3 teslim yakın",
    trend: "info",
    icon: Package,
    color: "status-approved",
    bgColor: "bg-status-approved/10"
  }
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item, index) => (
        <Card key={index} className="shadow-card hover:shadow-elevated transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 text-${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">
              {item.value}
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={item.trend === "up" ? "default" : item.trend === "urgent" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {item.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}