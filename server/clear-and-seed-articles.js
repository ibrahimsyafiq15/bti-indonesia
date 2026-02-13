const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { query, transaction } = require('./config/db');

// Pexels API key - free tier
const PEXELS_API_KEY = '563492ad6f9170000100000123a8e5a6c2584822b364c8bfa0a7e2c5'; // Public demo key

// Uploads directory
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 10 Dummy articles data
const articlesData = [
  {
    title: 'The Future of Islamic Finance in Southeast Asia',
    excerpt: 'Exploring the rapid growth of Shariah-compliant financial services and their impact on the regional economy.',
    category: 'Finance',
    author: 'Ahmad Fauzi',
    status: 'published',
    tags: ['Islamic Finance', 'Southeast Asia', 'Banking', 'Economy'],
    pexelsQuery: 'islamic finance banking'
  },
  {
    title: 'Halal Tourism: A Growing Market Opportunity',
    excerpt: 'Understanding the potential of Muslim-friendly travel services and how businesses can tap into this lucrative market.',
    category: 'Tourism',
    author: 'Sarah Abdullah',
    status: 'published',
    tags: ['Halal Tourism', 'Travel', 'Hospitality', 'Market Research'],
    pexelsQuery: 'travel muslim mosque'
  },
  {
    title: 'Digital Transformation in Muslim Consumer Markets',
    excerpt: 'How technology is reshaping the way Muslim consumers shop, interact, and make purchasing decisions.',
    category: 'Technology',
    author: 'Budi Santoso',
    status: 'published',
    tags: ['Digital', 'E-commerce', 'Innovation', 'Consumer Behavior'],
    pexelsQuery: 'technology digital business'
  },
  {
    title: 'The Rise of Modest Fashion Industry',
    excerpt: 'Analyzing the global modest fashion market trends and opportunities for brands and designers.',
    category: 'Fashion',
    author: 'Dewi Kusuma',
    status: 'published',
    tags: ['Modest Fashion', 'Lifestyle', 'Retail', 'Global Market'],
    pexelsQuery: 'fashion modest clothing'
  },
  {
    title: 'Halal Food Industry: Standards and Opportunities',
    excerpt: 'A comprehensive look at halal certification processes and the expanding global halal food market.',
    category: 'Food & Beverage',
    author: 'Muhammad Rizal',
    status: 'published',
    tags: ['Halal Food', 'Certification', 'F&B', 'Supply Chain'],
    pexelsQuery: 'halal food cuisine'
  },
  {
    title: 'Islamic Fintech: Innovation in Compliance',
    excerpt: 'Exploring how financial technology companies are adapting to Shariah principles while driving innovation.',
    category: 'Finance',
    author: 'Ahmad Fauzi',
    status: 'published',
    tags: ['Fintech', 'Islamic Finance', 'Innovation', 'Startups'],
    pexelsQuery: 'fintech digital payment'
  },
  {
    title: 'Building Inclusive Workplaces for Muslim Employees',
    excerpt: 'Best practices for creating workplace environments that respect Islamic values and practices.',
    category: 'Human Resources',
    author: 'Fatima Zahra',
    status: 'published',
    tags: ['HR', 'Workplace', 'Diversity', 'Inclusion'],
    pexelsQuery: 'office workspace diverse'
  },
  {
    title: 'The Muslim Millennial Consumer Profile',
    excerpt: 'Deep dive into the preferences, behaviors, and aspirations of young Muslim consumers.',
    category: 'Market Research',
    author: 'Sarah Abdullah',
    status: 'published',
    tags: ['Millennial', 'Consumer Research', 'Demographics', 'Trends'],
    pexelsQuery: 'young people lifestyle'
  },
  {
    title: 'Sustainable Business Practices in Islamic Context',
    excerpt: 'How Islamic principles align with modern sustainability goals and ESG frameworks.',
    category: 'Sustainability',
    author: 'Budi Santoso',
    status: 'published',
    tags: ['Sustainability', 'ESG', 'Green Business', 'Ethics'],
    pexelsQuery: 'sustainability green business'
  },
  {
    title: 'E-commerce Strategies for Ramadan Season',
    excerpt: 'Maximizing sales and engagement during the holy month with targeted marketing approaches.',
    category: 'E-commerce',
    author: 'Dewi Kusuma',
    status: 'published',
    tags: ['Ramadan', 'E-commerce', 'Marketing', 'Strategy'],
    pexelsQuery: 'ramadan lantern celebration'
  }
];

// Generate dummy content
function generateContent(title) {
  return `
    <h2>Introduction</h2>
    <p>The landscape of ${title.toLowerCase()} has undergone significant transformation in recent years. As markets evolve and consumer preferences shift, businesses must adapt their strategies to remain competitive and relevant.</p>
    
    <h2>Market Overview</h2>
    <p>Current market research indicates substantial growth potential in this sector. With increasing awareness and demand, companies that position themselves strategically stand to capture significant market share. The global market size is projected to reach unprecedented levels within the next five years.</p>
    
    <blockquote>
      "Understanding consumer behavior and market dynamics is crucial for success in today's competitive environment."
    </blockquote>
    
    <h2>Key Trends and Opportunities</h2>
    <p>Several key trends are shaping the industry:</p>
    <ul>
      <li><strong>Digital Transformation:</strong> Technology adoption is accelerating across all segments</li>
      <li><strong>Consumer Centricity:</strong> Personalization and customer experience are paramount</li>
      <li><strong>Sustainability Focus:</strong> Environmental and social considerations drive purchasing decisions</li>
      <li><strong>Regulatory Evolution:</strong> Compliance requirements continue to evolve</li>
    </ul>
    
    <h2>Strategic Recommendations</h2>
    <p>Based on our analysis, we recommend the following strategic approaches:</p>
    <ol>
      <li>Invest in market research to understand consumer segments deeply</li>
      <li>Develop agile business models that can adapt to changing conditions</li>
      <li>Build strong partnerships across the value chain</li>
      <li>Leverage technology to enhance operational efficiency</li>
      <li>Prioritize compliance and quality assurance</li>
    </ol>
    
    <h2>Conclusion</h2>
    <p>The future of ${title.toLowerCase()} looks promising for organizations that embrace innovation while maintaining strong ethical foundations. By staying attuned to market signals and consumer needs, businesses can build sustainable competitive advantages in this dynamic landscape.</p>
    
    <p><em>For more insights on this topic and other industry analyses, subscribe to BTI Insights or contact our team for customized research solutions.</em></p>
  `;
}

// Download image from URL
async function downloadImage(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000
    });
    
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on('finish', () => resolve(filepath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Download error:', error.message);
    throw error;
  }
}

// Fetch image from Pexels
async function fetchPexelsImage(query) {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        'Authorization': PEXELS_API_KEY
      },
      params: {
        query,
        per_page: 1,
        orientation: 'landscape'
      },
      timeout: 30000
    });
    
    if (response.data.photos && response.data.photos.length > 0) {
      return response.data.photos[0].src.landscape;
    }
    return null;
  } catch (error) {
    console.error('Pexels API error:', error.message);
    return null;
  }
}

// Generate placeholder image URL (fallback)
function getPlaceholderImage(index) {
  // Using picsum for reliable placeholder images
  return `https://picsum.photos/seed/article${index}/800/450.jpg`;
}

// Clear all articles
async function clearArticles() {
  console.log('Clearing all articles...');
  await query('DELETE FROM article_tags');
  await query('DELETE FROM articles');
  console.log('✅ All articles cleared');
}

// Create single article with image
async function createArticle(articleData, index) {
  try {
    console.log(`\n[${index + 1}/10] Creating: ${articleData.title}`);
    
    // Try to get image from Pexels first
    let imageUrl = await fetchPexelsImage(articleData.pexelsQuery);
    
    // Fallback to picsum if Pexels fails
    if (!imageUrl) {
      console.log('  Using fallback image source...');
      imageUrl = getPlaceholderImage(index);
    }
    
    // Download image
    const filename = `${uuidv4()}.jpg`;
    const filepath = path.join(UPLOADS_DIR, filename);
    
    console.log(`  Downloading image...`);
    await downloadImage(imageUrl, filepath);
    console.log(`  ✅ Image saved: ${filename}`);
    
    // Create slug
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Insert article
    const result = await transaction(async (conn) => {
      const [articleResult] = await conn.execute(
        `INSERT INTO articles (title, slug, content, excerpt, category, author, featured_image, status, published_at, views) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          articleData.title,
          slug,
          generateContent(articleData.title),
          articleData.excerpt,
          articleData.category,
          articleData.author,
          `/uploads/${filename}`,
          articleData.status,
          new Date(),
          Math.floor(Math.random() * 500) + 50 // Random views 50-550
        ]
      );
      
      const articleId = articleResult.insertId;
      
      // Insert tags
      for (const tag of articleData.tags) {
        await conn.execute(
          'INSERT INTO article_tags (article_id, tag) VALUES (?, ?)',
          [articleId, tag]
        );
      }
      
      return articleId;
    });
    
    console.log(`  ✅ Article created with ID: ${result}`);
    return result;
    
  } catch (error) {
    console.error(`  ❌ Error creating article:`, error.message);
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log('========================================');
    console.log('   BTI Articles Seeder with Images');
    console.log('========================================\n');
    
    // Clear existing articles
    await clearArticles();
    
    // Create 10 articles
    console.log('\nCreating 10 new articles with featured images...\n');
    
    for (let i = 0; i < articlesData.length; i++) {
      await createArticle(articlesData[i], i);
    }
    
    console.log('\n========================================');
    console.log('   ✅ All 10 articles created!');
    console.log('========================================\n');
    
    // Summary
    const [count] = await query('SELECT COUNT(*) as total FROM articles');
    console.log(`Total articles in database: ${count.total}`);
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
