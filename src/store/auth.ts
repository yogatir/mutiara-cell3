import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email: string) => {
        // Simulasi login, hanya menggunakan email
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
          },
          isLoggedIn: true,
        });
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage', // nama untuk local storage item
    }
  )
);
