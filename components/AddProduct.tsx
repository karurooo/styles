import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	KeyboardTypeOptions,
} from "react-native";
import ReusableModal from "./Modal";
import InputField from "./InputField";
import ProductImages from "./ProductImages";
import { Button } from "./Button";
import { useProductStore } from "~/store/products";
import { addProduct } from "~/services/products/product";
import AlertModal from "./Alert";
import { handleError } from "~/utils/handleError";
import { useSellerStore } from "~/store/sellers";

interface AddProductProps {
	onClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productImage, setProductImage] = useState<string | null>(null);
	const [formErrors, setFormErrors] = useState<string[]>([]);
	const [productQuantity, setProductQuantity] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [alertVisible, setAlertVisible] = useState(false); // Ensure setAlertVisible is defined
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<"error" | "success">("success");

	const addProductToStore = useProductStore((state) => state.addProduct);

	const productFormFields = [
		{
			placeholder: "Product Name",
			value: productName,
			onChangeText: setProductName,
			keyboardType: "default" as KeyboardTypeOptions,
		},
		{
			placeholder: "Product Price",
			value: productPrice,
			onChangeText: setProductPrice,
			keyboardType: "numeric" as KeyboardTypeOptions,
		},
		{
			placeholder: "Product Quantity",
			value: productQuantity,
			onChangeText: setProductQuantity,
			keyboardType: "numeric" as KeyboardTypeOptions,
		},
		{
			placeholder: "Product Category",
			value: productCategory,
			onChangeText: setProductCategory,
			keyboardType: "default" as KeyboardTypeOptions,
		},
		{
			placeholder: "Product Description",
			value: productDescription,
			onChangeText: setProductDescription,
			keyboardType: "default" as KeyboardTypeOptions,
		},
	];

	const closeModal = () => {
		setModalVisible(false);
		onClose();
	};

	const checkForm = () => {
		console.log("Product Name: ", productName);
		console.log("Product Price: ", productPrice);
		console.log("Product Quantity: ", productQuantity);
		console.log("Product Category: ", productCategory);
		console.log("Product Description: ", productDescription);
		console.log("Product Image: ", productImage);
	};
	const handleAddProduct = async () => {
		const product = {
			id: Date.now().toString(),
			name: productName,
			price: parseFloat(productPrice),
			image: productImage || "",
			Qty: parseInt(productQuantity),
			description: productDescription,
		};

		addProductToStore(product);

		try {
			const errorMessage = await addProduct(
				product, // Pass product to addProduct service
				(message: string) => setAlertMessage(message),
				(show: boolean) => setAlertVisible(show),
			);
			if (errorMessage) {
				setAlertType("error");
				setAlertVisible(true);
				return;
			}
			setAlertType("success");
			setAlertMessage("Product added successfully!");
			setAlertVisible(true);
			closeModal();
		} catch (error) {
			handleError(error, setAlertMessage, setAlertVisible);
			setAlertType("error");
			setAlertVisible(true);
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View className="h-full justify-center ">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View className="w-full gap-2">
							<Text className="text-2xl font-bold text-center ">
								Add Product
							</Text>
							{formErrors.length > 0 && (
								<View className="bg-red-200 p-2 rounded">
									{formErrors.map((error, index) => (
										<Text key={`error-${index}`} className="text-red-600">
											{error}
										</Text>
									))}
								</View>
							)}
							<ProductImages
								onImageChange={(image: string) => setProductImage(image)}
							/>
							{productFormFields.map((field, index) => (
								<InputField
									key={`product-field-${index}`} // Ensure unique keys
									placeholder={field.placeholder || ""} // Ensure placeholder is always a string
									value={field.value || ""} // Ensure value is always a string
									onChangeText={field.onChangeText || (() => {})} // Ensure onChangeText is always a function
									keyboardType={field.keyboardType || "default"} // Ensure correct keyboard type
								/>
							))}
							{/* <Button title="Check Form" onPress={checkForm} /> */}

							<Button title="Add Product" onPress={handleAddProduct} />
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
			<AlertModal
				isVisible={alertVisible}
				onClose={() => setAlertVisible(false)}
				message={alertMessage}
				type={alertType}
			/>
		</View>
	);
};

export default AddProduct;
