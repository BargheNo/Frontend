import { ArrowLeft } from 'lucide-react';
import React from 'react';
import BidCard from '@/components/CorpDashboard/Bids/BidCard';

/**
 * Style Showcase Page
 * A structured demonstration of various styles available in the application
 */
const StyleShowcase = () => {
  return (
    <div className="!w-full p-6 space-y-8 shadow-2xl bg-[#f1f4fc]">
      <section className="space-y-4">
        <br /><br />
        <h2 className="text-xl font-bold">Form Elements</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Input with inset-input style:</label>
          <input
            type="password"
            name="password"
            value="test"
            placeholder="رمز عبور"
            className="text-black w-full px-3 py-2 inset-input"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Button with cta-neu-button style:</label>
          <button
            type="submit"
            className="flex justify-center cta-neu-button"
          >
            {"ورود"}
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Component Showcase</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">BidCards inside neu-container style:</label>
          <div className="flex flex-col neu-container">
            <BidCard
              panelDetails={{
                panelName: "پنل خانه تهرانپارس",
                customerName: "مجتبی قاطع",
                address: "فلکه شانزدهم تهرانپارس، حیدرخانی، کوچه پارسا، پلاک 134",
                capacity: 5000,
                price: 200000,
              }}
              status="confirmed"
            />
            <BidCard
              panelDetails={{
                panelName: "پنل باغ شهری",
                customerName: "رضا موسوی نارنجی",
                address: "ایران، استان کبیر اردبیل، نرسیده ترکیه، 200 کیلومتری ارومیه، کنار دریای خزر، خیابان باقلوا، کوچه خوشمزه، پلاک 104، درب انتهای کوچه سبز",
                capacity: 200,
                price: 120050780123406,
              }}
              status="pending"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Status Indicators</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">green-status style:</label>
            <div
              className="h-4 w-4 rounded-full green-status shadow-md"
            ></div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">yellow-status style:</label>
            <div
              className="h-4 w-4 rounded-full yellow-status shadow-md"
            ></div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">red-status style:</label>
            <div
              className="h-4 w-4 rounded-full red-status shadow-md"
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Status with inset shadow container:</label>
          <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-24">
            <div
              className="h-4 w-4 rounded-full green-status shadow-md"
            ></div>
            <span className="text-sm font-medium text-gray-600">
              {1 ? "تایید شده" : "در انتظار تایید مشتری"}
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Button Variations</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">red-circle-button style:</label>
          <div className="red-circle-button">
            <ArrowLeft />
          </div>
        </div>
      </section>

      {/* Section: Container Backgrounds */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Container Backgrounds</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">neu-shadow on white background:</label>
          <div className="bg-white rounded-2xl p-4 neu-shadow">
            Content with neu-shadow style
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">gradient-orange-purple with neu-shadow style:</label>
          <div className="gradient-orange-purple rounded-2xl p-4 neu-shadow">
            Content with gradient-orange-purple style
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">gradient-soft-blue with neu-shadow style:</label>
          <div className="gradient-soft-blue rounded-2xl p-4 neu-shadow">
            Content with gradient-soft-blue style
          </div>
        </div>
      </section>
    </div>
  );
};

export default StyleShowcase;