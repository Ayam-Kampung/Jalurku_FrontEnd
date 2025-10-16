// src/services/api.js
const API_BASE = 'http://localhost:3000/api';

// Auth API
export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  },

  getUserInfo: async (token) => {
    const res = await fetch(`${API_BASE}/user/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  }
};

// Angket API
export const angketAPI = {
  start: async () => {
    const res = await fetch(`${API_BASE}/angket/mulai`, { 
      method: 'POST' 
    });
    return await res.json();
  },

  getAll: async () => {
    const res = await fetch(`${API_BASE}/pertanyaan/`);
    return await res.json();
  },

  getRand: async () => {
    const res = await fetch(`${API_BASE}/pertanyaan/rand`);
    return await res.json();
  },

  submit: async (data) => {
    const res = await fetch(`${API_BASE}/angket/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  finish: async (sessionId) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_BASE}/angket/selesai`, {
      method: 'POST',
      body: JSON.stringify({ session_id: sessionId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    return await res.json();
  }
};

// KHUSUS ADMIN
export const adminAPI = {
  checkAdmin: async () => {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${API_BASE}/admin/check`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include', // optional: kalau backend pakai cookie
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  },
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// Jika sesi berakhir/invalid maka langsung Log Keluar!!!
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Sesi berakhir. Silakan login kembali.');
  }
  
  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan');
  }
  
  return data;
};

// Pertanyaan
export const pertanyaanAPI = {
  // Get all pertanyaan

  // Create new pertanyaan
  create: async (pertanyaanArray) => {
    const response = await fetch(`${API_BASE}/pertanyaan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({
        pertanyaan: pertanyaanArray  // 👈 PENTING: dibungkus dalam object
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  },

  // Update pertanyaan
  update: async (id, data) => {
    const response = await fetch(`${API_BASE}/pertanyaan/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    console.log(response)
    return handleResponse(response);
  },

  // Delete pertanyaan
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/pertanyaan/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Ambil Semua Jurusan yang ada!
export const jurusanAPI = {
  // Get all jurusan
  getAll: async () => {
    const response = await fetch(`${API_BASE}/jurusan`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export default {
  pertanyaan: pertanyaanAPI,
  jurusan: jurusanAPI
};