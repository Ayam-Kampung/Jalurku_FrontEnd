export const storage = {
  setToken(token) {
    localStorage.setItem('token', token);
  },

  clearAll() {
    localStorage.clear();
  },
  
  getToken() {
    return localStorage.getItem('token') || '';
  },
  
  removeToken() {
    localStorage.removeItem('token');
  },

  // Session ID management
  getSessionId: () => localStorage.getItem('angket_session_id'),
  setSessionId: (sessionId) => localStorage.setItem('angket_session_id', sessionId),
  removeSessionId: () => localStorage.removeItem('angket_session_id'),
  
  // Menyimpan state angket sementara
  getAngketState: () => {
    const state = localStorage.getItem('angket_state');
    return state ? JSON.parse(state) : null;
  },
  setAngketState: (state) => {
    localStorage.setItem('angket_state', JSON.stringify(state));
  },
  removeAngketState: () => {
    localStorage.removeItem('angket_state');
  }
};