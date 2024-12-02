import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	Timestamp,
} from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Configure Google Sign-In
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

interface UserProfile {
	uid: string;
	displayName: string;
	email: string;
}

export const handleUserProfile = async (
	userAuth: UserProfile,
	additionalData?: any
) => {
	if (!userAuth) return;
	const { uid } = userAuth;

	//get user data
	const userRef = doc(firestore, 'users', uid);
	const snapshot = await getDoc(userRef);

	if (!snapshot.exists()) {
		const { displayName, email } = userAuth;
		const userRoles = ['user'];
		try {
			await setDoc(userRef, {
				displayName,
				email,
				createdDate: Timestamp.now(),
				userRoles,
				...additionalData,
			});
		} catch (err) {
			console.log(err);
		}
	}

	return userRef;
};
