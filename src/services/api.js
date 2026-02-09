// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
    },
  };

  // Don't set Content-Type for FormData
  if (!(options.body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Articles API
export const articleAPI = {
  // Public endpoints
  getPublicArticles: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/articles/public?${query}`);
  },
  
  getPublicArticle: (slug) => fetchAPI(`/articles/public/${slug}`),
  
  // Admin endpoints
  getArticles: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/articles?${query}`);
  },
  
  getArticle: (id) => fetchAPI(`/articles/${id}`),
  
  createArticle: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'tags' && Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'featuredImage' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    return fetchAPI('/articles', {
      method: 'POST',
      body: formData,
    });
  },
  
  updateArticle: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'tags' && Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'featuredImage' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    return fetchAPI(`/articles/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
  
  deleteArticle: (id) => fetchAPI(`/articles/${id}`, { method: 'DELETE' }),
  
  getCategories: () => fetchAPI('/articles/meta/categories'),
  getTags: () => fetchAPI('/articles/meta/tags'),
};

// Team API
export const teamAPI = {
  getPublicTeam: () => fetchAPI('/team/public'),
  getTeam: () => fetchAPI('/team'),
  getMember: (id) => fetchAPI(`/team/${id}`),
  
  createMember: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if ((key === 'expertise' || key === 'credentials') && Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'photo' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    return fetchAPI('/team', {
      method: 'POST',
      body: formData,
    });
  },
  
  updateMember: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if ((key === 'expertise' || key === 'credentials') && Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'photo' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    
    return fetchAPI(`/team/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
  
  deleteMember: (id) => fetchAPI(`/team/${id}`, { method: 'DELETE' }),
};

// Company API
export const companyAPI = {
  getPublicCompany: () => fetchAPI('/company/public'),
  getCompany: () => fetchAPI('/company'),
  
  updateCompany: (data) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key === 'logo' || key === 'footerLogo') {
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        }
      } else if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });
    
    return fetchAPI('/company', {
      method: 'PUT',
      body: formData,
    });
  },
};

// Subscription API
export const subscriptionAPI = {
  subscribe: (data) => fetchAPI('/subscriptions/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  unsubscribe: (email) => fetchAPI('/subscriptions/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  
  getSubscriptions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/subscriptions?${query}`);
  },
  
  deleteSubscription: (id) => fetchAPI(`/subscriptions/${id}`, { method: 'DELETE' }),
  
  exportCSV: () => `${API_URL}/subscriptions/export/csv`,
};

export default {
  articles: articleAPI,
  team: teamAPI,
  company: companyAPI,
  subscriptions: subscriptionAPI,
};
