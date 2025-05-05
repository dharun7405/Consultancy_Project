import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TenderRequestPage from './pages/TenderRequestPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TendersPage from './pages/TendersPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="request-tender" element={<TenderRequestPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="tenders" element={<TendersPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
        </Route>
        <Route 
          path="/admin/dashboard/*" 
          element={
            <PrivateRoute>
              <AdminDashboardPage />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;