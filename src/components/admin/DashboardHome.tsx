import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { ClipboardCheck, Users, TrendingUp, Calendar } from 'lucide-react';

interface DashboardStats {
  totalRequests: number;
  newRequestsToday: number;
  totalUsers: number;
  activeUsers: number;
  requestsData: { month: string; count: number }[];
  projectTypesData: { name: string; value: number }[];
}

const initialStats: DashboardStats = {
  totalRequests: 0,
  newRequestsToday: 0,
  totalUsers: 0,
  activeUsers: 0,
  requestsData: [],
  projectTypesData: []
};

const DashboardHome = () => {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // For demo purposes, set mock data if API fails
        setStats({
          totalRequests: 325,
          newRequestsToday: 8,
          totalUsers: 1247,
          activeUsers: 432,
          requestsData: [
            { month: 'Jan', count: 23 },
            { month: 'Feb', count: 32 },
            { month: 'Mar', count: 41 },
            { month: 'Apr', count: 35 },
            { month: 'May', count: 48 },
            { month: 'Jun', count: 43 },
            { month: 'Jul', count: 52 },
            { month: 'Aug', count: 49 },
            { month: 'Sep', count: 57 },
            { month: 'Oct', count: 62 },
            { month: 'Nov', count: 45 },
            { month: 'Dec', count: 38 }
          ],
          projectTypesData: [
            { name: 'Commercial', value: 40 },
            { name: 'Residential', value: 30 },
            { name: 'Infrastructure', value: 20 },
            { name: 'Industrial', value: 10 }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your infrastructure projects today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Tender Requests" 
          value={stats.totalRequests} 
          icon={<ClipboardCheck className="text-blue-600" size={24} />} 
          change={"+12.5%"} 
          changeType="increase"
        />
        <StatCard 
          title="New Requests Today" 
          value={stats.newRequestsToday} 
          icon={<Calendar className="text-green-600" size={24} />} 
          change={"+3"} 
          changeType="increase"
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users className="text-purple-600" size={24} />} 
          change={"+5.2%"} 
          changeType="increase"
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={<TrendingUp className="text-orange-600" size={24} />} 
          change={"-2.1%"} 
          changeType="decrease"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Tender Requests (Last 12 Months)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.requestsData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Project Types Distribution</h2>
          <div className="h-80 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={stats.projectTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.projectTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} requests`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center flex-wrap mt-4">
              {stats.projectTypesData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mx-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity and pending requests summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Tender Requests</h2>
          <div className="space-y-4">
            <RequestItem 
              company="TechSpace Developers" 
              type="Commercial Construction" 
              date="Today, 10:23 AM" 
              status="new" 
            />
            <RequestItem 
              company="Urban Living Developers" 
              type="Residential Project" 
              date="Yesterday, 2:45 PM" 
              status="reviewed" 
            />
            <RequestItem 
              company="GreenPath Innovations" 
              type="Infrastructure Development" 
              date="Aug 23, 2023, 9:12 AM" 
              status="contacted" 
            />
            <RequestItem 
              company="Skyline Builders" 
              type="Commercial Construction" 
              date="Aug 21, 2023, 4:30 PM" 
              status="new" 
            />
          </div>
          <div className="mt-4 text-center">
            <a href="/admin/dashboard/tender-requests" className="text-primary text-sm hover:underline">
              View all requests
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User Activity</h2>
          <div className="space-y-4">
            <ActivityItem 
              user="Raj Kumar" 
              action="registered a new account" 
              date="Today, 11:45 AM" 
              icon="user"
            />
            <ActivityItem 
              user="Admin" 
              action="updated the project portfolio" 
              date="Yesterday, 6:20 PM" 
              icon="edit"
            />
            <ActivityItem 
              user="Priya Sharma" 
              action="submitted a tender request" 
              date="Aug 23, 2023, 3:17 PM" 
              icon="file"
            />
            <ActivityItem 
              user="Admin" 
              action="sent email to 12 clients" 
              date="Aug 22, 2023, 10:05 AM" 
              icon="mail"
            />
          </div>
          <div className="mt-4 text-center">
            <a href="/admin/dashboard/activity" className="text-primary text-sm hover:underline">
              View all activity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease';
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        <div className="p-2 rounded-md bg-gray-50">{icon}</div>
      </div>
      <div className={`flex items-center mt-4 text-sm ${
        changeType === 'increase' ? 'text-green-600' : 'text-red-600'
      }`}>
        {changeType === 'increase' ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span>{change} from last month</span>
      </div>
    </div>
  );
};

interface RequestItemProps {
  company: string;
  type: string;
  date: string;
  status: 'new' | 'reviewed' | 'contacted' | 'completed';
}

const RequestItem = ({ company, type, date, status }: RequestItemProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'new':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>;
      case 'reviewed':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Reviewed</span>;
      case 'contacted':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Contacted</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Completed</span>;
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div>
        <p className="font-medium">{company}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{type}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
      {getStatusBadge()}
    </div>
  );
};

interface ActivityItemProps {
  user: string;
  action: string;
  date: string;
  icon: 'user' | 'edit' | 'file' | 'mail';
}

const ActivityItem = ({ user, action, date, icon }: ActivityItemProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'user':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'edit':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case 'file':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'mail':
        return (
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex items-start py-2 border-b last:border-b-0">
      {getIcon()}
      <div className="ml-3">
        <p>
          <span className="font-medium">{user}</span>{' '}
          <span className="text-gray-600">{action}</span>
        </p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default DashboardHome;