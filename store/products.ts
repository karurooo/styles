import { create } from "zustand";

export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	Qty: number;
	description: string;
}

interface ProductStore {
	id: string;
	name: string;
	price: number;
	image: string;
	Qty: number;
	category: string;
	description: string;
	products: Product[];
	cartProducts: Product[];
	selectedProducts: Product[];
	setId: (id: string) => void;
	setName: (name: string) => void;
	setPrice: (price: number) => void;
	setImage: (image: string) => void;
	setQty: (Qty: number) => void;
	setCategory: (category: string) => void;
	setDescription: (description: string) => void;
	setProducts: (products: Product[]) => void;
	setCartProducts: (cartProducts: Product[]) => void;
	setSelectedProducts: (selectedProducts: Product[]) => void;
	addProduct: (product: Product) => void;
	addToCart: (product: Product) => void;
	removeProduct: (id: string) => void;
	clearCart: () => void;
	updateProductQty: (id: string, Qty: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
	id: "",
	name: "",
	price: 0,
	image: "",
	Qty: 0,
	category: "",
	description: "",
	products: [],
	cartProducts: [],
	selectedProducts: [],
	setId: (id) => set({ id }),
	setName: (name) => set({ name }),
	setPrice: (price) => set({ price }),
	setImage: (image) => set({ image }),
	setQty: (Qty) => set({ Qty }),
	setCategory: (category) => set({ category }),
	setDescription: (description) => set({ description }),
	setProducts: (products) => set({ products }),
	setCartProducts: (cartProducts) => set({ cartProducts }),
	setSelectedProducts: (selectedProducts) => set({ selectedProducts }),
	addProduct: (product: Product) =>
		set((state) => ({
			...state,
			products: [...state.products, product],
		})),
	addToCart: (product: Product) =>
		set((state) => ({
			cartProducts: [...state.cartProducts, product],
		})),
	removeProduct: (id: string) =>
		set((state) => ({
			cartProducts: state.cartProducts.filter((product) => product.id !== id),
		})),
	clearCart: () => set({ cartProducts: [] }),
	updateProductQty: (id: string, Qty: number) =>
		set((state) => ({
			cartProducts: state.cartProducts.map((product) =>
				product.id === id ? { ...product, Qty } : product,
			),
		})),
}));
