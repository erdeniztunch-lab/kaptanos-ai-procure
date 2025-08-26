import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "cement", label: "Çimento ve Bağlayıcılar" },
  { value: "steel", label: "Demir ve Çelik" },
  { value: "concrete", label: "Beton ve Agregalar" },
  { value: "brick", label: "Tuğla ve Blok" },
  { value: "electrical", label: "Elektrik Malzemeleri" },
  { value: "plumbing", label: "Tesisat Malzemeleri" },
  { value: "paint", label: "Boya ve İzolasyon" },
  { value: "tools", label: "Alet ve Ekipman" },
  { value: "other", label: "Diğer" }
];

const RequestForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    description: "",
    specifications: "",
    quantity: "",
    unit: "",
    urgentDelivery: false,
    deliveryDate: "",
    notes: "",
    budget: "",
    project: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) newErrors.category = "Kategori seçimi zorunludur";
    if (!formData.productName) newErrors.productName = "Ürün adı zorunludur";
    if (!formData.quantity) newErrors.quantity = "Miktar zorunludur";
    if (!formData.deliveryDate) newErrors.deliveryDate = "Teslim tarihi zorunludur";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Hatası",
        description: "Lütfen zorunlu alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Talep Oluşturuldu",
      description: "Talebiniz başarıyla oluşturuldu. AI asistanımız en iyi teklifleri arayacak.",
    });

    // Reset form
    setFormData({
      category: "",
      productName: "",
      description: "",
      specifications: "",
      quantity: "",
      unit: "",
      urgentDelivery: false,
      deliveryDate: "",
      notes: "",
      budget: "",
      project: ""
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Yeni Talep Oluştur</h1>
              <p className="text-primary-foreground/90">
                Malzeme talebinizi girin, AI asistanımız en iyi teklifleri bulacak
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Otomatik tedarikçi keşfi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2 dakikada teklif</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Talep Detayları</CardTitle>
            <CardDescription>
              Lütfen talep ettiğiniz malzeme hakkında detaylı bilgi verin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Kategori <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Malzeme kategorisini seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="productName" className="text-sm font-medium">
                    Ürün Adı <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleChange("productName", e.target.value)}
                    placeholder="Ör: Portland Çimentosu CEM I 42.5"
                    className={errors.productName ? "border-destructive" : ""}
                  />
                  {errors.productName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.productName}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Miktar <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      placeholder="100"
                      className={`flex-1 ${errors.quantity ? "border-destructive" : ""}`}
                    />
                    <Input
                      value={formData.unit}
                      onChange={(e) => handleChange("unit", e.target.value)}
                      placeholder="ton, adet, m³"
                      className="w-24"
                    />
                  </div>
                  {errors.quantity && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.quantity}
                    </p>
                  )}
                </div>

                {/* Delivery Date */}
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate" className="text-sm font-medium">
                    Teslim Tarihi <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleChange("deliveryDate", e.target.value)}
                    className={errors.deliveryDate ? "border-destructive" : ""}
                  />
                  {errors.deliveryDate && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.deliveryDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Ürün Açıklaması
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Malzeme hakkında detaylı açıklama yazın..."
                  rows={3}
                />
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <Label htmlFor="specifications" className="text-sm font-medium">
                  Teknik Özellikler
                </Label>
                <Textarea
                  id="specifications"
                  value={formData.specifications}
                  onChange={(e) => handleChange("specifications", e.target.value)}
                  placeholder="Teknik özellikler, standartlar, sertifikalar..."
                  rows={2}
                />
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-sm font-medium">
                    Proje/Şantiye
                  </Label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) => handleChange("project", e.target.value)}
                    placeholder="Proje adı veya şantiye konumu"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium">
                    Tahmini Bütçe (TL)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </div>

              {/* Urgent Delivery */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="urgent" className="text-sm font-medium">
                    Acil Teslimat
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Acil talepler öncelikli olarak işleme alınır
                  </p>
                </div>
                <Switch
                  id="urgent"
                  checked={formData.urgentDelivery}
                  onCheckedChange={(checked) => handleChange("urgentDelivery", checked)}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Ek Notlar
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Tedarikçiler için özel notlar, tercihler..."
                  rows={2}
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-primary hover:shadow-elevated">
                  <FileText className="h-4 w-4 mr-2" />
                  Talep Oluştur
                </Button>
                <Button type="button" variant="outline" className="px-8">
                  Taslak Kaydet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-primary-subtle/20 border-primary-subtle">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-2">AI Asistan Yardımı</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Formunuzu gönderdikten sonra AI asistanımız:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• En uygun tedarikçileri bulacak</li>
                  <li>• Otomatik olarak teklif toplayacak</li>
                  <li>• Fiyat karşılaştırması yapacak</li>
                  <li>• Size en iyi seçenekleri sunacak</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RequestForm;