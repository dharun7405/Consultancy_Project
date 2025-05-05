import express from 'express';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import TenderRequest from '../models/TenderRequest.js';
import User from '../models/User.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard/stats', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    // Get total requests and today's new requests
    const totalRequests = await TenderRequest.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newRequestsToday = await TenderRequest.countDocuments({
      createdAt: { $gte: today }
    });
    
    // Get total and active users
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    
    // Get monthly request counts for the last 12 months
    const requestsData = await getMonthlyRequestCounts();
    
    // Get project type distribution
    const projectTypesData = await getProjectTypeDistribution();
    
    res.status(200).json({
      totalRequests,
      newRequestsToday,
      totalUsers,
      activeUsers,
      requestsData,
      projectTypesData
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to retrieve dashboard statistics' });
  }
});

// Helper function to get monthly request counts
const getMonthlyRequestCounts = async () => {
  const months = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const targetMonth = today.getMonth() - i;
    const year = today.getFullYear() + Math.floor(targetMonth / 12);
    const month = (targetMonth % 12 + 12) % 12;
    
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    const count = await TenderRequest.countDocuments({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });
    
    months.push({
      month: monthNames[month],
      count
    });
  }
  
  return months;
};

// Helper function to get project type distribution
const getProjectTypeDistribution = async () => {
  const projectTypes = await TenderRequest.aggregate([
    {
      $group: {
        _id: '$projectType',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: '$count'
      }
    }
  ]);
  
  return projectTypes;
};

// Get tender requests with pagination and filters
router.get('/tender-requests', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { 
      status,
      projectType,
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      sortOrder = -1 
    } = req.query;
    
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (projectType && projectType !== 'all') {
      query.projectType = projectType;
    }
    
    const requests = await TenderRequest.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();
    
    const total = await TenderRequest.countDocuments(query);
    
    res.status(200).json({
      requests,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get tender requests error:', error);
    res.status(500).json({ message: 'Failed to retrieve tender requests' });
  }
});

export default router;