const express = require('express');
const router = express.Router();
const { query, transaction } = require('../config/db');
const upload = require('../middleware/upload');

// Get all team members (public)
router.get('/public', async (req, res) => {
  try {
    const members = await query(
      'SELECT * FROM team_members WHERE is_active = TRUE ORDER BY sort_order ASC, created_at ASC'
    );

    // Get expertise and credentials for each member
    for (const member of members) {
      const expertise = await query('SELECT expertise FROM team_expertise WHERE team_id = ?', [member.id]);
      member.expertise = expertise.map(e => e.expertise);

      const credentials = await query('SELECT icon, label FROM team_credentials WHERE team_id = ?', [member.id]);
      member.credentials = credentials;
    }

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all team members (admin)
router.get('/', async (req, res) => {
  try {
    const members = await query('SELECT * FROM team_members ORDER BY sort_order ASC, created_at ASC');

    for (const member of members) {
      const expertise = await query('SELECT expertise FROM team_expertise WHERE team_id = ?', [member.id]);
      member.expertise = expertise.map(e => e.expertise);

      const credentials = await query('SELECT icon, label FROM team_credentials WHERE team_id = ?', [member.id]);
      member.credentials = credentials;
    }

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const [member] = await query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    const expertise = await query('SELECT expertise FROM team_expertise WHERE team_id = ?', [member.id]);
    member.expertise = expertise.map(e => e.expertise);

    const credentials = await query('SELECT icon, label FROM team_credentials WHERE team_id = ?', [member.id]);
    member.credentials = credentials;

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create team member
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, title, profileDescription, linkedinProfile, isActive, sort_order } = req.body;
    const expertise = req.body.expertise ? JSON.parse(req.body.expertise) : [];
    const credentials = req.body.credentials ? JSON.parse(req.body.credentials) : [];
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await transaction(async (conn) => {
      // Insert member
      const [memberResult] = await conn.execute(
        `INSERT INTO team_members (name, title, profile_description, linkedin_profile, photo, sort_order, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, title, profileDescription, linkedinProfile || null, photo, sort_order || 0, isActive === 'true']
      );

      const memberId = memberResult.insertId;

      // Insert expertise
      if (expertise.length > 0) {
        for (const exp of expertise) {
          await conn.execute(
            'INSERT INTO team_expertise (team_id, expertise) VALUES (?, ?)',
            [memberId, exp]
          );
        }
      }

      // Insert credentials
      if (credentials.length > 0) {
        for (const cred of credentials) {
          await conn.execute(
            'INSERT INTO team_credentials (team_id, icon, label) VALUES (?, ?, ?)',
            [memberId, cred.icon || 'fas fa-check', cred.label]
          );
        }
      }

      return memberId;
    });

    const [newMember] = await query('SELECT * FROM team_members WHERE id = ?', [result]);
    newMember.expertise = expertise;
    newMember.credentials = credentials;

    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update team member
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, title, profileDescription, linkedinProfile, isActive, sort_order } = req.body;
    const expertise = req.body.expertise ? JSON.parse(req.body.expertise) : [];
    const credentials = req.body.credentials ? JSON.parse(req.body.credentials) : [];
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if member exists
    const [existing] = await query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await transaction(async (conn) => {
      // Update member
      let updateSql = `UPDATE team_members SET name = ?, title = ?, profile_description = ?, 
                       linkedin_profile = ?, sort_order = ?, is_active = ?`;
      let params = [name, title, profileDescription, linkedinProfile || null, sort_order || 0, isActive === 'true' || isActive === true];

      if (photo) {
        updateSql += `, photo = ?`;
        params.push(photo);
      }

      updateSql += ` WHERE id = ?`;
      params.push(req.params.id);

      await conn.execute(updateSql, params);

      // Delete old expertise
      await conn.execute('DELETE FROM team_expertise WHERE team_id = ?', [req.params.id]);

      // Insert new expertise
      if (expertise.length > 0) {
        for (const exp of expertise) {
          await conn.execute(
            'INSERT INTO team_expertise (team_id, expertise) VALUES (?, ?)',
            [req.params.id, exp]
          );
        }
      }

      // Delete old credentials
      await conn.execute('DELETE FROM team_credentials WHERE team_id = ?', [req.params.id]);

      // Insert new credentials
      if (credentials.length > 0) {
        for (const cred of credentials) {
          await conn.execute(
            'INSERT INTO team_credentials (team_id, icon, label) VALUES (?, ?, ?)',
            [req.params.id, cred.icon || 'fas fa-check', cred.label]
          );
        }
      }
    });

    const [updated] = await query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    updated.expertise = expertise;
    updated.credentials = credentials;

    res.json(updated);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete team member
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
