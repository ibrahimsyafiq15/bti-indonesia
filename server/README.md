# BTI CMS Server (MySQL Version)

Backend API untuk BTI CMS menggunakan MySQL database.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Setup Database

Pastikan MySQL sudah berjalan (Laragon/XAMPP/WAMP sudah start MySQL).

Kemudian jalankan:

```bash
npm run db:setup
```

Script ini akan:
- Membuat database `bti_cms`
- Membuat semua tabel (articles, team_members, company_settings, subscriptions)
- Insert default company settings

### 3. Konfigurasi Environment

Edit file `.env` jika perlu:

```env
PORT=5000

# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bti_cms

JWT_SECRET=bti_cms_secret_key_2024
UPLOAD_PATH=./uploads
```

### 4. Jalankan Server

```bash
# Development mode dengan auto-reload
npm run dev

# Production mode
npm start
```

Server akan berjalan di: `http://localhost:5000`

---

## 📊 Database Schema

### Tables

1. **articles** - Artikel/insight
2. **article_tags** - Tags untuk artikel
3. **team_members** - Data tim
4. **team_expertise** - Keahlian tim
5. **team_credentials** - Kredensial tim
6. **company_settings** - Pengaturan perusahaan
7. **subscriptions** - Data subscriber

---

## 🔧 Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

Pastikan password MySQL benar di file `.env`:
```env
DB_PASSWORD=your_mysql_password
```

Jika menggunakan Laragon, defaultnya password kosong.

### Error: "Can't connect to MySQL server"

Pastikan MySQL service berjalan:
- **Laragon**: Klik "Start All"
- **XAMPP**: Start Apache dan MySQL
- **WAMP**: Start All Services

### Error: "Unknown database 'bti_cms'"

Jalankan setup database:
```bash
npm run db:setup
```

---

## 📁 API Endpoints

### Articles
- `GET /api/articles/public` - Get published articles
- `GET /api/articles/public/:slug` - Get single article
- `GET /api/articles` - Get all articles (admin)
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Team
- `GET /api/team/public` - Get active team members
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member

### Company
- `GET /api/company/public` - Get company settings
- `PUT /api/company` - Update company settings

### Subscriptions
- `POST /api/subscriptions/subscribe` - Subscribe
- `POST /api/subscriptions/unsubscribe` - Unsubscribe
- `GET /api/subscriptions` - Get all subscriptions
- `DELETE /api/subscriptions/:id` - Delete subscription
- `GET /api/subscriptions/export/csv` - Export CSV

---

## 🗃️ Database Structure

```sql
-- Articles
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content LONGTEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL,
  featured_image VARCHAR(500),
  status ENUM('draft', 'published', 'unpublished') DEFAULT 'draft',
  views INT DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Team Members
CREATE TABLE team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  profile_description TEXT NOT NULL,
  linkedin_profile VARCHAR(255),
  photo VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
