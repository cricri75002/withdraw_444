import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

interface User {
  id: string;
  name: string;
  email: string;
  bankId: string;
  bankName: string;
  nfcEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (bankId: string, password: string, bankName: string) => Promise<boolean>;
  logout: () => void;
  toggleNfc: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);

    const timeout = setTimeout(() => {
      if (user) {
        logout();
        toast.info('Your session has expired. Please log in again.');
      }
    }, 15 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  const login = async (bankId: string, password: string, bankName: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (bankId && password) {
        const mockUser = {
          id: '12345',
          name: 'Christopher Allico',
          email: 'christopher.allico@example.com',
          bankId,
          bankName,
          nfcEnabled: false
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success(`Successfully connected to ${bankName}`);
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNfc = () => {
    if (user) {
      const updatedUser = { ...user, nfcEnabled: !user.nfcEnabled };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success(`NFC payments ${updatedUser.nfcEnabled ? 'enabled' : 'disabled'}`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        toggleNfc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};