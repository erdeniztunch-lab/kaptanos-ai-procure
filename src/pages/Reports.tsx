import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, FileText, TrendingUp, TrendingDown, Clock, ShoppingCart, DollarSign, Users } from "lucide-react";

// Mock data for charts
const monthlySpending = [
  { month: "Oca", amount: 125000, savings: 15000 },
  { month: "Şub", amount: 135000, savings: 18000 },
  { month: "Mar", amount: 142000, savings: 22000 },
  { month: "Nis", amount: 128000, savings: 16000 },
  { month: "May", amount: 158000, savings: 25000 },
  { month: "Haz", amount: 145000, savings: 20000 }
];

const topMaterials = [
  { name: "Çimento", value: 35, amount: 245000 },
  { name: "Demir", value: 25, amount: 175000 },
  { name: "Boya", value: 15, amount: 105000 },
  { name: "Elektrik", value: 12, amount: 84000 },
  { name: "Tesisat", value: 8, amount: 56000 },
  { name: "Diğer", value: 5, amount: 35000 }
];

const timeSavings = [
  { process: "Manual", time: 240, label: "Manuel Süreç" },
  { process: "AI", time: 45, label: "AI ile Süreç" }
];

const supplierPerformance = [
  { name: "Akçimento A.Ş.", orders: 15, rating: 4.8, onTime: 95 },
  { name: "ElektrikPro Ltd.", orders: 12, rating: 4.6, onTime: 88 },
  { name: "Tesisat Dünyası", orders: 8, rating: 4.5, onTime: 92 },
  { name: "Boya Merkezi", orders: 10, rating: 4.3, onTime: 85 },
  { name: "İnşaat Market", orders: 6, rating: 4.7, onTime: 98 }
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))", "hsl(var(--destructive))", "hsl(var(--warning))"];

export default function Reports() {
  const [dateRange, setDateRange] = useState("6m");
  const [reportType, setReportType] = useState("summary");

  const totalSpending = monthlySpending.reduce((sum, month) => sum + month.amount, 0);
  const totalSavings = monthlySpending.reduce((sum, month) => sum + month.savings, 0);
  const avgProcessTime = 45; // AI süreç süresi
  const totalOrders = supplierPerformance.reduce((sum, supplier) => sum + supplier.orders, 0);

  const handleExport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    // TODO: Implement export functionality
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Raporlar</h1>
            <p className="text-muted-foreground mt-2">
              Satın alma performansını ve tasarrufları analiz edin
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-150">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Son 1 Ay</SelectItem>
                <SelectItem value="3m">Son 3 Ay</SelectItem>
                <SelectItem value="6m">Son 6 Ay</SelectItem>
                <SelectItem value="1y">Son 1 Yıl</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => handleExport("pdf")} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button onClick={() => handleExport("excel")} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Harcama</p>
                  <p className="text-2xl font-bold">₺{totalSpending.toLocaleString()}</p>
                  <p className="text-xs text-success-foreground flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3" />
                    %12 tasarruf
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Tasarruf</p>
                  <p className="text-2xl font-bold text-success-foreground">₺{totalSavings.toLocaleString()}</p>
                  <p className="text-xs text-success-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    %18 artış
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ortalama Süreç Süresi</p>
                  <p className="text-2xl font-bold">{avgProcessTime} dk</p>
                  <p className="text-xs text-success-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    %81 hızlı
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <ShoppingCart className="w-3 h-3" />
                    Bu dönemde
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Spending Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Aylık Harcama Analizi</CardTitle>
              <CardDescription>Harcama ve tasarruf trend analizi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-300">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₺${Number(value).toLocaleString()}`} />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" name="Harcama" />
                    <Bar dataKey="savings" fill="hsl(var(--success))" name="Tasarruf" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Materials Pie Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>En Çok Satın Alınan Malzemeler</CardTitle>
              <CardDescription>Kategori bazında dağılım</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-300">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topMaterials}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} %${(percent * 100).toFixed(0)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {topMaterials.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `%${value}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Time Comparison */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Süreç Süresi Karşılaştırması</CardTitle>
            <CardDescription>Manuel vs AI destekli süreç verimliliği</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeSavings.map((item) => (
                <div key={item.process} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">Ortalama süreç süresi</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{item.time} dk</p>
                    {item.process === "AI" && (
                      <Badge className="bg-success/20 text-success-foreground border-success/30">
                        %81 daha hızlı
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supplier Performance */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tedarikçi Performansı</CardTitle>
            <CardDescription>Tedarikçilerin sipariş ve teslimat performansı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierPerformance.map((supplier) => (
                <div key={supplier.name} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{supplier.name}</h4>
                    <p className="text-sm text-muted-foreground">{supplier.orders} sipariş</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Puan</p>
                      <p className="font-semibold">{supplier.rating}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Zamanında</p>
                      <p className="font-semibold">%{supplier.onTime}</p>
                    </div>
                    <Badge 
                      className={supplier.onTime >= 90 ? 
                        "bg-success/20 text-success-foreground border-success/30" : 
                        "bg-warning/20 text-warning-foreground border-warning/30"
                      }
                    >
                      {supplier.onTime >= 90 ? "Mükemmel" : "Orta"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}