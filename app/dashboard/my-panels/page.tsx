import Header from "@/components/Header/Header";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";

const Settings = () => {
  return (
    <div className="min-h-full flex flex-col text-white py-8 px-14 bg-transparent max-w-6xl mx-auto w-full">
      <Header header="پنل‌های من" />
      <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 mt-2 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
        <PanelCard
          id="1"
          panelName="پنل باغ 1"
          technicalDetails={{
            capacity: 5.2,
            todayProduction: 12.3,
            efficiency: 92,
          }}
          address="ایران، استان البرز، شهر کرج، دویست متری باغ های مهرشهر، قبل از تقاطع خیابانی و 
          تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار
          مرتضی مطهری، خیابان مرحوم مرتضی پاشایی، کوچه خوش صدایان، سمت راست پلاک 447 واحد 12"
        />
        <PanelCard
          id="2"
          panelName="پنل باغ 2"
          technicalDetails={{
            capacity: 5.2,
            todayProduction: 12.3,
            efficiency: 92,
          }}
          address="باغ شیراز"
        />
        <PanelCard
          id="3"
          panelName="پنل باغ 3"
          technicalDetails={{
            capacity: 5.2,
            todayProduction: 12.3,
            efficiency: 92,
          }}
          address="باغ تالش"
        />
      </div>
    </div>
  );
};

export default Settings;
