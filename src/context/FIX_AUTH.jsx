'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { auth, saveUserToFirestore } from '@/lib/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sign up with email and password
  const signUp = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Update the user's display name
    await updateProfile(userCredential.user, { displayName })
    // Save to Firestore with the displayName
    await saveUserToFirestore({ 
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName,
      photoURL: userCredential.user.photoURL || ''
    }, 'email')
    return userCredential
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    // Save/update to Firestore
    await saveUserToFirestore({
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName || '',
      photoURL: result.user.photoURL || ''
    }, 'email')
    return result
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // Save to Firestore
    await saveUserToFirestore(result.user, 'google')
    return result
  }

  // Sign in with GitHub
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // Save to Firestore
    await saveUserToFirestore(result.user, 'github')
    return result
  }

  // Sign out
  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
