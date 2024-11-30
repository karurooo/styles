import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ProductType } from "~/types";
import { useProductStore } from "~/store/products";
import AlertModal from "./Alert";

interface ProductProps {
	product: ProductType;
	onPress: () => void;
}

const Product: React.FC<ProductProps> = ({ product, onPress }) => {
	const [alertVisible, setAlertVisible] = useState(false);
	const addToCart = useProductStore((state) => state.addToCart);

	const handleAddToCart = () => {
		const productWithDefaultQty = { ...product, Qty: 1 };
		addToCart(productWithDefaultQty);
		setAlertVisible(true);
	};

	const imageSource = product.image
		? { uri: product.image }
		: require("~/assets/images/profile_pic_placeholder.jpg");

	return (
		<View className="w-1/2 p-2">
			<TouchableOpacity
				onPress={onPress}
				accessible={true}
				accessibilityLabel={`View details for ${product.name}`}
			>
				<View className="h-72 w-full rounded-xl justify-center items-center border overflow-hidden">
					<View className="h-2/3 w-full justify-center items-center relative bg-secondary ">
						<Image
							source={imageSource}
							className="w-full h-full rounded-lg "
							resizeMode="contain"
							onError={(e) =>
								console.error("Image load error: ", e.nativeEvent.error)
							}
						/>
					</View>

					<View className="w-full px-4 h-1/3">
						<View className="">
							<Text
								className="text-lg font-bold font-Poppins text-black"
								numberOfLines={1}
							>
								{product.name}
							</Text>
							<Text className="text-md text-black">Qty: {product.Qty}</Text>
						</View>
						<View className="flex-row justify-between items-center my-1">
							<Text className="font-bold text-2xl text-black">
								₱{product.price}
							</Text>
							<TouchableOpacity
								className="bg-primary rounded-full h-8 w-8 justify-center items-center"
								onPress={handleAddToCart}
								accessible={true}
							>
								<MaterialCommunityIcons name="cart" size={16} color="white" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			<AlertModal
				isVisible={alertVisible}
				onClose={() => setAlertVisible(false)}
				message="Product added to cart successfully!"
				type="success"
			/>
		</View>
	);
};

export default Product;
