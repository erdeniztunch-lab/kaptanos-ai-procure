import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, Eye, MessageCircle } from "lucide-react";

const approvalRequests = [
  {
    id: 1,
    title: "Çimento ve İnşaat Malzemeleri",
    requester: "Ahmet Kaya",
    department: "Şantiye A",
    amount: 45000,
    date: "2024-01-15",
    priority: "Acil",
    status: "pending",
    description: "Portland çimento 500 ton, demir 200 ton",
    suppliers: 3
  },
  {
    id: 2,
    title: "Elektrik Malzemeleri",
    requester: "Mehmet Özkan",
    department: "Şantiye B", 
    amount: 12500,
    date: "2024-01-14",
    priority: "Normal",
    status: "pending",
    description: "Kablo, priz, anahtar setleri",
    suppliers: 2
  },
  {
    id: 3,
    title: "Su Tesisatı Malzemeleri",
    requester: "Fatma Demir",
    department: "Şantiye C",
    amount: 8900,
    date: "2024-01-13",
    priority: "Düşük",
    status: "approved",
    description: "Borular, vana, fitting",
    suppliers: 4
  }
];

const approvalHistory = [
  {
    id: 1,
    title: "Boyalar ve Kimyasallar",
    approver: "Ali Veli",
    action: "Onaylandı",
    date: "2024-01-12",
    amount: 15600,
    note: "Fiyat uygun, tedarikçi güvenilir"
  },
  {
    id: 2,
    title: "Cam ve Pencere Malzemeleri",
    approver: "Zeynep Yılmaz",
    action: "Reddedildi",
    date: "2024-01-10",
    amount: 23400,
    note: "Fiyat beklentilerin üzerinde"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    pending: "bg-warning/20 text-warning-foreground border-warning/30",
    approved: "bg-success/20 text-success-foreground border-success/30",
    rejected: "bg-destructive/20 text-destructive-foreground border-destructive/30"
  };
  
  const labels = {
    pending: "Beklemede",
    approved: "Onaylandı", 
    rejected: "Reddedildi"
  };
  
  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const variants = {
    "Acil": "bg-destructive/20 text-destructive-foreground border-destructive/30",
    "Normal": "bg-primary/20 text-primary-foreground border-primary/30",
    "Düşük": "bg-muted/50 text-muted-foreground border-muted"
  };
  
  return (
    <Badge variant="outline" className={variants[priority as keyof typeof variants]}>
      {priority}
    </Badge>
  );
};

export default function Approvals() {
  const [selectedTab, setSelectedTab] = useState("pending");

  const handleApprove = (id: number) => {
    console.log(`Approved request ${id}`);
    // TODO: Implement approval logic
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request ${id}`);
    // TODO: Implement rejection logic
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Onaylar</h1>
          <p className="text-muted-foreground mt-2">
            Bekleyen talepleri inceleyin ve onay süreçlerini yönetin
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-400">
            <TabsTrigger value="pending">Bekleyen Onaylar</TabsTrigger>
            <TabsTrigger value="history">Onay Geçmişi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {approvalRequests
              .filter(req => req.status === "pending")
              .map((request) => (
                <Card key={request.id} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>Talep Eden: {request.requester}</span>
                          <span>•</span>
                          <span>{request.department}</span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={request.priority} />
                        <StatusBadge status={request.status} />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Tutar</p>
                        <p className="text-lg font-semibold text-foreground">
                          ₺{request.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tarih</p>
                        <p className="text-sm font-medium">{request.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tedarikçi Sayısı</p>
                        <p className="text-sm font-medium">{request.suppliers} teklif</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Açıklama</p>
                      <p className="text-sm">{request.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <Button 
                        onClick={() => handleApprove(request.id)}
                        className="bg-success hover:bg-success/90 text-success-foreground"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Onayla
                      </Button>
                      <Button 
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reddet
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Detaylar
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Yorum
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            {approvalHistory.map((item) => (
              <Card key={item.id} className="shadow-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {item.approver.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {item.approver} • {item.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.note}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={item.action === "Onaylandı" ? "approved" : "rejected"} />
                      <p className="text-sm font-medium mt-1">₺{item.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}