import {
	collection,
	addDoc,
	getDocs,
	Timestamp,
	updateDoc,
	doc as firestoreDoc,
	deleteDoc,
	where,
	query,
	getDoc,
} from 'firebase/firestore';
import { auth, firestore } from './utility';
import { CategoryFormState } from '../redux/Category/category.type';

const categoryRef = collection(firestore, 'categories');

export const handleAddCategory = async (
	payload: CategoryFormState
): Promise<{ error?: string; success?: any }> => {
	try {
		// Check for a duplicate name without a parent category
		const globalCategoryQuery = query(
			categoryRef,
			where('name', '==', payload.name.toLowerCase())
		);
		const globalSnapshot = await getDocs(globalCategoryQuery);

		if (!globalSnapshot.empty) {
			// If no parentCategory is provided, disallow creation
			if (!payload.parentCategory?.length) {
				throw new Error(
					`A category with the name "${payload.name}" already exists.`
				);
			}

			// Check if the category exists across unrelated parent categories
			const isAssociatedWithOtherParents = globalSnapshot.docs.some(
				(docSnapshot) => {
					const data = docSnapshot.data();
					return (
						data.parentCategory &&
						data.parentCategory.some(
							(parentId: string) => !payload.parentCategory?.includes(parentId)
						)
					);
				}
			);

			if (isAssociatedWithOtherParents) {
				throw new Error(
					`A subcategory with the name "${payload.name}" already exists in other parent categories. Please update the existing one and add it to the parent categories you wish to connect.`
				);
			}
		}

		// Add the new category
		const docRef = await addDoc(categoryRef, {
			...payload,
			name: payload.name.toLowerCase(),
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
export const handleUpdateCategory = async (
	categoryId: string,
	payload: CategoryFormState
) => {
	try {
		// Check for a duplicate name without a parent category
		const globalCategoryQuery = query(
			categoryRef,
			where('name', '==', payload.name.toLowerCase())
		);
		const globalSnapshot = await getDocs(globalCategoryQuery);

		if (!globalSnapshot.empty) {
			const isDuplicate = globalSnapshot.docs.some(
				(docSnapshot) => docSnapshot.id !== categoryId // Exclude the current category
			);

			if (isDuplicate) {
				// If no parentCategory is provided, disallow updating
				if (!payload.parentCategory?.length) {
					throw new Error(
						`A category with the name "${payload.name}" already exists.`
					);
				}

				// Check if the category exists across unrelated parent categories
				const isAssociatedWithOtherParents = globalSnapshot.docs.some(
					(docSnapshot) => {
						if (docSnapshot.id === categoryId) return false; // Skip the current category
						const data = docSnapshot.data();
						return (
							data.parentCategory &&
							data.parentCategory.some(
								(parentId: string) =>
									!payload.parentCategory?.includes(parentId)
							)
						);
					}
				);

				if (isAssociatedWithOtherParents) {
					throw new Error(
						`A subcategory with the name "${payload.name}" already exists in other parent categories. Please update the existing one and add it to the parent categories you wish to connect.`
					);
				}
			}
		}

		// Update the category
		const categoryDocRef = firestoreDoc(categoryRef, categoryId);
		const response = await updateDoc(categoryDocRef, {
			...payload,
			name: payload.name.toLowerCase(),
			dateUpdated: Timestamp.now(),
			updatedBy: auth?.currentUser?.displayName,
			updatedByID: auth?.currentUser?.uid,
		});

		return response;
	} catch (error: any) {
		console.error('Error updating category:', error.message || error);
		throw new Error(
			error.message || 'An error occurred while updating the category.'
		);
	}
};

export const handleGetCategories = async () => {
	try {
		const querySnapshot = await getDocs(categoryRef);

		console.log(querySnapshot.docs);

		const categories = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			dateCreated: doc.data().dateCreated?.toDate().toISOString(),
			dateUpdated: doc.data().dateUpdated?.toDate().toISOString(),
			...doc.data(),
		}));
		return categories;
	} catch (error: any) {
		console.log(error);
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
			dateCreated: doc.data().dateCreated?.toDate()?.toISOString(),
			dateUpdated: doc.data().dateUpdated?.toDate().toISOString(),
			...doc.data(),
		}));

		return categories;
	} catch (error: any) {
		throw new Error(
			error.message || 'An error occurred while fetching categories.'
		);
	}
};
