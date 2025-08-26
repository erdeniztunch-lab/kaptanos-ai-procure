import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scale, 
  Star, 
  TrendingUp, 
  Clock, 
  MapPin, 
  CheckCircle,
  AlertTriangle,
  Filter,
  ArrowUpDown,
  Eye,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quote {
  id: number;
  supplier: {
    name: string;
    rating: number;
    location: string;
    deliveryTime: string;
    reliability: number;
  };
  product: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  delivery: string;
  warranty: string;
  specifications: string;
  notes?: string;
  aiScore: number;
  status: 'pending' | 'selected' | 'rejected';
  savings?: number;
}

const sampleQuotes: Quote[] = [
  {
    id: 1,
    supplier: {
      name: "Akçansa Çimento",
      rating: 4.8,
      location: "İstanbul",
      deliveryTime: "2-3 gün",
      reliability: 95
    },
    product: "Portland Çimentosu CEM I 42.5",
    quantity: 50,
    unit: "ton",
    unitPrice: 1850,
    totalPrice: 92500,
    delivery: "2024-01-15",
    warranty: "6 ay",
    specifications: "TS EN 197-1 standardında, yüksek dayanım",
    aiScore: 92,
    status: 'pending',
    savings: 7500
  },
  {
    id: 2,
    supplier: {
      name: "Nuh Çimento",
      rating: 4.5,
      location: "Ankara",
      deliveryTime: "3-4 gün",
      reliability: 88
    },
    product: "Portland Çimentosu CEM I 42.5",
    quantity: 50,
    unit: "ton",
    unitPrice: 1920,
    totalPrice: 96000,
    delivery: "2024-01-17",
    warranty: "3 ay",
    specifications: "TS EN 197-1 standardında",
    aiScore: 78,
    status: 'pending'
  },
  {
    id: 3,
    supplier: {
      name: "Limak Çimento",
      rating: 4.2,
      location: "Ankara",
      deliveryTime: "4-5 gün",
      reliability: 82
    },
    product: "Portland Çimentosu CEM I 42.5",
    quantity: 50,
    unit: "ton",
    unitPrice: 2100,
    totalPrice: 105000,
    delivery: "2024-01-20",
    warranty: "6 ay",
    specifications: "TS EN 197-1 standardında, çevre dostu",
    notes: "Toplu alımlarda %5 indirim",
    aiScore: 65,
    status: 'pending'
  }
];

const QuoteComparison = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>(sampleQuotes);
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("aiScore");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectQuote = (quoteId: number) => {
    setQuotes(prev => prev.map(quote => ({
      ...quote,
      status: quote.id === quoteId ? 'selected' : 'rejected'
    })));
    setSelectedQuote(quoteId);
    
    const selected = quotes.find(q => q.id === quoteId);
    toast({
      title: "Teklif Seçildi",
      description: `${selected?.supplier.name} tedarikçisinin teklifi seçildi. Onay sürecine geçiliyor.`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-status-completed";
    if (score >= 70) return "text-status-pending";
    return "text-status-error";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { variant: "default" as const, label: "Mükemmel" };
    if (score >= 70) return { variant: "secondary" as const, label: "İyi" };
    return { variant: "destructive" as const, label: "Orta" };
  };

  const filteredQuotes = quotes
    .filter(quote => {
      if (filterBy === "high-score") return quote.aiScore >= 80;
      if (filterBy === "fast-delivery") return parseInt(quote.supplier.deliveryTime) <= 3;
      if (filterBy === "savings") return quote.savings && quote.savings > 0;
      return true;
    })
    .filter(quote => 
      quote.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.product.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.totalPrice - b.totalPrice;
        case "aiScore":
          return b.aiScore - a.aiScore;
        case "rating":
          return b.supplier.rating - a.supplier.rating;
        case "delivery":
          return new Date(a.delivery).getTime() - new Date(b.delivery).getTime();
        default:
          return 0;
      }
    });

  const bestQuote = quotes.reduce((best, current) => 
    current.aiScore > best.aiScore ? current : best
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Teklif Karşılaştırma</h1>
              <p className="text-primary-foreground/90">
                AI destekli analiz ile en uygun teklifi seçin
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{quotes.length} teklif karşılaştırıldı</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>AI skoru: {bestQuote.aiScore}/100</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Potansiyel tasarruf: ₺{bestQuote.savings?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <Card className="shadow-card border-primary/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Star className="h-5 w-5" />
              AI Önerisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{bestQuote.aiScore}</div>
                  <div className="text-xs text-muted-foreground">AI Skoru</div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{bestQuote.supplier.name}</h3>
                  <p className="text-muted-foreground">{bestQuote.product}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{bestQuote.supplier.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{bestQuote.supplier.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{bestQuote.supplier.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₺{bestQuote.totalPrice.toLocaleString()}</div>
                {bestQuote.savings && (
                  <div className="text-sm text-status-completed">
                    ₺{bestQuote.savings.toLocaleString()} tasarruf
                  </div>
                )}
                <Button 
                  className="mt-2 bg-gradient-primary hover:shadow-elevated"
                  onClick={() => handleSelectQuote(bestQuote.id)}
                  disabled={selectedQuote !== null}
                >
                  {selectedQuote === bestQuote.id ? "Seçildi" : "Bu Teklifi Seç"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 flex-1">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tedarikçi veya ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="high-score">Yüksek Skor</SelectItem>
                    <SelectItem value="fast-delivery">Hızlı Teslimat</SelectItem>
                    <SelectItem value="savings">Tasarruflu</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sırala" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aiScore">AI Skoru</SelectItem>
                    <SelectItem value="price">Fiyat</SelectItem>
                    <SelectItem value="rating">Değerlendirme</SelectItem>
                    <SelectItem value="delivery">Teslimat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Teklif Karşılaştırması
            </CardTitle>
            <CardDescription>
              {filteredQuotes.length} teklif listeleniyor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Tablo Görünümü</TabsTrigger>
                <TabsTrigger value="cards">Kart Görünümü</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="mt-6">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tedarikçi</TableHead>
                        <TableHead>Ürün</TableHead>
                        <TableHead>Birim Fiyat</TableHead>
                        <TableHead>Toplam Fiyat</TableHead>
                        <TableHead>Teslimat</TableHead>
                        <TableHead>AI Skoru</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuotes.map((quote) => (
                        <TableRow 
                          key={quote.id} 
                          className={`${
                            quote.status === 'selected' ? 'bg-status-completed/5' : 
                            quote.status === 'rejected' ? 'opacity-50' : ''
                          }`}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">{quote.supplier.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {quote.supplier.rating}
                                <MapPin className="h-3 w-3" />
                                {quote.supplier.location}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{quote.product}</div>
                            <div className="text-sm text-muted-foreground">
                              {quote.quantity} {quote.unit}
                            </div>
                          </TableCell>
                          <TableCell>₺{quote.unitPrice.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="font-semibold">₺{quote.totalPrice.toLocaleString()}</div>
                            {quote.savings && (
                              <div className="text-xs text-status-completed">
                                ₺{quote.savings.toLocaleString()} tasarruf
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{quote.supplier.deliveryTime}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{quote.delivery}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-bold ${getScoreColor(quote.aiScore)}`}>
                                {quote.aiScore}
                              </div>
                              <Badge {...getScoreBadge(quote.aiScore)}>
                                {getScoreBadge(quote.aiScore).label}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-3 w-3" />
                              </Button>
                              {quote.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSelectQuote(quote.id)}
                                  className="bg-gradient-primary"
                                >
                                  Seç
                                </Button>
                              )}
                              {quote.status === 'selected' && (
                                <Badge className="bg-status-completed">Seçildi</Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="cards" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuotes.map((quote) => (
                    <Card 
                      key={quote.id} 
                      className={`shadow-card transition-all duration-200 ${
                        quote.status === 'selected' ? 'ring-2 ring-status-completed shadow-elevated' : 
                        quote.status === 'rejected' ? 'opacity-50' : 'hover:shadow-elevated'
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{quote.supplier.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {quote.supplier.rating} • {quote.supplier.location}
                            </CardDescription>
                          </div>
                          <Badge {...getScoreBadge(quote.aiScore)}>
                            {quote.aiScore}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">{quote.product}</h4>
                            <p className="text-sm text-muted-foreground">
                              {quote.quantity} {quote.unit}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Birim Fiyat</p>
                              <p className="font-semibold">₺{quote.unitPrice.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Toplam</p>
                              <p className="font-semibold">₺{quote.totalPrice.toLocaleString()}</p>
                              {quote.savings && (
                                <p className="text-xs text-status-completed">
                                  ₺{quote.savings.toLocaleString()} tasarruf
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{quote.supplier.deliveryTime} • {quote.delivery}</span>
                          </div>

                          {quote.notes && (
                            <div className="p-2 bg-muted/50 rounded text-xs">
                              {quote.notes}
                            </div>
                          )}

                          <div className="flex gap-2">
                            {quote.status === 'pending' && (
                              <Button 
                                className="flex-1 bg-gradient-primary"
                                onClick={() => handleSelectQuote(quote.id)}
                              >
                                Seç
                              </Button>
                            )}
                            {quote.status === 'selected' && (
                              <Button className="flex-1 bg-status-completed" disabled>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Seçildi
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-primary-subtle/20 border-primary-subtle">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-2">AI Skor Açıklaması</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  AI skorumuz şu faktörleri değerlendirir:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Fiyat rekabetçiliği (%30)</li>
                    <li>• Tedarikçi güvenilirliği (%25)</li>
                    <li>• Teslimat hızı (%20)</li>
                  </ul>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Ürün kalitesi (%15)</li>
                    <li>• Geçmiş performans (%10)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QuoteComparison;