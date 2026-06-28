/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, doc, getDocFromServer } from 'firebase/firestore';
import { auth, db, googleProvider, OperationType, handleFirestoreError } from '../firebase';
import { Lead, Enrollment } from '../types';

interface FirebaseContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  submitLead: (leadData: Omit<Lead, 'createdAt'>) => Promise<string>;
  submitEnrollment: (enrollData: Omit<Enrollment, 'createdAt'>) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate connection to Firestore as per MANDATORY CRITICAL CONSTRAINT
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === 'abishekabishek55337@gmail.com' && currentUser.emailVerified) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  };

  const submitLead = async (leadData: Omit<Lead, 'createdAt'>): Promise<string> => {
    const path = 'leads';
    try {
      const payload = {
        ...leadData,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, path), payload);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      throw error;
    }
  };

  const submitEnrollment = async (enrollData: Omit<Enrollment, 'createdAt'>): Promise<string> => {
    const path = 'enrollments';
    try {
      const payload = {
        ...enrollData,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, path), payload);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        signInWithGoogle,
        logOut,
        submitLead,
        submitEnrollment,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
