const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// Subscribe (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name, source } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const [existing] = await query('SELECT * FROM subscriptions WHERE email = ?', [email]);
    
    if (existing) {
      if (existing.is_active) {
        return res.status(400).json({ message: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        await query(
          'UPDATE subscriptions SET is_active = TRUE, updated_at = NOW() WHERE id = ?',
          [existing.id]
        );
        return res.json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Insert new subscription
    await query(
      'INSERT INTO subscriptions (email, name, source, is_active, subscribed_at) VALUES (?, ?, ?, TRUE, NOW())',
      [email, name || '', source || 'website']
    );

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Unsubscribe (public)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const [subscription] = await query('SELECT * FROM subscriptions WHERE email = ?', [email]);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await query(
      'UPDATE subscriptions SET is_active = FALSE, updated_at = NOW() WHERE id = ?',
      [subscription.id]
    );

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all subscriptions (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, isActive } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (isActive !== undefined) {
      whereClause = 'WHERE is_active = ?';
      params.push(isActive === 'true' ? 1 : 0);
    }

    const subscriptions = await query(
      `SELECT * FROM subscriptions ${whereClause} ORDER BY subscribed_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await query(
      `SELECT COUNT(*) as total FROM subscriptions ${whereClause}`,
      params
    );

    res.json({
      subscriptions,
      totalPages: Math.ceil(countResult.total / limit),
      currentPage: parseInt(page),
      total: countResult.total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete subscription
router.delete('/:id', async (req, res) => {
  try {
    const [subscription] = await query('SELECT * FROM subscriptions WHERE id = ?', [req.params.id]);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await query('DELETE FROM subscriptions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export subscriptions (CSV)
router.get('/export/csv', async (req, res) => {
  try {
    const subscriptions = await query('SELECT * FROM subscriptions WHERE is_active = TRUE ORDER BY subscribed_at DESC');

    let csv = 'Email,Name,Subscribed Date\n';
    subscriptions.forEach(sub => {
      csv += `"${sub.email}","${sub.name || ''}","${sub.subscribed_at}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
