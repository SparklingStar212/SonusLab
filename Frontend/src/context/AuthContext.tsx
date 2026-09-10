import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hydrate session from storage on load
    const storedToken = localStorage.getItem('sonuslab_token');
    const storedUser = localStorage.getItem('sonuslab_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, jwt: string) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('sonuslab_token', jwt);
    localStorage.setItem('sonuslab_user', JSON.stringify(userData));
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sonuslab_token');
    localStorage.removeItem('sonuslab_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};