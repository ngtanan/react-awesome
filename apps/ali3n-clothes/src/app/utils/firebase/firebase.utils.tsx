import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALoDDjR6jv4rPLXlK41Ag1m77MUoKnpIU',
  authDomain: 'ali3n-clothes-db.firebaseapp.com',
  projectId: 'ali3n-clothes-db',
  storageBucket: 'ali3n-clothes-db.appspot.com',
  messagingSenderId: '282875627933',
  appId: '1:282875627933:web:8f943faed765d156444774'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore(app)

export const createUserDocumentFromAuth = async (userAuth: any, additionalData: any): Promise<any> => {
  if (!userAuth) return

  const userRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error: unknown) {
      console.error('Error creating user document', (error as Error).message)
    }
  }

  return userRef
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<any> => createUserWithEmailAndPassword(auth, email, password)

export const signInAuthWithEmailAndPassword = async (email: string, password: string): Promise<any> => signInWithEmailAndPassword(auth, email, password)

export const signOutAuth = async (): Promise<void> => signOut(auth)

export const onAuthStateChangedListener = (callback: (user: any) => void): void => {
  onAuthStateChanged(auth, callback)
}
