const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const { query, transaction } = require('../config/db');
const upload = require('../middleware/upload');

// Get all articles (public - only published)
router.get('/public', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE status = "published"';
    const params = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (tag) {
      whereClause += ' AND id IN (SELECT article_id FROM article_tags WHERE tag = ?)';
      params.push(tag);
    }

    // Get articles with tags
    const articles = await query(`
      SELECT * FROM articles 
      ${whereClause}
      ORDER BY published_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

    // Get tags for each article
    for (const article of articles) {
      const tags = await query('SELECT tag FROM article_tags WHERE article_id = ?', [article.id]);
      article.tags = tags.map(t => t.tag);
    }

    const [countResult] = await query(`SELECT COUNT(*) as total FROM articles ${whereClause}`, params);
    const total = countResult.total;

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single article by slug (public)
router.get('/public/:slug', async (req, res) => {
  try {
    const [article] = await query(
      'SELECT * FROM articles WHERE slug = ? AND status = "published"',
      [req.params.slug]
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Get tags
    const tags = await query('SELECT tag FROM article_tags WHERE article_id = ?', [article.id]);
    article.tags = tags.map(t => t.tag);

    // Increment views
    await query('UPDATE articles SET views = views + 1 WHERE id = ?', [article.id]);

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all articles (admin - all statuses)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    const params = [];

    if (status) {
      whereClause += 'WHERE status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += whereClause ? ' AND' : 'WHERE';
      whereClause += ' (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const articles = await query(`
      SELECT * FROM articles 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

    // Get tags for each article
    for (const article of articles) {
      const tags = await query('SELECT tag FROM article_tags WHERE article_id = ?', [article.id]);
      article.tags = tags.map(t => t.tag);
    }

    const [countResult] = await query(`SELECT COUNT(*) as total FROM articles ${whereClause}`, params);

    res.json({
      articles,
      totalPages: Math.ceil(countResult.total / limit),
      currentPage: parseInt(page),
      total: countResult.total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article by ID (admin)
router.get('/:id', async (req, res) => {
  try {
    const [article] = await query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const tags = await query('SELECT tag FROM article_tags WHERE article_id = ?', [article.id]);
    article.tags = tags.map(t => t.tag);

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article
router.post('/', upload.single('featuredImage'), async (req, res) => {
  try {
    const { title, content, excerpt, category, author, status } = req.body;
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const slug = slugify(title, { lower: true, strict: true });
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await transaction(async (conn) => {
      // Insert article
      const [articleResult] = await conn.execute(
        `INSERT INTO articles (title, slug, content, excerpt, category, author, featured_image, status, published_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, slug, content, excerpt || null, category, author, featuredImage, status, 
         status === 'published' ? new Date() : null]
      );

      const articleId = articleResult.insertId;

      // Insert tags
      if (tags.length > 0) {
        for (const tag of tags.slice(0, 10)) {
          await conn.execute(
            'INSERT INTO article_tags (article_id, tag) VALUES (?, ?)',
            [articleId, tag]
          );
        }
      }

      return articleId;
    });

    const [newArticle] = await query('SELECT * FROM articles WHERE id = ?', [result]);
    newArticle.tags = tags;
    
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update article
router.put('/:id', upload.single('featuredImage'), async (req, res) => {
  try {
    const { title, content, excerpt, category, author, status } = req.body;
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if article exists
    const [existing] = await query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const slug = title !== existing.title ? slugify(title, { lower: true, strict: true }) : existing.slug;

    await transaction(async (conn) => {
      // Update article
      let updateSql = `UPDATE articles SET title = ?, slug = ?, content = ?, excerpt = ?, 
                       category = ?, author = ?, status = ?`;
      let params = [title, slug, content, excerpt || null, category, author, status];

      if (featuredImage) {
        updateSql += `, featured_image = ?`;
        params.push(featuredImage);
      }

      if (status === 'published' && !existing.published_at) {
        updateSql += `, published_at = ?`;
        params.push(new Date());
      }

      updateSql += ` WHERE id = ?`;
      params.push(req.params.id);

      await conn.execute(updateSql, params);

      // Delete old tags
      await conn.execute('DELETE FROM article_tags WHERE article_id = ?', [req.params.id]);

      // Insert new tags
      if (tags.length > 0) {
        for (const tag of tags.slice(0, 10)) {
          await conn.execute(
            'INSERT INTO article_tags (article_id, tag) VALUES (?, ?)',
            [req.params.id, tag]
          );
        }
      }
    });

    const [updated] = await query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    updated.tags = tags;

    res.json(updated);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const results = await query('SELECT DISTINCT category FROM articles ORDER BY category');
    res.json(results.map(r => r.category));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tags
router.get('/meta/tags', async (req, res) => {
  try {
    const results = await query('SELECT DISTINCT tag FROM article_tags ORDER BY tag');
    res.json(results.map(r => r.tag));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
