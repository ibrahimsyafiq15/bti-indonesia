const { query, pool } = require('./config/db');

async function setupDatabase() {
  try {
    console.log('Setting up database tables...\n');

    // Create articles table
    console.log('Creating articles table...');
    await query(`
      CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT,
        excerpt TEXT,
        category VARCHAR(100),
        author VARCHAR(100),
        featured_image VARCHAR(500),
        status ENUM('draft', 'published', 'unpublished') DEFAULT 'draft',
        views INT DEFAULT 0,
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ articles table ready\n');

    // Create article_tags table
    console.log('Creating article_tags table...');
    await query(`
      CREATE TABLE IF NOT EXISTS article_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        article_id INT NOT NULL,
        tag VARCHAR(50) NOT NULL,
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ article_tags table ready\n');

    // Create categories table
    console.log('Creating categories table...');
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        color VARCHAR(7) DEFAULT '#03D967',
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ categories table ready\n');

    // Insert default categories if not exists
    const [existingCategory] = await query('SELECT * FROM categories LIMIT 1');
    if (!existingCategory) {
      console.log('Inserting default categories...');
      const defaultCategories = [
        { name: 'Finance', slug: 'finance', color: '#03D967' },
        { name: 'Tourism', slug: 'tourism', color: '#00d4ff' },
        { name: 'Technology', slug: 'technology', color: '#f39c12' },
        { name: 'Fashion', slug: 'fashion', color: '#e74c3c' },
        { name: 'Food & Beverage', slug: 'food-beverage', color: '#9b59b6' },
        { name: 'Sustainability', slug: 'sustainability', color: '#2ecc71' },
        { name: 'E-commerce', slug: 'e-commerce', color: '#3498db' },
        { name: 'Human Resources', slug: 'human-resources', color: '#1abc9c' },
        { name: 'Market Research', slug: 'market-research', color: '#e67e22' }
      ];
      for (const cat of defaultCategories) {
        await query('INSERT INTO categories (name, slug, color) VALUES (?, ?, ?)', 
          [cat.name, cat.slug, cat.color]);
      }
      console.log('✅ Default categories inserted\n');
    }

    // Create subscriptions table
    console.log('Creating subscriptions table...');
    await query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP NULL
      )
    `);
    console.log('✅ subscriptions table ready\n');

    // Create company table
    console.log('Creating company table...');
    await query(`
      CREATE TABLE IF NOT EXISTS company (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        tagline TEXT,
        description TEXT,
        logo VARCHAR(500),
        footer_logo VARCHAR(500),
        email VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        social_media JSON,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ company table ready\n');

    // Create team_members table
    console.log('Creating team_members table...');
    await query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        profile_description TEXT,
        linkedin_profile VARCHAR(500),
        photo VARCHAR(500),
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ team_members table ready\n');

    // Create team_expertise table
    console.log('Creating team_expertise table...');
    await query(`
      CREATE TABLE IF NOT EXISTS team_expertise (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        expertise VARCHAR(100) NOT NULL,
        FOREIGN KEY (team_id) REFERENCES team_members(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ team_expertise table ready\n');

    // Create team_credentials table
    console.log('Creating team_credentials table...');
    await query(`
      CREATE TABLE IF NOT EXISTS team_credentials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        icon VARCHAR(50) DEFAULT 'fas fa-check',
        label VARCHAR(100) NOT NULL,
        FOREIGN KEY (team_id) REFERENCES team_members(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ team_credentials table ready\n');

    // Insert default company data if not exists
    const [existingCompany] = await query('SELECT * FROM company LIMIT 1');
    if (!existingCompany) {
      console.log('Inserting default company data...');
      await query(`
        INSERT INTO company (name, tagline, description, email, phone, address, social_media)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        'Barakah Talenta Inspirasi',
        'Strategic Partner for Muslim Consumer Ecosystem',
        'BTI is a trusted strategic partner enabling organizations to make confident and impactful business decisions.',
        'info@bti.id',
        '+62 812-3456-7890',
        'Jakarta, Indonesia',
        JSON.stringify({
          linkedin: 'https://linkedin.com/company/bti',
          instagram: 'https://instagram.com/bti',
          twitter: 'https://twitter.com/bti'
        })
      ]);
      console.log('✅ Default company data inserted\n');
    }

    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
