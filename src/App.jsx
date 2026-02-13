import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';

// Insight Pages
import InsightList from './pages/insight/InsightList';
import InsightDetail from './pages/insight/InsightDetail';

// CMS Pages
import CMSLayout from './pages/cms/CMSLayout';
import Login from './pages/cms/Login';
import Dashboard from './pages/cms/Dashboard';
import Articles from './pages/cms/Articles';
import ArticleForm from './pages/cms/ArticleForm';
import TeamCMS from './pages/cms/Team';
import TeamForm from './pages/cms/TeamForm';
import Company from './pages/cms/Company';
import Subscriptions from './pages/cms/Subscriptions';
import Profile from './pages/cms/Profile';
import Categories from './pages/cms/Categories';

import './styles/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* CMS Login Route - Outside of CMSLayout */}
            <Route path="/cms/login" element={<Login />} />

            {/* CMS Protected Routes */}
            <Route path="/cms/*" element={<CMSLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="articles" element={<Articles />} />
              <Route path="articles/new" element={<ArticleForm />} />
              <Route path="articles/edit/:id" element={<ArticleForm />} />
              <Route path="team" element={<TeamCMS />} />
              <Route path="team/new" element={<TeamForm />} />
              <Route path="team/edit/:id" element={<TeamForm />} />
              <Route path="company" element={<Company />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="categories" element={<Categories />} />
            </Route>

            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/insight" element={<InsightList />} />
                    <Route path="/insight/:slug" element={<InsightDetail />} />
                  </Routes>
                </main>
                <Footer />
                <BackToTop />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
