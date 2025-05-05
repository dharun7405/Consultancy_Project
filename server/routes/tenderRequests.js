import express from 'express';
import TenderRequest from '../models/TenderRequest.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

import { 
  sendTenderRequestEmailToAdmin, 
  sendTenderRequestEmailToCustomer 
} from '../utils/emailService.js';

const tenderRoutes = express.Router();

// Create new tender request
tenderRoutes.post('/', async (req, res) => {
  console.log('POST /api/tender-requests hit');  // ✅ Step 1: Confirm the route is triggered
  console.log('Request Body:', req.body)
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      projectType,
      projectLocation,
      estimatedBudget,
      preferredTimeline,
      projectDescription
    } = req.body;
    
    const newTenderRequest = new TenderRequest({
      companyName,
      contactPerson,
      email,
      phone,
      projectType,
      projectLocation,
      estimatedBudget,
      preferredTimeline,
      projectDescription
    });
    
    const savedRequest = await newTenderRequest.save();
       // ✅ Add this block after saving to DB
       try {
        await sendTenderRequestEmailToAdmin(savedRequest);
        await sendTenderRequestEmailToCustomer(savedRequest);
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Continue even if email fails
      }

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Create tender request error:', error);
    res.status(500).json({ 
       error: 'Something went wrong'
    });
  }
});



// Get tender request by ID (admin only)
tenderRoutes.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const request = await TenderRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Tender request not found' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Get tender request error:', error);
    res.status(500).json({ message: 'Failed to retrieve tender request' });
  }
});

// Update tender request status (admin only)
tenderRoutes.patch('/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'reviewed', 'contacted', 'completed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const request = await TenderRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Tender request not found' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Update tender request status error:', error);
    res.status(500).json({ message: 'Failed to update tender request status' });
  }
});

// Add note to tender request (admin only)
tenderRoutes.post('/:id/notes', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Note content is required' });
    }
    
    const request = await TenderRequest.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          notes: {
            content,
            createdBy: req.user.id,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Tender request not found' });
    }
    
    res.status(200).json(request);
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Failed to add note' });
  }
});



export default tenderRoutes;
