import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useMemo, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { ProductType } from "~/types";

interface SearchProps {
	products: ProductType[];
	onFilteredProducts: (filteredProducts: ProductType[]) => void;
}

const Search: React.FC<SearchProps> = ({ products, onFilteredProducts }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState("name");
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const filteredProducts = useMemo(() => {
		let filtered = products.filter((product) =>
			product.name.toUpperCase().includes(searchQuery.toUpperCase()),
		);

		if (sortOption === "price") {
			filtered = filtered.sort((a, b) => a.price - b.price);
		} else if (sortOption === "name") {
			filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
		}

		return filtered;
	}, [products, searchQuery, sortOption]);

	useEffect(() => {
		onFilteredProducts(filteredProducts);
	}, [filteredProducts, onFilteredProducts]);

	return (
		<View className="flex-row items-center mb-2.5 border border-secondary rounded-lg w-full">
			<TouchableOpacity
				className="h-12 w-12 justify-center items-center mr-2.5 border-r-0 rounded-xl"
				onPress={() => setDropdownVisible(!dropdownVisible)}
			>
				<Ionicons name="filter" size={24} color="black" />
			</TouchableOpacity>
			{dropdownVisible && (
				<View className="absolute top-12 left-0 w-36 bg-white border border-gray-300 rounded z-10">
					<TouchableOpacity
						className="p-2.5"
						onPress={() => {
							setSortOption("name");
							setDropdownVisible(false);
						}}
					>
						<Text>Sort by Name</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="p-2.5"
						onPress={() => {
							setSortOption("price");
							setDropdownVisible(false);
						}}
					>
						<Text>Sort by Price</Text>
					</TouchableOpacity>
				</View>
			)}
			<TextInput
				className="flex-1 h-12  px-2.5 rounded-xl"
				placeholder="Search by name"
				value={searchQuery}
				onChangeText={setSearchQuery}
			></TextInput>
		</View>
	);
};

export default Search;
