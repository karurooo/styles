import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSellerStore } from "~/store/sellers";
import { fetchProductsByStoreId } from "~/services/products/product";
import { handleError } from "~/utils/handleError";
import { useProductStore } from "~/store/products";
import { ProductType } from "~/types";

interface MyProductProps {
	product: ProductType;
	onPress: () => void;
	onClose: () => void;
}

const MyProduct: React.FC<MyProductProps> = ({ product, onPress }) => {
	const sellerStore = useSellerStore();
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]); // Add this line

	useEffect(() => {
		const loadProducts = async () => {
			const result = await fetchProductsByStoreId(
				sellerStore.store_id,
				setErrorMessage,
				setShowError,
			);
			if (typeof result === "string") {
				handleError({ message: result }, setErrorMessage, setShowError);
			} else {
				setProducts(result);
			}
		};

		loadProducts();
	}, [sellerStore.store_id]);
	const imageSource = product.image
		? { uri: product.image }
		: require("~/assets/images/profile_pic_placeholder.jpg");

	return (
		<View className="flex-1 p-4">
			<Text className="text-2xl font-bold mb-4">My Listings</Text>
			{showError && <Text className="text-red-500">{errorMessage}</Text>}
			<ScrollView>
				{products.map((product: ProductType) => (
					<View
						key={product.id}
						className="p-4 bg-secondary rounded-xl mt-2 flex-row gap-4 items-center"
					>
						<Image
							source={
								product.image
									? { uri: product.image }
									: require("~/assets/images/profile_pic_placeholder.jpg")
							}
							className="w-28 h-28 rounded-lg border "
							resizeMode="contain"
							onError={(e) =>
								console.error("Image load error: ", e.nativeEvent.error)
							}
						/>
						<View>
							<Text className="text-lg font-bold w-1/2" numberOfLines={2}>
								{product.name}
							</Text>
							<Text>Price: ₱{product.price}</Text>
							<Text>Qty: {product.Qty}</Text>
							<Text className="w-36" numberOfLines={2}>
								{product.description}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default MyProduct;
