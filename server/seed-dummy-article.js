const { query, transaction } = require('./config/db');

async function seedDummyArticle() {
  try {
    console.log('Seeding dummy article...');

    const dummyArticle = {
      title: 'Hello World - Welcome to BTI Insights',
      content: `
        <h2>Welcome to BTI Insights</h2>
        <p>This is a dummy article to demonstrate the article functionality. BTI (Barakah Talenta Inspirasi) is a trusted strategic partner enabling organizations to make confident and impactful business decisions.</p>
        <h3>Our Mission</h3>
        <p>We provide the right insights, shape the right products, and prepare the right talents for the growth of Indonesia's Muslim consumer ecosystem.</p>
        <h3>Our Services</h3>
        <ul>
          <li><strong>Meaningful Insight</strong> - Deep market research and data analytics</li>
          <li><strong>Strategic Advisory</strong> - Business transformation and strategic planning</li>
          <li><strong>Talent Capability</strong> - Leadership development and talent management</li>
        </ul>
        <p>Stay tuned for more insightful articles from our team of experts.</p>
      `,
      excerpt: 'Welcome to BTI Insights - your source for business strategy, market research, and industry perspectives.',
      category: 'General',
      author: 'BTI Team',
      status: 'published',
      tags: ['welcome', 'introduction', 'bti']
    };

    // Check if article already exists
    const [existing] = await query('SELECT * FROM articles WHERE slug = ?', ['hello-world-welcome-to-bti-insights']);
    
    if (existing) {
      console.log('Dummy article already exists, skipping...');
      return;
    }

    await transaction(async (conn) => {
      // Insert article
      const [articleResult] = await conn.execute(
        `INSERT INTO articles (title, slug, content, excerpt, category, author, featured_image, status, published_at, views) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          dummyArticle.title,
          'hello-world-welcome-to-bti-insights',
          dummyArticle.content,
          dummyArticle.excerpt,
          dummyArticle.category,
          dummyArticle.author,
          null,
          dummyArticle.status,
          new Date(),
          0
        ]
      );

      const articleId = articleResult.insertId;

      // Insert tags
      for (const tag of dummyArticle.tags) {
        await conn.execute(
          'INSERT INTO article_tags (article_id, tag) VALUES (?, ?)',
          [articleId, tag]
        );
      }

      console.log(`Dummy article created with ID: ${articleId}`);
    });

    console.log('Dummy article seeded successfully!');
  } catch (error) {
    console.error('Error seeding dummy article:', error);
  } finally {
    process.exit(0);
  }
}

seedDummyArticle();
