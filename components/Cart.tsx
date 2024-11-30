import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useProductStore } from "~/store/products";
import { ProductType } from "~/types";

const Cart: React.FC = () => {
	const cartProducts = useProductStore((state) => state.cartProducts);

	return (
		<View className="flex-1 p-4">
			<Text className="text-2xl font-bold mb-4">My Cart</Text>
			<ScrollView>
				{cartProducts.map((product: ProductType) => (
					<View
						key={product.id}
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
	);
};

export default Cart;
