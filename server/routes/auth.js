const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// Update profile (demo - in production with real DB)
router.put('/profile', async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    
    console.log('[Auth API] Profile update request:', { name, email });
    
    // In a real app, verify JWT token and get user ID
    // For demo, we'll just return success with updated user
    
    // Validate inputs
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    // If changing password, verify current password
    if (newPassword && currentPassword !== 'admin123') {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Return updated user
    const updatedUser = {
      email: email,
      name: name,
      role: 'admin'
    };
    
    console.log('[Auth API] Profile updated successfully:', updatedUser);
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('[Auth API] Error updating profile:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
