import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useProductStore } from "~/store/products";
import { useOrderStore } from "~/store/orders";
import { ProductType } from "~/types";
import Dropdown from "~/components/Dropdown";
import MapModal from "~/components/Maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import ReusableModal from "~/components/Modal";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique order IDs
import { Button } from "./Button";

const Checkout: React.FC = () => {
	const selectedProducts = useProductStore((state) => state.selectedProducts);
	const totalPrice = selectedProducts.reduce(
		(sum, product) => sum + product.price * product.Qty,
		0,
	);
	const clearCart = useProductStore((state) => state.clearCart);
	const addOrder = useOrderStore((state) => state.addOrder);
	const router = useRouter();

	const [address, setAddress] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("Credit Card");
	const [isMapVisible, setIsMapVisible] = useState(false);
	const [isSummaryVisible, setIsSummaryVisible] = useState(false);

	const handleContinue = () => {
		setIsSummaryVisible(true);
	};
	const handlePlaceOrder = () => {
		const newOrder = {
			id: uuidv4(),
			date: new Date().toISOString(),
			totalPrice,
			products: selectedProducts,
		};
		addOrder(newOrder);
		clearCart();
		setIsSummaryVisible(false);
		router.back(); // Navigate back to close the checkout page
	};

	const handleSaveLocation = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setAddress(location.address);
		setIsMapVisible(false);
	};

	const paymentOptions = [
		{
			label: "Credit Card/Debit Card",
			icon: <MaterialIcons name="credit-card" size={20} />,
		},
		{
			label: "Gcash",
			icon: (
				<Image
					source={require("~/assets/images/gcash.png")}
					style={{ width: 20, height: 20 }}
				/>
			),
		},
		{
			label: "Cash on Delivery",
			icon: <MaterialIcons name="local-shipping" size={20} />,
		},
	];
	const toBack = () => {
		router.back();
	};

	return (
		<View className="flex-1 ">
			<Text className="text-2xl font-bold mb-4 text-center">Checkout</Text>
			<Text className="text-2xl font-bold mb-4">Order List</Text>
			<View className="max-h-60 mb-4">
				<ScrollView>
					{selectedProducts.map((product: ProductType, index: number) => (
						<View
							key={`${product.id}-${index}`}
							className="flex-row mb-4 p-2 border rounded-lg"
						>
							<Image
								source={{ uri: product.image }}
								className="w-24 h-24 rounded-lg"
							/>
							<View className="flex-1 ml-4">
								<Text className="text-xl font-bold">{product.name}</Text>
								<Text className="text-lg">₱{product.price}</Text>
								<Text className="text-md">Qty: {product.Qty}</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>
			<View className="mb-4  w-full">
				<Text className="text-xl font-bold mb-2">Shipping Address</Text>
				<TouchableOpacity
					onPress={() => setIsMapVisible(true)}
					className="border p-2 rounded-lg flex-row justify-between items-center"
				>
					<Text>{address || "Select your address"}</Text>
					<MaterialIcons name="location-on" size={20} />
				</TouchableOpacity>
			</View>
			<View className="mb-4">
				<Dropdown
					label="Select Payment Method"
					options={paymentOptions}
					selectedOption={paymentMethod}
					onSelect={setPaymentMethod}
				/>
			</View>
			<MapModal
				visible={isMapVisible}
				onClose={() => setIsMapVisible(false)}
				onSaveLocation={handleSaveLocation}
			/>
			<View className="mt-auto">
				<Text className="text-xl font-bold">
					Total: ₱{totalPrice.toFixed(2)}
				</Text>
				<Button title="Continue" onPress={handleContinue} />
			</View>
			<ReusableModal
				visible={isSummaryVisible}
				onClose={() => {
					setIsSummaryVisible(false);
					router.push("/orders"); // Navigate to orders page
				}}
			>
				<View className="p-4">
					<Text className="text-2xl font-bold mb-4 text-center">
						Order Summary
					</Text>
					<Text className="text-xl font-bold mb-4">Order List</Text>
					{selectedProducts.map((product, index) => (
						<View key={index} className="flex-row mb-4 p-2 border rounded-lg">
							<Image
								source={{ uri: product.image }}
								className="w-24 h-24 rounded-lg"
							/>
							<View className="flex-1 ml-4">
								<Text className="text-lg">{product.name}</Text>
								<Text className="text-md">Qty: {product.Qty}</Text>
								<Text className="text-md">Price: ₱{product.price}</Text>
							</View>
						</View>
					))}
					<Text className="text-lg mt-4">Shipping Address: {address}</Text>
					<Text className="text-lg">Payment Method: {paymentMethod}</Text>
					<Text className="text-xl font-bold mt-4">
						Total: ₱{totalPrice.toFixed(2)}
					</Text>
					<Button title="Place Order" onPress={handlePlaceOrder} />
				</View>
			</ReusableModal>
		</View>
	);
};

export default Checkout;
