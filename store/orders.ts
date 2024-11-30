import { create } from "zustand";

interface Product {
	id: string;
	name: string;
	image: string;
	price: number;
	Qty: number;
}

interface Order {
	id: string;
	date: string;
	totalPrice: number;
	products: Product[];
}

interface OrderState {
	orders: Order[];
	addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
	orders: [],
	addOrder: (order: Order) =>
		set((state: OrderState) => ({
			orders: [...state.orders, order],
		})),
}));
