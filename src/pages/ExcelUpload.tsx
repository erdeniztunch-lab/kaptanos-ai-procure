import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Eye,
  Trash2,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExcelRow {
  id: number;
  kategori: string;
  urunAdi: string;
  miktar: number;
  birim: string;
  teslimTarihi: string;
  aciklama?: string;
  status: 'valid' | 'error' | 'warning';
  errors: string[];
}

const ExcelUpload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelData, setExcelData] = useState<ExcelRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Sample data for demo
  const sampleData: ExcelRow[] = [
    {
      id: 1,
      kategori: "Çimento",
      urunAdi: "Portland Çimentosu CEM I 42.5",
      miktar: 50,
      birim: "ton",
      teslimTarihi: "2024-01-15",
      aciklama: "Şantiye A için",
      status: 'valid',
      errors: []
    },
    {
      id: 2,
      kategori: "Demir",
      urunAdi: "12mm Nervürlü Demir",
      miktar: 10,
      birim: "ton",
      teslimTarihi: "2024-01-20",
      status: 'valid',
      errors: []
    },
    {
      id: 3,
      kategori: "",
      urunAdi: "Tuğla",
      miktar: 0,
      birim: "adet",
      teslimTarihi: "2024-01-10",
      status: 'error',
      errors: ["Kategori boş", "Miktar sıfır"]
    },
    {
      id: 4,
      kategori: "Boya",
      urunAdi: "Plastik Boya",
      miktar: 100,
      birim: "kg",
      teslimTarihi: "2023-12-30",
      status: 'warning',
      errors: ["Teslim tarihi geçmiş"]
    }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/)) {
      toast({
        title: "Geçersiz Dosya",
        description: "Lütfen Excel (.xlsx, .xls) veya CSV dosyası yükleyin",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setFileName(file.name);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setExcelData(sampleData);
          setPreviewMode(true);
          toast({
            title: "Dosya Yüklendi",
            description: "Excel dosyası başarıyla analiz edildi",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getStatusBadge = (status: ExcelRow['status']) => {
    switch (status) {
      case 'valid':
        return <Badge className="bg-status-completed text-white">Geçerli</Badge>;
      case 'warning':
        return <Badge className="bg-status-pending text-white">Uyarı</Badge>;
      case 'error':
        return <Badge className="bg-status-error text-white">Hata</Badge>;
    }
  };

  const validRows = excelData.filter(row => row.status === 'valid').length;
  const errorRows = excelData.filter(row => row.status === 'error').length;
  const warningRows = excelData.filter(row => row.status === 'warning').length;

  const handleSubmit = () => {
    const validData = excelData.filter(row => row.status === 'valid');
    if (validData.length === 0) {
      toast({
        title: "Geçerli Veri Yok",
        description: "Lütfen hataları düzeltin veya geçerli veriler ekleyin",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Talepler Oluşturuldu",
      description: `${validData.length} talep başarıyla oluşturuldu. AI asistanımız teklifleri toplayacak.`,
    });
    
    // Reset
    setExcelData([]);
    setPreviewMode(false);
    setFileName("");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Excel Toplu Yükleme</h1>
              <p className="text-primary-foreground/90">
                Excel dosyası ile toplu talep girişi yapın
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel (.xlsx, .xls) ve CSV desteklenir</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Otomatik veri doğrulama</span>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        {!previewMode && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Dosya Yükleme</CardTitle>
              <CardDescription>
                Excel dosyanızı sürükleyip bırakın veya dosya seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploading ? (
                  <div className="space-y-4">
                    <FileSpreadsheet className="h-16 w-16 mx-auto text-primary animate-pulse" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Dosya Yükleniyor...</h3>
                      <p className="text-sm text-muted-foreground mb-4">{fileName}</p>
                      <Progress value={uploadProgress} className="w-64 mx-auto" />
                      <p className="text-xs text-muted-foreground mt-2">{uploadProgress}% tamamlandı</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Excel Dosyası Yükleyin</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Dosyayı buraya sürükleyin veya yüklemek için tıklayın
                      </p>
                      <div className="flex gap-4 justify-center">
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button className="bg-gradient-primary">
                            <Upload className="h-4 w-4 mr-2" />
                            Dosya Seç
                          </Button>
                        </label>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Şablon İndir
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Desteklenen formatlar: .xlsx, .xls, .csv (Maks. 10MB)
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        {previewMode && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-status-completed/10 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-status-completed" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{validRows}</p>
                      <p className="text-sm text-muted-foreground">Geçerli Kayıt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-status-pending/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-status-pending" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{warningRows}</p>
                      <p className="text-sm text-muted-foreground">Uyarılı Kayıt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-status-error/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-status-error" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{errorRows}</p>
                      <p className="text-sm text-muted-foreground">Hatalı Kayıt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{excelData.length}</p>
                      <p className="text-sm text-muted-foreground">Toplam Kayıt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Preview */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Veri Önizleme
                  </CardTitle>
                  <CardDescription>
                    {fileName} - Verilerinizi kontrol edin ve düzeltin
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Temizle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Durum</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Ürün Adı</TableHead>
                        <TableHead>Miktar</TableHead>
                        <TableHead>Birim</TableHead>
                        <TableHead>Teslim Tarihi</TableHead>
                        <TableHead>Açıklama</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {excelData.map((row) => (
                        <TableRow key={row.id} className={row.status === 'error' ? 'bg-destructive/5' : ''}>
                          <TableCell>
                            <div className="space-y-1">
                              {getStatusBadge(row.status)}
                              {row.errors.length > 0 && (
                                <div className="text-xs text-destructive">
                                  {row.errors.join(', ')}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{row.kategori || '-'}</TableCell>
                          <TableCell className="font-medium">{row.urunAdi}</TableCell>
                          <TableCell>{row.miktar}</TableCell>
                          <TableCell>{row.birim}</TableCell>
                          <TableCell>{row.teslimTarihi}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {row.aciklama || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {errorRows > 0 && (
                  <Alert className="mt-4 border-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Veri Hataları Bulundu</AlertTitle>
                    <AlertDescription>
                      {errorRows} kayıtta hata var. Bu kayıtlar işleme alınmayacak. 
                      Excel dosyanızı düzenleyip tekrar yükleyebilirsiniz.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-gradient-primary hover:shadow-elevated"
                    disabled={validRows === 0}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {validRows} Talep Oluştur
                  </Button>
                  <Button variant="outline" onClick={() => setPreviewMode(false)}>
                    Yeni Dosya Yükle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Help Section */}
        <Card className="bg-primary-subtle/20 border-primary-subtle">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary mb-2">Excel Formatı Hakkında</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Excel dosyanızda aşağıdaki sütunlar bulunmalıdır:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Zorunlu Sütunlar:</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      <li>• Kategori</li>
                      <li>• Ürün Adı</li>
                      <li>• Miktar</li>
                      <li>• Teslim Tarihi</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Opsiyonel Sütunlar:</p>
                    <ul className="text-muted-foreground mt-1 space-y-1">
                      <li>• Birim</li>
                      <li>• Açıklama</li>
                      <li>• Teknik Özellikler</li>
                      <li>• Proje/Şantiye</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ExcelUpload;