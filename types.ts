export type ProductType = {
	id: string;
	name: string;
	image: string;
	price: number;
	Qty: number;
	description: string;
	onPress?: () => void; // Make onPress optional
};
