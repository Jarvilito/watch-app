import {
	collection,
	addDoc,
	getDocs,
	Timestamp,
	updateDoc,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import { auth, firestore } from './utility';
import { ProductFormState } from '../redux/Product/product.types';
interface SuccessResponse {
	success: true;
	data: ProductFormState[];
}

interface ErrorResponse {
	success: false;
	error: string;
}

type HandleGetProductsResponse = SuccessResponse | ErrorResponse;

const productRef = collection(firestore, 'products');

export const handleAddProduct = async (payload: ProductFormState) => {
	try {
		const docRef = await addDoc(productRef, {
			...payload,
			dateCreated: Timestamp.now(),
			createdBy: auth?.currentUser?.displayName,
			createdByID: auth?.currentUser?.uid,
		});
		return docRef;
	} catch (error) {
		console.error('Error adding product:', error);
		throw error;
	}
};

export const handleGetProducts =
	async (): Promise<HandleGetProductsResponse> => {
		try {
			const querySnapshot = await getDocs(productRef);

			const productLists = querySnapshot.docs.map((doc) => {
				const data = doc.data();

				return {
					id: doc.id,
					dateCreated: doc.data().dateCreated?.toDate().toISOString(),
					brand: data.brand,
					color: data.color,
					condition: data.condition,
					model: data.model,
					price: data.price,
					quantity: data.quantity,
					type: data?.type,
					createdBy: data.createdBy,
					crystal: data.crystal,
					createdByID: data.createdByID,
					gender: data.gender,
					images: data.images,
					...data,
				};
			});

			return { success: true, data: productLists };
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

export const handleUpdateProduct = async (
	productId: string,
	payload: ProductFormState
) => {
	try {
		const productDocRef = doc(productRef, productId);
		const response = await updateDoc(productDocRef, {
			...payload,
			dateUpdated: Timestamp.now(),
			updatedBy: auth?.currentUser?.displayName,
			updatedByID: auth?.currentUser?.uid,
		});

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

// export const handleGetProducts = async () => {
//     try {

//         const querySnapshot = await getDocs(productRef);

//         const productLists = querySnapshot.docs.map( (doc) => ({
//             id: doc.id,
//             dateCreated: doc.dateCreated?.toDate().toISOString(),
//             ...doc.data(),

//         }));

//         return productLists;
//     }

//     catch (error) {
//         return error;
//     }
// }

export const handleDeleteProduct = async (id: string) => {
	if (!id) {
		throw new Error('Product ID is required for deletion.');
	}

	try {
		const productDocRef = doc(firestore, 'products', id);
		await deleteDoc(productDocRef);
		console.log('Product deleted successfully');
	} catch (error) {
		console.error('Error deleting product:', error);
		throw error;
	}
};
