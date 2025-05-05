import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Download, Mail, Check, X, AlertCircle, Eye } from 'lucide-react';
import { format } from 'date-fns';
import TenderRequestDetail from './TenderRequestDetail';

interface TenderRequest {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget: string;
  preferredTimeline: string;
  projectDescription: string;
  status: 'new' | 'reviewed' | 'contacted' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const TenderRequests = () => {
  return (
    <Routes>
      <Route index element={<TenderRequestsList />} />
      <Route path=":id" element={<TenderRequestDetail />} />
    </Routes>
  );
};

const TenderRequestsList = () => {
  const [requests, setRequests] = useState<TenderRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<TenderRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get('/api/admin/tender-requests');
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error('Error fetching tender requests:', error);
        // Mock data for demo
        const mockData: TenderRequest[] = [
          {
            _id: '1',
            companyName: 'TechSpace Developers',
            contactPerson: 'Rajesh Kumar',
            email: 'rajesh@techspace.com',
            phone: '+91 98765 43210',
            projectType: 'Commercial Construction',
            projectLocation: 'Bangalore, Karnataka',
            estimatedBudget: '₹1 Crore - ₹5 Crores',
            preferredTimeline: '6-12 months',
            projectDescription: 'We are looking to build a new office complex with modern amenities and eco-friendly design. The project requires expert planning and execution.',
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '2',
            companyName: 'Urban Living Developers',
            contactPerson: 'Priya Sharma',
            email: 'priya@urbanlivingdev.com',
            phone: '+91 87654 32109',
            projectType: 'Residential Project',
            projectLocation: 'Hyderabad, Telangana',
            estimatedBudget: '₹5 Crores - ₹20 Crores',
            preferredTimeline: '1-2 years',
            projectDescription: 'Planning to develop a residential township with 500 units. Need comprehensive infrastructure and planning services.',
            status: 'reviewed',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '3',
            companyName: 'Chennai Metro Rail Corporation',
            contactPerson: 'Venkat Rao',
            email: 'venkat@chennaimetro.gov.in',
            phone: '+91 76543 21098',
            projectType: 'Infrastructure Development',
            projectLocation: 'Chennai, Tamil Nadu',
            estimatedBudget: 'Above ₹20 Crores',
            preferredTimeline: 'More than 2 years',
            projectDescription: 'Extension of metro rail line by 12 kilometers with 8 new stations. Requiring extensive planning, design and construction expertise.',
            status: 'contacted',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            updatedAt: new Date(Date.now() - 172800000).toISOString()
          },
          {
            _id: '4',
            companyName: 'National Highways Authority of India',
            contactPerson: 'Amitabh Singh',
            email: 'amitabh@nhai.gov.in',
            phone: '+91 65432 10987',
            projectType: 'Infrastructure Development',
            projectLocation: 'Mumbai-Pune Expressway',
            estimatedBudget: 'Above ₹20 Crores',
            preferredTimeline: '1-2 years',
            projectDescription: 'Widening and reconstruction of 45 kilometers of national highway, including 3 new bridges and 5 interchanges to reduce congestion.',
            status: 'completed',
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            updatedAt: new Date(Date.now() - 259200000).toISOString()
          },
          {
            _id: '5',
            companyName: 'GreenPath Innovations',
            contactPerson: 'Amit Patel',
            email: 'amit@greenpath.com',
            phone: '+91 54321 09876',
            projectType: 'Industrial Construction',
            projectLocation: 'Coimbatore, Tamil Nadu',
            estimatedBudget: '₹5 Crores - ₹20 Crores',
            preferredTimeline: '6-12 months',
            projectDescription: 'Construction of eco-friendly manufacturing plant with solar power integration and sustainable water management systems.',
            status: 'rejected',
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            updatedAt: new Date(Date.now() - 345600000).toISOString()
          }
        ];
        setRequests(mockData);
        setFilteredRequests(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter criteria change
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(request => 
        request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.projectLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    if (projectTypeFilter !== 'all') {
      filtered = filtered.filter(request => request.projectType === projectTypeFilter);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, projectTypeFilter, requests]);

  const getUniqueProjectTypes = () => {
    const types = requests.map(request => request.projectType);
    return ['all', ...new Set(types)];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>;
      case 'reviewed':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Reviewed</span>;
      case 'contacted':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Contacted</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Completed</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Rejected</span>;
      default:
        return null;
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    
    try {
      // In a real app, we would call an API endpoint to generate and download the CSV
      // For demo purposes, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Export feature would download a CSV file with the filtered tender requests.');
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
          <h1 className="text-2xl font-bold text-gray-800">Tender Requests</h1>
          <p className="text-gray-600">Manage and track all tender requests from clients</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={toggleFilters}
            className="btn-secondary flex items-center"
          >
            <Filter size={16} className="mr-1" />
            Filters
          </button>
          <button 
            onClick={handleExportCSV}
            className="btn-secondary flex items-center"
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <Download size={16} className="mr-1" />
                Export
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by company, contact person, or location..."
              className="bg-transparent border-none outline-none placeholder-gray-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="input-field"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  className="input-field"
                  value={projectTypeFilter}
                  onChange={(e) => setProjectTypeFilter(e.target.value)}
                >
                  {getUniqueProjectTypes().map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Project Types' : type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setProjectTypeFilter('all');
                    setSearchTerm('');
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{request.companyName}</div>
                      <div className="text-sm text-gray-500">{request.contactPerson}</div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{request.projectType}</div>
                      <div className="text-sm text-gray-500">{request.projectLocation}</div>
                      <div className="text-sm text-gray-500">Timeline: {request.preferredTimeline}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.estimatedBudget}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(request.createdAt), 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(request.createdAt), 'h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a 
                          href={`/admin/dashboard/tender-requests/${request._id}`} 
                          className="text-primary hover:text-primary-dark"
                          title="View details"
                        >
                          <Eye size={18} />
                        </a>
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          title="Send email"
                        >
                          <Mail size={18} />
                        </button>
                        {request.status === 'new' && (
                          <>
                            <button 
                              className="text-green-600 hover:text-green-800"
                              title="Mark as reviewed"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center py-6">
                      <AlertCircle size={24} className="text-gray-400 mb-2" />
                      <p className="text-gray-500 text-lg">No tender requests found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderRequests;