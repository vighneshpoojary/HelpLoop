import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import TopHeader from "./components/layout/TopHeader";
import RightSidebar from "./components/layout/RightSidebar";
import MobileNav from "./components/layout/MobileNav";

// Views
import HomeFeedView from "./components/feed/HomeFeedView";
import CategoriesView from "./components/categories/CategoriesView";
import CommunitiesView from "./components/communities/CommunitiesView";
import TelegramMessagingView from "./components/messaging/TelegramMessagingView";
import EventsView from "./components/events/EventsView";
import ImpactProfileView from "./components/impact/ImpactProfileView";
import AdminDashboardView from "./components/admin/AdminDashboardView";
import NotificationsView from "./components/notifications/NotificationsView";

// Modals
import CreateRequestModal from "./components/request/CreateRequestModal";
import RequestDetailModal from "./components/request/RequestDetailModal";
import DonateModal from "./components/request/DonateModal";
import LandingModal from "./components/auth/LandingModal";

function MainAppShell() {
  const { activeScreen } = useApp();
  const [isLandingOpen, setIsLandingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      <div className="flex flex-1 w-full max-w-[1720px] mx-auto relative">
        {/* 1. Left Dark Sidebar (Desktop) */}
        <Sidebar />

        {/* 2. Center Content Canvas */}
        <div className="flex-1 min-w-0 flex flex-col pb-16 lg:pb-6">
          <TopHeader />

          <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-5xl mx-auto w-full">
            {activeScreen === "home" && <HomeFeedView />}
            {activeScreen === "explore" && <CategoriesView />}
            {activeScreen === "communities" && <CommunitiesView />}
            {activeScreen === "messages" && <TelegramMessagingView />}
            {activeScreen === "events" && <EventsView />}
            {activeScreen === "impact" && <ImpactProfileView />}
            {activeScreen === "profile" && <ImpactProfileView />}
            {activeScreen === "admin" && <AdminDashboardView />}
            {activeScreen === "notifications" && <NotificationsView />}
          </main>
        </div>

        {/* 3. Right Sidebar (Desktop - hidden on chat screen) */}
        {activeScreen !== "messages" && <RightSidebar />}
      </div>

      {/* 4. Responsive Mobile Bottom Navigation */}
      <MobileNav />

      {/* Modals & Overlays */}
      <CreateRequestModal />
      <RequestDetailModal />
      <DonateModal />
      <LandingModal isOpen={isLandingOpen} onClose={() => setIsLandingOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppShell />
    </AppProvider>
  );
}
