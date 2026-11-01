import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ScreenSwitcherModal } from './components/common/ScreenSwitcherModal';
import { BackendSqlDrawer } from './components/common/BackendSqlDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// 12 Screens
import { LoginScreen } from './components/screens/LoginScreen';
import { AgencyOverviewScreen } from './components/screens/AgencyOverviewScreen';
import { ClientManagementScreen } from './components/screens/ClientManagementScreen';
import { PostManagementScreen } from './components/screens/PostManagementScreen';
import { PostApprovalsScreen } from './components/screens/PostApprovalsScreen';
import { InstagramComposerScreen } from './components/screens/InstagramComposerScreen';
import { WhatsAppHubScreen } from './components/screens/WhatsAppHubScreen';
import { ClientDashboardScreen } from './components/screens/ClientDashboardScreen';
import { CreativeCatalogScreen } from './components/screens/CreativeCatalogScreen';
import { PostReviewDetailScreen } from './components/screens/PostReviewDetailScreen';
import { PatientLeadsScreen } from './components/screens/PatientLeadsScreen';
import { MonthlyAnalyticsScreen } from './components/screens/MonthlyAnalyticsScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen } = useApp();

  // Screen 1: Login Portal (Full viewport, no sidebar/navbar)
  if (currentScreen === 'login') {
    return (
      <>
        <LoginScreen />
        <ScreenSwitcherModal />
        <BackendSqlDrawer />
        <GlobalSearchModal />
      </>
    );
  }

  // Render the selected screen
  const renderScreen = () => {
    switch (currentScreen) {
      // Admin Workspace (Screens 2-7)
      case 'admin-overview':
        return <AgencyOverviewScreen />;
      case 'admin-clients':
        return <ClientManagementScreen />;
      case 'admin-posts':
        return <PostManagementScreen />;
      case 'admin-approvals':
        return <PostApprovalsScreen />;
      case 'admin-composer':
        return <InstagramComposerScreen />;
      case 'admin-whatsapp':
        return <WhatsAppHubScreen />;

      // Client Workspace (Screens 8-12)
      case 'client-dashboard':
        return <ClientDashboardScreen />;
      case 'client-posts':
        return <CreativeCatalogScreen />;
      case 'client-review-detail':
        return <PostReviewDetailScreen />;
      case 'client-leads':
        return <PatientLeadsScreen />;
      case 'client-analytics':
        return <MonthlyAnalyticsScreen />;

      default:
        return <AgencyOverviewScreen />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC] text-slate-800">
      {/* 260px Collapsible / Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        {/* Viewport Scroll Container */}
        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <ScreenSwitcherModal />
      <BackendSqlDrawer />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
