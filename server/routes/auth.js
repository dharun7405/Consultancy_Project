import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import mongoose from 'mongoose';


const authRoutes = express.Router();

// Login route
authRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1)
      {
      return res.status(503).json({ message: 'Database connection is not available' });
    }
    
    // Check if email matches admin email from env
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches admin password from env
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
      // Find or create admin user with timeout
      let user = await Promise.race([
        User.findOne({ email }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database operation timed out')), 30000)
        )
      ]);
      
      if (!user) {
        user = new User({
          username: 'admin',
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'admin'
        });
        await user.save();
      }
      
      // Update last login time
      user.lastLogin = new Date();
      await user.save();
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Remove password from response
      const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      res.status(200).json({
        token,
        user: userResponse
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return res.status(503).json({ 
        message: 'Database operation failed',
        details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get current user route
authRoutes.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default authRoutes;