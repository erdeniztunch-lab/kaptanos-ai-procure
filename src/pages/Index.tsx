import { Layout } from "@/components/Layout";
import { SummaryCards } from "@/components/Dashboard/SummaryCards";
import { QuickActions } from "@/components/Dashboard/QuickActions";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-elevated">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Hoş Geldiniz, Kaptanos'a
          </h1>
          <p className="text-primary-foreground/90 text-sm md:text-base">
            İnşaat projeleriniz için akıllı satın alma asistanınız. 
            AI destekli süreçlerle zaman kazanın, maliyetleri optimize edin.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            AI asistanınız arka planda çalışarak en iyi teklifleri buluyor ve 
            süreçlerinizi otomatikleştiriyor.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
