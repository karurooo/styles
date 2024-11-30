import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useProductStore } from "~/store/products";
import { ProductType } from "~/types";
import { Button } from "~/components/Button";
import { useRouter } from "expo-router";
import ReusableModal from "~/components/Modal";
import Checkout from "~/components/Checkout";
import { CheckBox } from "react-native-elements";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Swipeable } from "react-native-gesture-handler"; // Import Swipeable from react-native-gesture-handler
import AlertModal from "~/components/Alert"; // Import AlertModal
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function myCartPage() {
	const cartProducts = useProductStore((state) => state.cartProducts);
	const removeProduct = useProductStore((state) => state.removeProduct);
	const updateProductQty = useProductStore((state) => state.updateProductQty);

	const setSelectedProducts = useProductStore(
		(state) => state.setSelectedProducts,
	);
	const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
	const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
		new Set(),
	);
	const [isAlertVisible, setIsAlertVisible] = useState(false); // Add state for alert visibility

	const toggleSelectProduct = (productId: string) => {
		setSelectedProductIds((prevSelectedProductIds) => {
			const newSelectedProductIds = new Set(prevSelectedProductIds);
			if (newSelectedProductIds.has(productId)) {
				newSelectedProductIds.delete(productId);
			} else {
				newSelectedProductIds.add(productId);
			}
			return newSelectedProductIds;
		});
	};

	const router = useRouter();

	const totalPrice = cartProducts.reduce(
		(total, product) => total + product.price * product.Qty,
		0,
	);

	const renderRightActions = (productId: string) => (
		<TouchableOpacity
			className="justify-center items-center bg-red-500 h-[110px] w-20 rounded-lg "
			onPress={() => removeProduct(productId)}
		>
			<Text style={{ color: "white" }}>Remove</Text>
		</TouchableOpacity>
	);

	const toBack = () => {
		console.log("Back button pressed");
		router.back();
	};

	return (
		<View className="flex-1 p-4">
			<TouchableOpacity
				className="absolute top-3 left-5 justify-center items-center rounded-full h-10 w-10 bg-secondary z-10"
				onPress={toBack}
			>
				<MaterialIcons name="navigate-before" size={24} color="black" />
			</TouchableOpacity>
			<Text className="text-2xl font-bold mb-4 text-center">My Cart</Text>
			<ScrollView>
				{cartProducts.map((product: ProductType, index: number) => (
					<Swipeable
						key={`${product.id}-${index}`}
						renderRightActions={() => renderRightActions(product.id)}
					>
						<View
							className={`flex-row mb-4 p-2 border rounded-lg ${
								selectedProductIds.has(product.id) ? "bg-secondary" : ""
							}`}
						>
							<Image
								source={{ uri: product.image }}
								className="w-24 h-24 rounded-lg"
							/>
							<View className="flex-1 ml-4">
								<Text className="text-xl font-bold">{product.name}</Text>
								<Text className="text-lg">₱{product.price}</Text>
								<View className="flex-row items-center">
									<TouchableOpacity
										className="h-6 w-6 border rounded-full justify-center items-center"
										onPress={() =>
											updateProductQty(product.id, Math.max(1, product.Qty - 1))
										}
									>
										<AntDesign name="minus" size={18} color="black" />
									</TouchableOpacity>
									<Text className="mx-2">{product.Qty}</Text>
									<TouchableOpacity
										className="h-6 w-6 border rounded-full justify-center items-center"
										onPress={() =>
											updateProductQty(product.id, product.Qty + 1)
										}
									>
										<AntDesign name="plus" size={18} color="black" />
									</TouchableOpacity>
								</View>
							</View>
							<View className="justify-center items-center">
								<CheckBox
									checked={selectedProductIds.has(product.id)}
									onPress={() => toggleSelectProduct(product.id)}
								/>
							</View>
						</View>
					</Swipeable>
				))}
			</ScrollView>
			<View className="mt-4">
				<Text className="text-xl font-bold">Total: ₱{totalPrice}</Text>
			</View>
			<Button
				title="Proceed to Checkout"
				onPress={() => {
					const selectedProducts = cartProducts.filter((product) =>
						selectedProductIds.has(product.id),
					);
					if (selectedProducts.length > 0) {
						setSelectedProducts(selectedProducts);
						setIsCheckoutVisible(true);
					} else {
						setIsAlertVisible(true); // Show alert if no products are selected
					}
				}}
			/>
			<ReusableModal
				visible={isCheckoutVisible}
				onClose={() => setIsCheckoutVisible(false)}
			>
				<Checkout />
			</ReusableModal>
			<AlertModal
				isVisible={isAlertVisible}
				onClose={() => setIsAlertVisible(false)}
				message="Your cart is empty. Please add products to proceed to checkout."
				type="error"
			/>
		</View>
	);
}
