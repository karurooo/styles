import { supabase } from "~/utils/supabase";
import { useProductStore } from "~/store/products";
import { handleError } from "~/utils/handleError";
import { store } from "expo-router/build/global-state/router-store";
import { useSellerStore } from "~/store/sellers";
import { Product } from "~/store/products";
import { useUserStore } from "~/store/users";

// Add a new product
export const addProduct = async (
	product: Product, // Add product parameter
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<string | null> => {
	try {
		const { data, error } = await supabase.from("product").insert({
			store_id: useSellerStore.getState().store_id,
			name: product.name,
			price: product.price,
			image_url: product.image,
			stock: product.Qty,
			description: product.description,
		});
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}
		return null;
	} catch (error) {
		if (error instanceof Error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}
		return "An unknown error occurred.";
	}
};

// Edit an existing product
export const editProduct = async (
	id: string,
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<string | null> => {
	try {
		const productStore = useProductStore.getState();
		const { data, error } = await supabase
			.from("product")
			.update({
				store_id: useSellerStore.getState().store_id,
				name: productStore.name,
				price: productStore.price,
				image_url: productStore.image,
				stock: productStore.Qty,
				description: productStore.description,
			})
			.eq("id", id);
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}
		return null;
	} catch (error) {
		handleError(error, setErrorMessage, setShowError);
		return (error as Error).message;
	}
};

// Delete a product
export const deleteProduct = async (
	id: string,
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<string | null> => {
	try {
		const { data, error } = await supabase
			.from("product")
			.delete()
			.eq("id", id);
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}
		return null;
	} catch (error) {
		handleError(error, setErrorMessage, setShowError);
		return (error as Error).message;
	}
};

// Fetch all products
export const fetchProducts = async (
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<Product[] | string> => {
	try {
		const { data, error } = await supabase.from("product").select("*");
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}

		// Map the fetched data to the correct properties
		const mappedData = data.map((product: any) => ({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image_url,
			Qty: product.stock,
			description: product.description,
		}));

		const setProductStore = useProductStore.getState().setProducts;
		setProductStore(mappedData); // Save mapped products to the product store
		return mappedData;
	} catch (error) {
		handleError(error, setErrorMessage, setShowError);
		return (error as Error).message;
	}
};

// Fetch a single product by ID
export const fetchProductById = async (
	id: string,
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<Product | string> => {
	try {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.eq("id", id)
			.single();
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}
		return data;
	} catch (error) {
		handleError(error, setErrorMessage, setShowError);
		return (error as Error).message;
	}
};

// Fetch products by store ID
export const fetchProductsByStoreId = async (
	storeId: string,
	setErrorMessage: (message: string) => void,
	setShowError: (show: boolean) => void,
): Promise<Product[] | string> => {
	try {
		const { data, error } = await supabase
			.from("product")
			.select("*")
			.eq("store_id", storeId);
		if (error) {
			handleError(error, setErrorMessage, setShowError);
			return error.message;
		}

		// Map the fetched data to the correct properties
		const mappedData = data.map((product: any) => ({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image_url,
			Qty: product.stock,
			description: product.description,
		}));

		return mappedData;
	} catch (error) {
		handleError(error, setErrorMessage, setShowError);
		return (error as Error).message;
	}
};
