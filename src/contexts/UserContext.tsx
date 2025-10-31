import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  userId: string;
  userWalletId: string;
  setUserWalletId: (walletId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId] = useState(() => {
    // Get or create user ID from localStorage
    let id = localStorage.getItem('ecoclean_user_id');
    if (!id) {
      id = 'user_' + Date.now();
      localStorage.setItem('ecoclean_user_id', id);
    }
    return id;
  });

  const [userWalletId, setUserWalletIdState] = useState(() => {
    // Get wallet from localStorage or use demo wallet
    return localStorage.getItem('ecoclean_wallet_id') || '0.0.12345';
  });

  const setUserWalletId = (walletId: string) => {
    localStorage.setItem('ecoclean_wallet_id', walletId);
    setUserWalletIdState(walletId);
  };

  return (
    <UserContext.Provider value={{ userId, userWalletId, setUserWalletId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
