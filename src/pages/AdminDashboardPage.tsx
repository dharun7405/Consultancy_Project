import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import DashboardHome from '../components/admin/DashboardHome';
import TenderRequests from '../components/admin/TenderRequests';
import UserManagement from '../components/admin/UserManagement';
import WebsiteAnalytics from '../components/admin/WebsiteAnalytics';
import AdminSettings from '../components/admin/AdminSettings';

const AdminDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardHome />} />
            <Route path="tender-requests/*" element={<TenderRequests />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="analytics" element={<WebsiteAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;