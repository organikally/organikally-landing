'use client';

// Customer auth (STORE_CONTRACT §8). Token (typ:"customer", aud:"store") + customer
// snapshot live in localStorage so the guest→customer transition survives reloads.
// The cart merge-on-login (§5.3.2) is driven by CartProvider watching the token.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { storeApi, TOKEN_KEY, CUSTOMER_KEY } from './client';
import type { Customer } from './types';

type AuthContextValue = {
  customer: Customer | null;
  token: string | null;
  isAuthed: boolean;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    marketing_opt_in?: boolean;
  }) => Promise<{ loggedIn: boolean; detail: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setCustomer: (c: Customer) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomerState] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const t = window.localStorage.getItem(TOKEN_KEY);
      const c = window.localStorage.getItem(CUSTOMER_KEY);
      if (t) setToken(t);
      if (c) setCustomerState(JSON.parse(c) as Customer);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((t: string | null, c: Customer | null) => {
    try {
      if (t) window.localStorage.setItem(TOKEN_KEY, t);
      else window.localStorage.removeItem(TOKEN_KEY);
      if (c) window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(c));
      else window.localStorage.removeItem(CUSTOMER_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const setCustomer = useCallback(
    (c: Customer) => {
      setCustomerState(c);
      persist(token, c);
    },
    [persist, token],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await storeApi.login({ email, password });
      setToken(res.access_token);
      setCustomerState(res.customer);
      persist(res.access_token, res.customer);
    },
    [persist],
  );

  const signup = useCallback(
    async (input: {
      name: string;
      email: string;
      password: string;
      phone?: string;
      marketing_opt_in?: boolean;
    }) => {
      const reg = await storeApi.register(input);
      // §5.1.1: register is anti-enumeration (202) and does NOT auto-login. Attempt a
      // login so a brand-new shopper flows straight to checkout; if the backend gates
      // on verification, surface the "check your email" detail instead.
      try {
        await login(input.email, input.password);
        return { loggedIn: true, detail: reg.detail };
      } catch {
        return { loggedIn: false, detail: reg.detail };
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await storeApi.logout();
    } catch {
      /* stateless logout — best effort */
    }
    setToken(null);
    setCustomerState(null);
    persist(null, null);
  }, [persist]);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const c = await storeApi.me();
      setCustomerState(c);
      persist(token, c);
    } catch {
      // Token invalid/expired/blocked — drop the session.
      setToken(null);
      setCustomerState(null);
      persist(null, null);
    }
  }, [persist, token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      customer,
      token,
      isAuthed: !!token,
      ready,
      login,
      signup,
      logout,
      refresh,
      setCustomer,
    }),
    [customer, token, ready, login, signup, logout, refresh, setCustomer],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
