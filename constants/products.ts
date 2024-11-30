import { useState } from "react";
import { KeyboardTypeOptions } from "react-native";
import { useProductStore } from "~/store/products";

export const ProductForm = () => {
	const productStore = useProductStore();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [qty, setQty] = useState(0);
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");

	const handleAddProduct = () => {
		productStore.addProduct({
			id: Date.now().toString(),
			name,
			price: parseFloat(price),
			image: "",
			Qty: qty,

			description,
		});
	};

	return [
		{
			label: "Product Name",
			placeholder: "Enter product name",
			value: name || "", // Ensure value is always a string
			onChangeText: setName || (() => {}), // Ensure onChangeText is always a function
			required: true,
		},
		{
			label: "Product Price",
			placeholder: "Enter product price",
			value: price || "",
			onChangeText: setPrice || (() => {}),
			keyboardType: "numeric" as KeyboardTypeOptions, // Ensure numeric input
			required: true,
		},
		{
			label: "Product Quantity",
			placeholder: "Enter product quantity",
			value: qty.toString(),
			onChangeText: (text: string) => setQty(parseInt(text) || 0),
			keyboardType: "numeric" as KeyboardTypeOptions, // Ensure numeric input
			required: true,
		},
		{
			label: "Product Category",
			placeholder: "Enter product category",
			value: category || "",
			onChangeText: setCategory || (() => {}),
			required: true,
		},
		{
			label: "Product Description",
			placeholder: "Enter product description",
			value: description || "",
			onChangeText: setDescription || (() => {}),
			required: true,
		},
	];
};
