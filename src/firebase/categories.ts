import {
	collection,
	addDoc,
	getDocs,
	Timestamp,
	updateDoc,
	doc,
	deleteDoc,
	where,
	query,
} from 'firebase/firestore';
import { auth, firestore } from './utility';
import { CategoryFormState } from '../redux/Category/category.type';

const categoryRef = collection(firestore, 'categories');

export const handleAddCategory = async (
	payload: CategoryFormState
): Promise<{ error?: string; success?: any }> => {
	try {
		//check first for exsiting name
		const categoryQuery = query(
			categoryRef,
			where('name', '==', payload.name.toLowerCase())
		);
		const querySnapshot = await getDocs(categoryQuery);

		if (!querySnapshot.empty && !payload.parentCategory?.length) {
			console.log(`Category with the name "${payload.name}" already exists.`);
			throw Error(`Category with the name "${payload.name}" already exists.`);
		}
		const docRef = await addDoc(categoryRef, {
			...payload,
			name: payload.name.toLocaleLowerCase(),
			dateCreated: Timestamp.now(),
			createdBy: auth?.currentUser?.displayName,
			createdByID: auth?.currentUser?.uid,
		});

		return { success: docRef };
	} catch (error: any) {
		console.error('Error adding category:', error.message || error);
		throw new Error(
			error.message || 'An error occurred while adding the category.'
		);
	}
};

export const handleGetCategories = async () => {
	try {
		const querySnapshot = await getDocs(categoryRef);

		const categories = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			dateCreated: doc.data().dateCreated?.toDate().toISOString(),
			...doc.data(),
		}));

		return categories;
	} catch (error: any) {
		throw new Error(
			error.message || 'An error occurred while fetching categories.'
		);
	}
};

export const handleGetParentCategories = async () => {
	try {
		const q = query(
			categoryRef,
			where('parentCategory', '==', []) // Match empty array
		);

		const querySnapshot = await getDocs(q);

		const categories = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			dateCreated: doc.data().dateCreated?.toDate().toISOString(),
			...doc.data(),
		}));

		return categories;
	} catch (error: any) {
		throw new Error(
			error.message || 'An error occurred while fetching categories.'
		);
	}
};
