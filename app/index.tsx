import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	useWindowDimensions,
	ImageBackground,
	Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Container } from "@/components/Container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const slides = [
	{
		id: "1",
		title: "Easy, Perfect & Custom Fit",
		description:
			"Discover nearby tailor shops to elevate your style with a perfect, custom fit in every occasion.",
		image: require("../assets/images/tailor-landing.jpg"), // Replace with your image
	},
	{
		id: "2",
		title: "Hassle-Free Shopping Experience",
		description:
			"With endless choices of fabrics, styles, and designs to choose from numerous tailor shops.",
		image: require("../assets/images/shopping.jpg"), // Replace with your image
	},
	{
		id: "3",
		title: "Secure and Easy Payment",
		description:
			"Pay securely and easily with various payment methods available in the app.",
		image: require("../assets/images/payment.jpg"), // Replace with your image
	},
];

export default function Welcome() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const router = useRouter();
	const { width } = useWindowDimensions(); // Add this line to get the width
	const flatListRef = useRef<FlatList>(null); // Add a ref to the FlatList
	const scrollX = useRef(new Animated.Value(0)).current; // Add Animated.Value

	useEffect(() => {
		const listener = scrollX.addListener(({ value }) => {
			const slideIndex = Math.round(value / width);
			setCurrentIndex(slideIndex);
		});
		return () => {
			scrollX.removeListener(listener);
		};
	}, [scrollX, width]);

	const handleNext = () => {
		if (currentIndex < slides.length - 1) {
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			flatListRef.current?.scrollToIndex({ index: nextIndex }); // Scroll to the next slide
		} else {
			router.push("/"); // Navigate to signup
			console.log("Navigating to signup");
		}
	};

	const handleSkip = () => {
		router.push("//"); // Navigate to signup
		console.log("Navigating to skip to signup");
	};

	const renderItem = ({ item }: { item: any }) => (
		<View className="items-center justify-center bg-white " style={{ width }}>
			<ImageBackground
				source={item.image}
				className="absolute top-0 h-1/2 w-full  "
				resizeMode="cover"
			/>
			<View className="h-1/2"></View>
			<View className="h-1/2 w-full justify-center rounded-t-[50px] bg-[#D9D9D9] px-4">
				<Text className="mt-6 text-center text-4xl font-bold font-Poppins mx-4">
					{item.title}
				</Text>
				<Text className="mt-4 text-center text-base text-gray-600 font-Poppins">
					{item.description}
				</Text>
			</View>
		</View>
	);

	return (
		<View className="flex-1 bg-gray-100">
			<Animated.FlatList
				ref={flatListRef} // Attach the ref to the FlatList
				data={slides}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false },
				)}
				keyExtractor={(item) => item.id}
			/>
			{/* Footer Navigation */}
			<View className="absolute bottom-6 w-full px-6">
				<View className="flex-row items-center justify-between">
					{currentIndex < slides.length - 1 ? (
						<TouchableOpacity onPress={handleSkip}>
							<Text className="text-sm font-semibold text-gray-700">Skip</Text>
						</TouchableOpacity>
					) : (
						<View style={{ width: 25 }} /> // Placeholder to maintain layout
					)}
					<View className="flex-row gap-2">
						{slides.map((_, index) => {
							const scale = scrollX.interpolate({
								inputRange: [
									(index - 1) * width,
									index * width,
									(index + 1) * width,
								],
								outputRange: [1, 1.5, 1],
								extrapolate: "clamp",
							});
							const backgroundColor = scrollX.interpolate({
								inputRange: [
									(index - 1) * width,
									index * width,
									(index + 1) * width,
								],
								outputRange: ["#ffffff", "#FF735C", "#ffffff"],
								extrapolate: "clamp",
							});
							return (
								<Animated.View
									key={index}
									style={{ transform: [{ scale }], backgroundColor }}
									className="h-3 w-3 rounded-full"
								/>
							);
						})}
					</View>
					<TouchableOpacity
						onPress={handleNext}
						className="bg-primary h-12 w-12 rounded-full justify-center items-center"
					>
						<MaterialIcons name="navigate-next" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
