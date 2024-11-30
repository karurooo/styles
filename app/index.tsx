import "react-native-get-random-values";
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
import { Container } from "~/components/Container";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; // Import the icon component
import { useUserStore } from "~/store/users";
import CustomSplash from "~/components/CustomSplash"; // Import the CustomSplash component
import { Button } from "~/components/Button";

const slides = [
	{
		id: "1",
		title: "Easy, Perfect & Custom Fit",
		description:
			"Helps you find the finest tailors in your area, known for their exceptional craftsmanship and attention to detail..",
		image: require("../assets/images/tailor-landing.jpg"),
		icon: (
			<MaterialCommunityIcons name="tape-measure" size={50} color="black" />
		),
	},
	{
		id: "2",
		title: "Hassle-Free Shopping",
		description:
			"With endless choices of fabrics, styles, and designs to choose from numerous tailor shops.",
		image: require("../assets/images/shopping.jpg"),
		icon: (
			<MaterialCommunityIcons name="cart-outline" size={50} color="black" />
		),
	},
	{
		id: "3",
		title: "Secure and Easy Payment",
		description:
			"Pay securely and easily with various payment methods available in the app.",
		image: require("../assets/images/payment.jpg"),
		icon: (
			<MaterialCommunityIcons
				name="credit-card-check-outline"
				size={50}
				color="black"
			/>
		),
	},
	{
		id: "4",
		title: "A World of Tailored Convenience",
		description:
			"     Discover nearby tailor shops dedicated to elevating your style with a perfect, custom fit.",
		image: require("../assets/images/last_page.jpg"),
		icon: (
			<MaterialCommunityIcons
				name="storefront-outline"
				size={50}
				color="black"
			/>
		),
	},
];

export default function Welcome() {
	const [isSplashVisible, setIsSplashVisible] = useState(true); // Add state to manage splash visibility
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

	const handleSplashFinish = () => {
		setIsSplashVisible(false); // Hide splash screen when finished
	};

	if (isSplashVisible) {
		return <CustomSplash onFinish={handleSplashFinish} />; // Show splash screen if visible
	}

	const handleNext = () => {
		if (currentIndex < slides.length - 1) {
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			flatListRef.current?.scrollToIndex({ index: nextIndex }); // Scroll to the next slide
		} else {
			router.push("/getStarted"); // Navigate to signup
			console.log("Navigating to signup");
		}
	};

	const handleSkip = () => {
		const lastIndex = slides.length - 1;
		setCurrentIndex(lastIndex);
		flatListRef.current?.scrollToIndex({ index: lastIndex }); // Scroll to the last slide
	};

	const renderItem = ({ item }: { item: any }) => (
		<View className="items-center justify-center bg-white " style={{ width }}>
			<ImageBackground
				source={item.image}
				className="absolute top-0 h-1/2 w-full  "
				resizeMode="cover"
			/>
			<View className="h-1/2"></View>
			<View className="h-1/2 w-full justify-center items-center rounded-t-[50px] bg-secondary px-4 pb-12">
				{item.icon && (
					<View className="mb-4 justify-center items-center">{item.icon}</View>
				)}
				{/* Render icon if available */}
				<Text className="text-center text-4xl font-bold font-Poppins mx-4">
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
			<View className="absolute bottom-6 w-full px-6">
				<View className="flex-row items-center justify-between">
					{/* Conditional rendering based on the currentIndex */}
					{currentIndex < slides.length - 1 ? (
						// Show navigation controls for non-final slides
						<>
							<TouchableOpacity onPress={handleSkip}>
								<Text className="text-sm font-semibold text-gray-700">
									Skip
								</Text>
							</TouchableOpacity>
							<View className="flex-1 flex-row justify-center items-center gap-2">
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
											className="h-2 w-2 rounded-full"
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
						</>
					) : (
						// Show sign-up/sign-in buttons only on the final slide
						currentIndex === slides.length - 1 && (
							<View className="flex-row justify-between w-full">
								<Button title="Get Started" onPress={handleNext} />
							</View>
						)
					)}
				</View>
			</View>
		</View>
	);
}
