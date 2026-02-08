# BTI - Barakah Talenta Inspirasi (React Version)

Website corporate untuk BTI (Barakah Talenta Inspirasi) - Business Consultancy Services, dibangun dengan React.js dan Vite.

## 🚀 Tech Stack

- **React 19** - Library UI
- **Vite** - Build tool dan development server
- **React Router DOM** - Client-side routing
- **Font Awesome** - Icon library

## 📁 Project Structure

```
bti-react/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation component
│   │   ├── Footer.jsx     # Footer component
│   │   ├── FloatingCTA.jsx # WhatsApp floating button
│   │   ├── BackToTop.jsx  # Back to top button
│   │   └── Notification.jsx # Toast notification
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   ├── Services.jsx   # Services page
│   │   ├── Team.jsx       # Team page
│   │   └── Contact.jsx    # Contact page
│   ├── hooks/             # Custom React hooks
│   │   ├── useScrollAnimation.js  # Scroll animation hook
│   │   └── useCounterAnimation.js # Counter animation hook
│   ├── styles/            # CSS styles
│   │   └── style.css      # Main stylesheet
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## 🛠️ Installation

1. **Clone atau download project ini**

2. **Masuk ke direktori project**
   ```bash
   cd bti-react
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka browser dan akses**
   ```
   http://localhost:5173
   ```

## 📦 Build untuk Production

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`.

## 🎯 Features

### Pages
- **Home** - Hero section, value propositions, services preview, team preview, CTA
- **Services** - Detailed service offerings, process timeline
- **Team** - Founders profiles, company philosophy
- **Contact** - Contact form, contact information, FAQ, response timeline

### Components
- **Navbar** - Fixed navigation with mobile responsive menu
- **Footer** - Site links, contact info, social media
- **FloatingCTA** - WhatsApp floating button
- **BackToTop** - Scroll to top button
- **Notification** - Toast notification for form submission

### Custom Hooks
- **useScrollAnimation** - Intersection Observer based scroll animations
- **useCounterAnimation** - Animated number counter for statistics

### Styling Features
- CSS Variables untuk theming
- Responsive design (mobile-first)
- Scroll animations (AOS-like)
- Hover effects dan transitions
- Gradient backgrounds dan orbs
- Mobile navigation dengan hamburger menu

## 🌐 Routing

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Services |
| `/team` | Team |
| `/contact` | Contact |

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#03D967` | Buttons, accents, highlights |
| Primary Dark | `#02b555` | Button hover states |
| Secondary | `#111E48` | Dark backgrounds, headings |
| Accent | `#00d4ff` | Gradients, secondary accents |
| Text Dark | `#1a1a2e` | Headings |
| Text Body | `#4a4a5a` | Body text |
| Text Light | `#6b6b7b` | Secondary text |

## 🔧 Development

### Menambah Page Baru

1. Buat file baru di `src/pages/NamaPage.jsx`
2. Tambah route di `src/App.jsx`:
   ```jsx
   import NamaPage from './pages/NamaPage';
   
   <Route path="/nama-page" element={<NamaPage />} />
   ```

### Menambah Component Baru

1. Buat file di `src/components/NamaComponent.jsx`
2. Import dan gunakan di page atau component lain

### Custom Hooks

Custom hooks disimpan di `src/hooks/` untuk logic yang reusable:
- `useScrollAnimation` - Trigger animations on scroll
- `useCounterAnimation` - Animate number counters

## 📄 License

© 2024 Barakah Talenta Inspirasi. All rights reserved.

## 🤝 Kontribusi

Project ini adalah konversi dari static HTML website ke React.js untuk meningkatkan maintainability dan developer experience.
