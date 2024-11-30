import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ReusableModal from "./Modal";
import { ProductType } from "~/types";

interface OrderSummaryProps {
	visible: boolean;
	onClose: () => void;
	products: ProductType[];
	totalPrice: number;
	address: string;
	paymentMethod: string;
	onCancelOrder: () => void; // Add onCancelOrder prop
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
	visible,
	onClose,
	products,
	totalPrice,
	address,
	paymentMethod,
	onCancelOrder, // Destructure onCancelOrder prop
}) => {
	return (
		<ReusableModal
			visible={visible}
			onClose={() => {
				onClose();
				onCancelOrder(); // Call onCancelOrder when modal is closed
			}}
		>
			<View className="p-4">
				<Text className="text-2xl font-bold mb-4 text-center">
					Order Summary
				</Text>
				<Text className="text-xl font-bold mb-4">Order List</Text>
				{products.map((product, index) => (
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
				<View className="mt-4">
					<TouchableOpacity
						onPress={onClose}
						className="bg-primary h-10 w-full flex-row items-center justify-center rounded-xl"
					>
						<Text className="text-center text-white">Place Order</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ReusableModal>
	);
};

export default OrderSummary;
