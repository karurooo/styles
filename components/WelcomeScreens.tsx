import { useState, useEffect } from "react";
import { Container } from "../components/Container";
import {
	Text,
	View,
	ImageBackground,
	Image,
	TouchableOpacity,
} from "react-native";
// import SplashAnimation from "~/components/SplashAnimation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Button } from "../components/Button";

export default function WelcomeScreens() {
	const [isSplashVisible, setIsSplashVisible] = useState(true);
	const router = useRouter();

	const browse = () => {
		router.push("/");
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSplashVisible(false);
		}, 4000); // 4 seconds

		return () => clearTimeout(timer);
	}, []);

	// if (isSplashVisible) {
	// 	return <SplashAnimation />;
	// }

	return (
		<View>
			<ImageBackground
				source={require("../assets/images/tailor-landing.jpg")}
				className="absolute h-1/2 w-full overflow-hidden rounded-br-[120px] "
			/>
			<View className="h-1/2"></View>
			<View className="h-1/2 w-full justify-center rounded-t-[50px] bg-[#D9D9D9] px-4">
				<Text className=" font-Poppins text-center text-4xl font-bold">
					Easy, Perfect & {"\n"}Custom Fit
				</Text>
				<Text className="font-Poppins mt-4 text-center text-lg">
					Discover nearby tailor shops to elevate your style with a perfect,
					custom fit in every occasion.
				</Text>
				<View className="mx-2 my-6 flex flex-row items-center justify-between ">
					<TouchableOpacity>
						<Text>Skip</Text>
					</TouchableOpacity>
					<View className="flex flex-row items-center justify-center">
						{[...Array(3)].map((_, index) => (
							<TouchableOpacity
								key={index}
								className="h-4 w-4 mx-1 rounded-full justify-center items-center bg-primary"
							></TouchableOpacity>
						))}
					</View>
					<TouchableOpacity className="h-12 w-12 rounded-full  justify-center items-center bg-primary">
						<MaterialIcons name="navigate-next" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
