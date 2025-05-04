import { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Calendar, Download } from 'lucide-react';

// Register Chart.js components
Chart.register(...registerables);

const WebsiteAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: [],
    visitors: [],
    sources: [],
    devices: [],
    popularPages: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, we would call an API with the time range
        // const { data } = await axios.get(`/api/admin/analytics?range=${timeRange}`);
        
        // For demo purposes, generate mock data
        setAnalyticsData({
          pageViews: generatePageViewsData(),
          visitors: generateVisitorsData(),
          sources: generateSourcesData(),
          devices: generateDevicesData(),
          popularPages: generatePopularPagesData()
        });
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeRange]);

  // Mock data generators
  const generatePageViewsData = () => {
    const labels = timeRange === '7days' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Page Views',
          data: labels.map(() => Math.floor(Math.random() * 500) + 100),
          borderColor: '#1e40af',
          backgroundColor: 'rgba(30, 64, 175, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const generateVisitorsData = () => {
    const labels = timeRange === '7days' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Unique Visitors',
          data: labels.map(() => Math.floor(Math.random() * 200) + 50),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'New Visitors',
          data: labels.map(() => Math.floor(Math.random() * 100) + 20),
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const generateSourcesData = () => {
    return {
      labels: ['Direct', 'Google', 'Social Media', 'Referral', 'Email'],
      datasets: [
        {
          data: [35, 30, 15, 10, 10],
          backgroundColor: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
          borderWidth: 0
        }
      ]
    };
  };

  const generateDevicesData = () => {
    return {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [
        {
          data: [55, 35, 10],
          backgroundColor: ['#1e40af', '#3b82f6', '#60a5fa'],
          borderWidth: 0
        }
      ]
    };
  };

  const generatePopularPagesData = () => {
    return {
      labels: ['Home', 'Projects', 'Request Tender', 'About Us', 'Contact'],
      datasets: [
        {
          label: 'Page Views',
          data: [450, 320, 280, 190, 150],
          backgroundColor: '#3b82f6'
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Website Analytics</h1>
          <p className="text-gray-600">Monitor website traffic and user engagement</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Calendar size={16} />
            </div>
          </div>
          <button 
            className="btn-secondary flex items-center"
          >
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Page Views" 
          value="12,458" 
          change="+14.2%" 
          changeType="increase" 
          period={timeRange === '7days' ? '7 days' : '30 days'}
        />
        <StatCard 
          title="Unique Visitors" 
          value="3,286" 
          change="+7.1%" 
          changeType="increase" 
          period={timeRange === '7days' ? '7 days' : '30 days'}
        />
        <StatCard 
          title="Avg. Session Duration" 
          value="3m 24s" 
          change="-1.2%" 
          changeType="decrease" 
          period={timeRange === '7days' ? '7 days' : '30 days'}
        />
        <StatCard 
          title="Bounce Rate" 
          value="42.3%" 
          change="-3.8%" 
          changeType="increase" 
          period={timeRange === '7days' ? '7 days' : '30 days'}
        />
      </div>

      {/* Page Views Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Page Views</h2>
          <div className="h-80">
            <Line 
              data={analyticsData.pageViews} 
              options={chartOptions} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Visitors</h2>
          <div className="h-80">
            <Line 
              data={analyticsData.visitors} 
              options={chartOptions} 
            />
          </div>
        </div>
      </div>

      {/* Traffic Sources and Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
          <div className="h-64">
            <Pie 
              data={analyticsData.sources} 
              options={pieOptions} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Device Distribution</h2>
          <div className="h-64">
            <Pie 
              data={analyticsData.devices} 
              options={pieOptions} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
          <div className="h-64">
            <Bar 
              data={analyticsData.popularPages} 
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
              }} 
            />
          </div>
        </div>
      </div>

      {/* User Behavior */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">User Behavior Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Visitor Engagement</h3>
            <p className="text-gray-600 mb-4">
              Users are spending more time on the "Project Portfolio" page compared to last month, 
              with an average session duration increase of 18%. The "Request a Tender" page has a 
              lower bounce rate than other pages at 28%, indicating high user interest.
            </p>
            
            <h3 className="font-medium mb-2">Conversion Paths</h3>
            <p className="text-gray-600">
              Most users who submit tender requests visit the Projects and Services pages first. 
              Visitors from Google search are 2.5x more likely to submit a request than those from 
              social media sources.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Growth Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Mobile traffic has increased by 23% but has a higher bounce rate than desktop. 
              Optimizing the mobile experience could improve conversion rates significantly.
            </p>
            
            <h3 className="font-medium mb-2">Content Performance</h3>
            <p className="text-gray-600">
              Case studies and project details pages have the highest engagement. Consider adding 
              more detailed project information and success stories to increase user interest and 
              time on site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  period: string;
}

const StatCard = ({ title, value, change, changeType, period }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <div className={`flex items-center mt-4 text-sm ${
        changeType === 'increase' 
          ? change.includes('-') ? 'text-red-600' : 'text-green-600'
          : change.includes('-') ? 'text-green-600' : 'text-red-600'
      }`}>
        {changeType === 'increase' && !change.includes('-') ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span>{change} from previous {period}</span>
      </div>
    </div>
  );
};

export default WebsiteAnalytics;