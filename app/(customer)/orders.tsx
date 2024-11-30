import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useOrderStore } from "../../store/orders"; // Ensure this path is correct
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function OrdersPage() {
	const orders = useOrderStore((state) => state.orders);
	const router = useRouter();

	const toBack = () => {
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
			<Text className="text-2xl font-bold mb-4 text-center">My Orders</Text>
			<ScrollView>
				{orders.map((order, index) => (
					<View key={index} className="mb-4 p-4 border rounded-lg">
						<Text className="text-lg font-bold">Order #{order.id}</Text>
						<Text className="text-md">Date: {order.date}</Text>
						<Text className="text-md">
							Total: ₱{order.totalPrice.toFixed(2)}
						</Text>
						<View className="mt-2">
							{order.products.map((product, idx) => (
								<View key={idx} className="flex-row mb-2">
									<Image
										source={{ uri: product.image }}
										className="w-16 h-16 rounded-lg"
									/>
									<View className="ml-4">
										<Text className="text-md">{product.name}</Text>
										<Text className="text-md">Qty: {product.Qty}</Text>
										<Text className="text-md">Price: ₱{product.price}</Text>
									</View>
								</View>
							))}
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
