const express = require('express');
const router = express.Router();
const { query, transaction } = require('../config/db');
const slugify = require('slugify');

// Get all categories (public)
router.get('/public', async (req, res) => {
  try {
    const categories = await query(
      'SELECT * FROM categories WHERE is_active = TRUE ORDER BY sort_order ASC, name ASC'
    );
    res.json(categories);
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all categories (admin)
router.get('/', async (req, res) => {
  try {
    const categories = await query(
      'SELECT * FROM categories ORDER BY sort_order ASC, name ASC'
    );
    for (const category of categories) {
      const [countResult] = await query(
        'SELECT COUNT(*) as count FROM articles WHERE category = ?',
        [category.name]
      );
      category.articleCount = countResult.count;
    }
    res.json(categories);
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const [category] = await query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const [countResult] = await query(
      'SELECT COUNT(*) as count FROM articles WHERE category = ?',
      [category.name]
    );
    category.articleCount = countResult.count;
    res.json(category);
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    const { name, description, color, sort_order } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const slug = slugify(name, { lower: true, strict: true });
    const [existing] = await query(
      'SELECT * FROM categories WHERE name = ? OR slug = ?',
      [name, slug]
    );
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const result = await query(
      'INSERT INTO categories (name, slug, description, color, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, slug, description || null, color || '#03D967', sort_order || 0]
    );
    const [newCategory] = await query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    console.log('[Categories API] Created:', newCategory.name);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { name, description, color, is_active, sort_order } = req.body;
    const [existing] = await query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    let updates = [];
    let params = [];

    if (name !== undefined) {
      const slug = slugify(name, { lower: true, strict: true });
      const [conflict] = await query(
        'SELECT * FROM categories WHERE (name = ? OR slug = ?) AND id != ?',
        [name, slug, req.params.id]
      );
      if (conflict) {
        return res.status(400).json({ message: 'Category already exists' });
      }
      updates.push('name = ?', 'slug = ?');
      params.push(name, slug);
    }

    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description);
    }
    if (color !== undefined) {
      updates.push('color = ?');
      params.push(color);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(is_active);
    }
    if (sort_order !== undefined) {
      updates.push('sort_order = ?');
      params.push(sort_order);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(req.params.id);
    await query(`UPDATE categories SET ${updates.join(', ')} WHERE id = ?`, params);

    if (name !== undefined && name !== existing.name) {
      await query('UPDATE articles SET category = ? WHERE category = ?', [name, existing.name]);
    }

    const [updated] = await query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    console.log('[Categories API] Updated:', updated.name);
    res.json(updated);
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const [countResult] = await query(
      'SELECT COUNT(*) as count FROM articles WHERE category = ?',
      [existing.name]
    );
    if (countResult.count > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category used by ${countResult.count} article(s)` 
      });
    }
    await query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    console.log('[Categories API] Deleted:', existing.name);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('[Categories API] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;