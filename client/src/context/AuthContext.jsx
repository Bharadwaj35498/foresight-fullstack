import { createContext, useContext, useState, useCallback } from 'react';
import { login as loginRequest } from '../api/insights';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('foresight_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('foresight_token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await loginRequest(email, password);
      localStorage.setItem('foresight_token', token);
      localStorage.setItem('foresight_user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      return true;
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in. Check your credentials and API connection.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('foresight_token');
    localStorage.removeItem('foresight_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, error, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
