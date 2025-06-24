import { useState, useEffect } from 'react';
import { mockAPI, type User } from '@/data/mockData';

// Simulate authentication state management
export function useMockAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing auth session
    const checkAuth = async () => {
      const savedAuth = localStorage.getItem('mockAuth');
      if (savedAuth === 'true') {
        try {
          const userData = await mockAPI.getUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('mockAuth');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async () => {
    setIsLoading(true);
    try {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userData = await mockAPI.getUser();
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('mockAuth', 'true');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mockAuth');
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
}