import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';
import { showToast } from '../utils/toast';

const SESSION_COOKIE_KEY = 'smartMarketplaceSession';
const USERS_STORAGE_KEY = 'smartMarketplaceUsers';

const AuthContext = createContext(null);

const parseCookieSession = () => {
  try {
    const raw = getCookie(SESSION_COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const ensureSeedUsers = () => {
  const users = readUsers();
  const adminUser = {
    id: 1,
    name: 'Marketplace Admin',
    email: 'admin@smartmarketplace.com',
    password: 'admin123',
    role: 'admin',
  };

  if (users.length === 0) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([adminUser]));
    return [adminUser];
  }

  const hasAdmin = users.some(
    (stored) => stored.email?.toLowerCase() === adminUser.email.toLowerCase()
  );

  if (hasAdmin) return users;

  const mergedUsers = [adminUser, ...users];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mergedUsers));
  return mergedUsers;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(parseCookieSession);
  const [users, setUsers] = useState(() => ensureSeedUsers());

  useEffect(() => {
    setUsers(ensureSeedUsers());
  }, []);

  useEffect(() => {
    if (!user) {
      deleteCookie(SESSION_COOKIE_KEY);
      return;
    }
    setCookie(SESSION_COOKIE_KEY, JSON.stringify(user), 7);
  }, [user]);

  const register = ({ name, email, password }) => {
    const activeUsers = ensureSeedUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const exists = activeUsers.some((stored) => stored.email.toLowerCase() === normalizedEmail);

    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'user',
    };

    const updatedUsers = [...activeUsers, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    setUser({ name: newUser.name, email: newUser.email, role: newUser.role, mode: 'member' });
    showToast('Account created successfully', 'success');
  };

  const login = ({ email, password }) => {
    const activeUsers = ensureSeedUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const found = activeUsers.find(
      (stored) => stored.email.toLowerCase() === normalizedEmail && stored.password === password
    );

    if (!found) {
      throw new Error('Invalid email or password.');
    }

    setUser({ name: found.name, email: found.email, role: found.role, mode: 'member' });
    showToast(`Welcome back, ${found.name}`, 'success');
  };

  const continueAsGuest = () => {
    setUser({
      name: 'Guest Shopper',
      email: 'guest@marketplace.local',
      role: 'guest',
      mode: 'guest',
    });
    showToast('Logged in as guest', 'info');
  };

  const forgotPassword = (email) => {
    const activeUsers = ensureSeedUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const exists = activeUsers.some((stored) => stored.email.toLowerCase() === normalizedEmail);
    if (!exists) {
      throw new Error('No account found with this email.');
    }
    showToast('Password reset link sent (demo UI only)', 'info');
  };

  const logout = () => {
    setUser(null);
    deleteCookie(SESSION_COOKIE_KEY);
    showToast('Session ended', 'warning');
  };

  const value = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      register,
      login,
      continueAsGuest,
      forgotPassword,
      logout,
    }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
