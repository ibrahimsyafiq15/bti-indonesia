const mysql = require('mysql2');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'bti_cms';

const setupDatabase = async () => {
  try {
    // Create connection without database
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('🔌 Connected to MySQL server');

    // Helper function to run query
    const runQuery = (sql) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });
    };

    // Create database if not exists (non-prepared statement)
    await runQuery(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database "${DB_NAME}" created/verified`);

    // Use database
    await runQuery(`USE ${DB_NAME}`);
    console.log(`✅ Using database "${DB_NAME}"`);

    // Create tables
    const tables = [
      // Articles table
      `CREATE TABLE IF NOT EXISTS articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        category VARCHAR(50) NOT NULL DEFAULT 'Insight',
        author VARCHAR(100) NOT NULL,
        featured_image VARCHAR(500),
        status ENUM('draft', 'published', 'unpublished') DEFAULT 'draft',
        views INT DEFAULT 0,
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_slug (slug),
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Article tags table
      `CREATE TABLE IF NOT EXISTS article_tags (
        id INT AUTO_INCREMENT PRIMARY KEY,
        article_id INT NOT NULL,
        tag VARCHAR(50) NOT NULL,
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        INDEX idx_tag (tag)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Team members table
      `CREATE TABLE IF NOT EXISTS team_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        title VARCHAR(100) NOT NULL,
        profile_description TEXT NOT NULL,
        linkedin_profile VARCHAR(255),
        photo VARCHAR(500),
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_active (is_active),
        INDEX idx_order (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Team expertise table
      `CREATE TABLE IF NOT EXISTS team_expertise (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        expertise VARCHAR(100) NOT NULL,
        FOREIGN KEY (team_id) REFERENCES team_members(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Team credentials table
      `CREATE TABLE IF NOT EXISTS team_credentials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        icon VARCHAR(50) DEFAULT 'fas fa-check',
        label VARCHAR(100) NOT NULL,
        FOREIGN KEY (team_id) REFERENCES team_members(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Company settings table
      `CREATE TABLE IF NOT EXISTS company_settings (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(100) DEFAULT 'Barakah Talenta Inspirasi',
        description TEXT,
        meta_description VARCHAR(160),
        address_street VARCHAR(255),
        address_city VARCHAR(100) DEFAULT 'Jakarta',
        address_country VARCHAR(100) DEFAULT 'Indonesia',
        address_full VARCHAR(255) DEFAULT 'Jakarta, Indonesia',
        contact_email VARCHAR(100) DEFAULT 'contact@bti.co.id',
        contact_phone VARCHAR(50) DEFAULT '+62 812 3456 7890',
        contact_whatsapp VARCHAR(50) DEFAULT '6281234567890',
        social_instagram VARCHAR(255),
        social_linkedin VARCHAR(255),
        social_youtube VARCHAR(255),
        social_tiktok VARCHAR(255),
        social_twitter VARCHAR(255),
        logo VARCHAR(500) DEFAULT '/logo.png',
        footer_logo VARCHAR(500) DEFAULT '/logo-footer.png',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

      // Subscriptions table
      `CREATE TABLE IF NOT EXISTS subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        source VARCHAR(50) DEFAULT 'website',
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
    ];

    for (const tableSql of tables) {
      await runQuery(tableSql);
    }
    console.log('✅ All tables created/verified');

    // Insert default company settings
    await runQuery(`
      INSERT IGNORE INTO company_settings (id, name, description) 
      VALUES (1, 'Barakah Talenta Inspirasi', 'A trusted strategic partner enabling organizations to make confident and impactful business.')
    `);
    console.log('✅ Default company settings inserted');

    console.log('\n🎉 Database setup completed successfully!');
    console.log(`📊 Database: ${DB_NAME}`);
    console.log('🚀 You can now start the server with: npm start\n');

    connection.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n📌 Troubleshooting:');
    console.log('   1. Pastikan MySQL server berjalan (Laragon/XAMPP)');
    console.log('   2. Cek username/password di file .env');
    console.log('   3. Pastikan port 3306 tidak digunakan aplikasi lain\n');
    process.exit(1);
  }
};

setupDatabase();
