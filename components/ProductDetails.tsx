import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ImageSourcePropType,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { ProductType } from "~/types";
import { Button } from "./Button";
import ReusableModal from "./Modal";
import { useProductStore } from "~/store/products";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkout from "./Checkout";

interface ProductDetailsProps {
	product: ProductType;
	onClose: () => void;
	visible: boolean;
}

const ProductDetails = ({ product, onClose, visible }: ProductDetailsProps) => {
	const imageSource: ImageSourcePropType =
		typeof product.image === "string" ? { uri: product.image } : product.image;

	const addToCart = useProductStore((state) => state.addToCart);
	const [quantity, setQuantity] = useState(1);
	const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

	const handleAddToCart = () => {
		addToCart({
			...product,
			Qty: quantity,
		});
		onClose();
	};

	const handleBuyNow = () => {
		useProductStore.getState().setSelectedProducts([
			{
				...product,
				Qty: quantity,
			},
		]);
		setIsCheckoutVisible(true);
	};

	return (
		<>
			<ReusableModal visible={visible} onClose={onClose}>
				<View className="flex-1  justify-between">
					<Text className="text-2xl font-bold text-center mb-6 font-Poppins">
						Product Details
					</Text>

					{/* ScrollView for the content */}
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View className="h-64 w-full justify-center items-center relative bg-secondary mb-4 rounded-lg">
							<Image
								source={imageSource}
								className="w-full h-full rounded-lg"
								resizeMode="contain"
								onError={(e) =>
									console.error("Image load error: ", e.nativeEvent.error)
								}
							/>
						</View>

						<View className="mb-20">
							<View className="h-1/4 my-4">
								<Text className="font-bold text-3xl">{product.name}</Text>
								<Text className="font-Poppins  text-xl">
									Price:{" "}
									<Text className="text-green-600 text-xl mb-2">
										${product.price}
									</Text>
								</Text>
								<Text>Quantity: {product.Qty}</Text>
							</View>
							<View className="my-2">
								<Text className="text-3xl font-bold mb-2">About Product</Text>
								<Text className="text-gray-700 text-lg">
									{product.description}
								</Text>
							</View>
							<View className="my-2 flex-row items-center justify-between ">
								<Text className="text-xl mr-4 font-Poppins font-bold">
									Quantity:
								</Text>
								<View className="  flex-row flex   items-center justify-center ">
									<TouchableOpacity
										className="h-6 w-6 border  rounded-full justify-center items-center"
										onPress={() => setQuantity(Math.max(1, quantity - 1))}
									>
										<AntDesign name="minus" size={18} color="black" />
									</TouchableOpacity>
									<Text className="mx-2 w-1/3 text-center text-xl bg-secondary rounded-lg">
										{quantity}
									</Text>
									<TouchableOpacity
										className="h-6 w-6 border  rounded-full justify-center items-center"
										onPress={() => setQuantity(quantity + 1)}
									>
										<AntDesign name="plus" size={18} color="black" />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</ScrollView>

					{/* Add to Cart and Buy Now buttons */}
					<View className="flex-row justify-center gap-2 w-full items-center mt-4">
						<TouchableOpacity
							className="h-10 justify-center items-center w-36 rounded-xl border"
							onPress={handleAddToCart}
						>
							<Text className="text-center">Add to Cart</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className="h-10 justify-center items-center w-36 rounded-xl border bg-primary"
							onPress={handleBuyNow}
						>
							<Text className="text-center text-white">Buy Now</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ReusableModal>
			<ReusableModal
				visible={isCheckoutVisible}
				onClose={() => setIsCheckoutVisible(false)}
			>
				<Checkout />
			</ReusableModal>
		</>
	);
};

export default ProductDetails;
