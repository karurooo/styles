import React, { useState, useEffect, useMemo } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { goBack } from "expo-router/build/global-state/routing";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from "react-native";
import { Container } from "~/components/Container";
import { useRouter } from "expo-router";
import ProtectedRoute from "../(auth)/protectedRoute";
import Product from "~/components/Products";
import ProductDetails from "~/components/ProductDetails";
import { ProductType } from "~/types";
import { useProductStore } from "~/store/products";
import { fetchProducts } from "~/services/products/product";
import Search from "~/components/Search";
import ReusableModal from "~/components/Modal";
import MyCart from "~/components/MyCart";

export default function Home() {
	const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
		null,
	);
	const products = useProductStore((state) => state.products);
	const setProductStore = useProductStore((state) => state.setProducts);
	const [filteredProducts, setFilteredProducts] =
		useState<ProductType[]>(products);
	const [isCartVisible, setIsCartVisible] = useState(false);

	useEffect(() => {
		const loadProducts = async () => {
			const result = await fetchProducts(
				(message) => console.error(message),
				(show) => console.error(show),
			);
			if (Array.isArray(result)) {
				setProductStore(result);
			}
		};
		loadProducts();
	}, [setProductStore]);

	const handleProductPress = (product: ProductType) => {
		console.log("Selected product: ", product); // Add this line to debug selected product
		setSelectedProduct(product);
	};

	const handleCloseDetails = () => {
		setSelectedProduct(null);
	};

	return (
		<ProtectedRoute>
			<Container>
				<View className="flex-1 w-full ">
					<View className="flex-row items-center justify-between h-[8%] w-full px-2 gap-2 mb-2">
						<View className="flex-1 mt-3">
							<Search
								products={products}
								onFilteredProducts={setFilteredProducts}
							/>
						</View>
						<TouchableOpacity
							className="bg-primary rounded-xl h-12 w-12 justify-center items-center"
							onPress={() => setIsCartVisible(true)}
						>
							<View className="flex-1 justify-center items-center">
								<MaterialIcons name="shopping-cart" size={20} color="white" />
							</View>
						</TouchableOpacity>
					</View>
					<View className="h-full justify-center items-center w-full">
						<ScrollView
							contentContainerStyle={{
								flexDirection: "row",
								flexWrap: "wrap",
								justifyContent: "center",
								paddingBottom: 60,
							}}
						>
							{filteredProducts.map((product) => (
								<Product
									key={product.id}
									product={product}
									onPress={() => handleProductPress(product)}
								/>
							))}
						</ScrollView>
					</View>
					{selectedProduct && (
						<ProductDetails
							product={selectedProduct}
							onClose={handleCloseDetails}
							visible={!!selectedProduct}
						/>
					)}
					<ReusableModal
						visible={isCartVisible}
						onClose={() => setIsCartVisible(false)}
					>
						<MyCart />
					</ReusableModal>
				</View>
			</Container>
		</ProtectedRoute>
	);
}
