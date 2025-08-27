import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calendar, Truck, Package, CheckCircle, Clock, AlertCircle, Search, Filter } from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    title: "Çimento ve İnşaat Malzemeleri",
    supplier: "Akçimento A.Ş.",
    amount: 45000,
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-25",
    status: "in_transit",
    progress: 60,
    items: ["Portland çimento 500 ton", "Demir 200 ton"],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-25"
  },
  {
    id: "ORD-2024-002", 
    title: "Elektrik Malzemeleri",
    supplier: "ElektrikPro Ltd.",
    amount: 12500,
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-20",
    status: "delivered",
    progress: 100,
    items: ["Kablo 500m", "Priz seti", "Anahtar seti"],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-20"
  },
  {
    id: "ORD-2024-003",
    title: "Su Tesisatı Malzemeleri", 
    supplier: "Tesisat Dünyası",
    amount: 8900,
    orderDate: "2024-01-18",
    deliveryDate: "2024-01-28",
    status: "preparing",
    progress: 25,
    items: ["PVC boru 100m", "Vana seti", "Fitting"],
    trackingNumber: "TRK456789123",
    estimatedDelivery: "2024-01-28"
  },
  {
    id: "ORD-2024-004",
    title: "Boyalar ve Kimyasallar",
    supplier: "Boya Merkezi",
    amount: 15600,
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-18",
    status: "delayed",
    progress: 40,
    items: ["Astar boya 50L", "Son kat boya 100L"],
    trackingNumber: "TRK789123456",
    estimatedDelivery: "2024-01-22"
  }
];

const statusConfig = {
  preparing: {
    label: "Hazırlanıyor",
    color: "bg-warning/20 text-warning-foreground border-warning/30",
    icon: Package
  },
  in_transit: {
    label: "Yolda", 
    color: "bg-primary/20 text-primary-foreground border-primary/30",
    icon: Truck
  },
  delivered: {
    label: "Teslim Edildi",
    color: "bg-success/20 text-success-foreground border-success/30", 
    icon: CheckCircle
  },
  delayed: {
    label: "Gecikmiş",
    color: "bg-destructive/20 text-destructive-foreground border-destructive/30",
    icon: AlertCircle
  }
};

const StatusBadge = ({ status }: { status: keyof typeof statusConfig }) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge className={config.color}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};

const StatusProgress = ({ status, progress }: { status: keyof typeof statusConfig; progress: number }) => {
  const getProgressColor = () => {
    if (status === "delivered") return "bg-success";
    if (status === "delayed") return "bg-destructive";
    if (status === "in_transit") return "bg-primary";
    return "bg-warning";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>İlerleme</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className={`h-2 ${getProgressColor()}`} />
    </div>
  );
};

export default function OrderTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sipariş Takibi</h1>
          <p className="text-muted-foreground mt-2">
            Siparişlerinizin durumunu takip edin ve teslimat sürecini izleyin
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sipariş no, ürün adı veya tedarikçi ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-200">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Durum filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                  <SelectItem value="in_transit">Yolda</SelectItem>
                  <SelectItem value="delivered">Teslim Edildi</SelectItem>
                  <SelectItem value="delayed">Gecikmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{order.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span>Sipariş No: {order.id}</span>
                      <span>•</span>
                      <span>{order.supplier}</span>
                    </CardDescription>
                  </div>
                  <StatusBadge status={order.status as keyof typeof statusConfig} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <StatusProgress 
                  status={order.status as keyof typeof statusConfig} 
                  progress={order.progress} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tutar</p>
                    <p className="font-semibold">₺{order.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sipariş Tarihi</p>
                    <p className="text-sm">{order.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tahmini Teslimat</p>
                    <p className="text-sm">{order.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Takip No</p>
                    <p className="text-sm font-mono">{order.trackingNumber}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Ürünler</p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" size="sm">
                    <Package className="w-4 h-4 mr-2" />
                    Detaylar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Truck className="w-4 h-4 mr-2" />
                    Takip Et
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Teslim Onayla
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aradığınız kriterlerde sipariş bulunamadı.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}