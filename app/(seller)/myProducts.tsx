import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSellerStore } from "~/store/sellers";
import { fetchProductsByStoreId } from "~/services/products/product";
import { handleError } from "~/utils/handleError";
import { useProductStore } from "~/store/products";
import { ProductType } from "~/types";
import AddProduct from "~/components/AddProduct";
import ReusableModal from "~/components/Modal";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AlertModal from "~/components/Alert";

interface MyProductProps {
	product: ProductType;
	onPress: () => void;
	onClose: () => void;
}

const MyProduct: React.FC<MyProductProps> = ({ product, onPress }) => {
	const router = useRouter();
	const sellerStore = useSellerStore();
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);
	const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
	const [isAlertVisible, setAlertVisible] = useState(false);

	const handleAddProductClose = () => {
		setAddProductModalVisible(false);
	};

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
	const imageSource = product?.image
		? { uri: product.image }
		: require("~/assets/images/profile_pic_placeholder.jpg");

	const toBack = () => {
		console.log("Back button pressed");
		router.back();
	};

	return (
		<View className="flex-1 p-4 w-full">
			<AlertModal
				isVisible={isAlertVisible}
				onClose={() => {
					setAlertVisible(false);
					router.back();
				}}
				message="Please fill up your store profile first."
				type="error"
			/>
			<View className="flex-row items-center justify-between mb-2  w-full px-2 gap-2 ">
				<TouchableOpacity
					className="justify-center items-center rounded-full h-10 w-10 bg-secondary z-10"
					onPress={toBack}
				>
					<MaterialIcons name="navigate-before" size={24} color="black" />
				</TouchableOpacity>
				<Text className="text-2xl font-bold text-center">My Listings</Text>
				<TouchableOpacity
					className="bg-primary rounded-xl h-10 w-10 justify-center items-center"
					onPress={() => setAddProductModalVisible(true)}
				>
					<View className="flex-1 justify-center items-center">
						<MaterialIcons name="add" size={18} color="white" />
					</View>
				</TouchableOpacity>
			</View>

			{showError && <Text className="text-red-500">{errorMessage}</Text>}
			<ScrollView>
				{products.map((product: ProductType) => (
					<View
						key={product.id}
						className="p-4 bg-secondary rounded-xl mt-2 flex-row gap-4 items-center"
					>
						<Image
							source={
								product?.image
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
								{product?.name}
							</Text>
							<Text>Price: ₱{product?.price}</Text>
							<Text>Qty: {product?.Qty}</Text>
							<Text className="w-36" numberOfLines={2}>
								{product?.description}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>

			<ReusableModal
				visible={isAddProductModalVisible}
				onClose={handleAddProductClose}
			>
				<AddProduct onClose={handleAddProductClose} />
			</ReusableModal>
		</View>
	);
};

export default MyProduct;
