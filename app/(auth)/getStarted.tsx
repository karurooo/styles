import { Container } from "~/components/Container";
import { useRouter } from "expo-router";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AlertModal from "~/components/Alert";
import { useState } from "react";
import { Button } from "~/components/Button";
import { useUserStore } from "~/store/users";

export default function GetStarted() {
	const userStore = useUserStore();
	const router = useRouter();
	const toBack = () => {
		router.back();
	};
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const toCustomer = () => {
		userStore.setRole("customer");
		router.push("/signup");

		console.log(userStore.role);
	};

	const toSeller = () => {
		userStore.setRole("seller");
		router.push("/signup");
		console.log(userStore.role);
	};

	return (
		<Container>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
				style={{ flex: 1 }}
			>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<TouchableOpacity
						className="absolute top-3 left-5 justify-center items-center rounded-full h-10 w-10 bg-secondary"
						onPress={toBack}
					>
						<MaterialIcons name="navigate-before" size={24} color="black" />
					</TouchableOpacity>

					<View className="flex h-1/6  w-full items-center justify-center ">
						<Image
							source={require("~/assets/images/Logo.png")}
							className="h-20 w-56"
						/>
					</View>

					<View className="w-full h-4/5 px-6 ">
						<View className="mb-4">
							<Text className="font-Poppins text-4xl font-bold mb-2">
								Which Stich?
							</Text>
							<Text className="font-Poppins text-lg text-gray-500">
								Select your role
							</Text>
						</View>
						<View className="  gap-2">
							<Button title="Customer" onPress={toCustomer} />
							<TouchableOpacity
								className="bg-secondary mt-2 h-10 w-full flex-row items-center justify-center rounded-xl "
								onPress={toSeller}
							>
								<Text className="font-Poppins mr-2 text-black">Seller</Text>
							</TouchableOpacity>
						</View>
					</View>
					<AlertModal
						isVisible={showError}
						onClose={() => setShowError(false)}
						message={errorMessage || "An error occurred during signup."}
						type="error"
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</Container>
	);
}
