import Header from "@/components/Header/Header";
import PanelCard from "@/components/Panel/PanelCard/PanelCard";
import Image from "next/image";
import panelNotFound from "../../../public/images/panelNotFound/panelNotFound.png";

const mockPanels = [
  {
    id: "1",
    panelName: "پنل باغ 1",
    technicalDetails: {
      capacity: 5.2,
      todayProduction: 12.3,
      efficiency: 92,
      status: "فعال"
    },
    address: "ایران، استان البرز، شهر کرج، دویست متری باغ های مهرشهر، قبل از تقاطع خیابانی و مرتضی مطهری، خیابان مرحوم مرتضی پاشایی، کوچه خوش صدایان، سمت راست پلاک 447 واحد 12"
  },
  {
    id: "2",
    panelName: "پنل باغ 2",
    technicalDetails: {
      capacity: 5.2,
      todayProduction: 12.3,
      efficiency: 92,
      status: "در حال نصب"
    },
    address: "باغ شیراز"
  },
  {
    id: "3",
    panelName: "پنل باغ 3",
    technicalDetails: {
      capacity: 5.2,
      todayProduction: 12.3,
      efficiency: 92,
      status: "غیر فعال"
    },
    address: "باغ تالش"
  }
];

// const mockPanels = [];

const Settings = () => {
  // In a real app, this would come from an API call
  const panels = mockPanels;

  return (
    <div className="min-h-full flex flex-col text-white py-4 sm:py-8 px-4 sm:px-14 bg-transparent max-w-6xl mx-auto w-full">
      <Header header="پنل‌های من" />
      <div className="flex flex-col text-gray-800 rounded-2xl overflow-hidden border-1 mt-2 border-gray-200 shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_6px_16px_rgba(0,0,0,0.3)]">
        {panels.length > 0 ? (
          panels.map((panel) => (
            <PanelCard
              key={panel.id}
              id={panel.id}
              panelName={panel.panelName}
              technicalDetails={panel.technicalDetails}
              address={panel.address}
            />
          ))
        ) : (
          <div className="text-center space-y-8 sm:space-y-16 place-items-center py-6 sm:py-10 relative z-20 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]">
            <Image className="w-2/3 sm:w-1/3 mx-auto" src={panelNotFound} alt="panelNotFound"/>
            <div className="-mt-4 sm:-mt-8">
              <p className="mt-4 sm:mt-6 text-navy-blue text-2xl sm:text-3xl font-bold rtl">هیچ پنلی یافت نشد!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
