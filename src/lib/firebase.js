import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Storage Functions for Image Upload
export const uploadMenuImage = async (file) => {
  try {
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileName = `menu-images/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Firestore User Functions
export const saveUserToFirestore = async (user, provider = 'email') => {
  try {
    const userData = {
      uid: user.uid,
      email: user.email || '',
      name: user.displayName || user.name || '',
      photoURL: user.photoURL || '',
      provider: provider,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('Saving user to Firestore:', userData); // Debug log
    await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
    console.log('User saved successfully');
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

export const getFirestoreUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    // Fetch all users without ordering to avoid index requirements
    const snapshot = await getDocs(usersRef);
    console.log('Fetched users count:', snapshot.docs.length); // Debug log
    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      console.log('User data:', doc.id, data); // Debug log
      return { id: doc.id, ...data };
    });
    // Sort by createdAt in memory
    return users.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return [];
  }
};

export const deleteFirestoreUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    return true;
  } catch (error) {
    console.error('Error deleting user from Firestore:', error);
    return false;
  }
};

export { app, auth, db, storage };
