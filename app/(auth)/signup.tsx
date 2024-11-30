import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import AlertModal from "../../components/Alert";
import { Container } from "~/components/Container";
import { Button } from "~/components/Button";
import { useRouter, Navigator } from "expo-router";
import { useInputFields } from "~/constants/inputFields";
import { useUserStore } from "~/store/users";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InputField from "~/components/InputField";
import { CheckBox } from "react-native-elements";
import { signUp } from "~/services/auth/signup";
import { useAuth } from "~/context/AuthContext"; // Import useAuth
import { handleError } from "~/utils/handleError";

export default function Signup() {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const router = useRouter();

	const inputFields = useInputFields().filter(
		(field) =>
			field.label === "First Name *" ||
			field.label === "Last Name *" ||
			field.label === "Email *" ||
			field.label === "Password *" ||
			field.label === "Confirm Password *",
	);
	const userStore = useUserStore();

	const handleSignup = async () => {
		setLoading(true);
		try {
			await signUp(userStore, setShowError, setErrorMessage, isChecked); // Add comma
		} catch (error) {
			handleError(error, setErrorMessage, setShowError);
		} finally {
			setLoading(false);
		}
	};

	// if (loading) {
	//   return <Loading />;
	// }

	const toLogin = () => {
		router.push("/signin");
	};
	const toBack = () => {
		router.back();
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

					<View className="w-full h-4/5 px-6">
						<View className="mb-4">
							<Text className="font-Poppins text-4xl font-bold mb-2">
								Create an account
							</Text>
							<Text className="font-Poppins text-lg text-gray-500">
								Sign up to get started
							</Text>
						</View>
						<View className="h-2/3 w-full justify-center my-4">
							{inputFields.map((field, index) => (
								<InputField
									key={index}
									placeholder={field.placeholder}
									value={field.value}
									onChangeText={field.onChangeText}
									isPassword={field.isPassword} // Ensure this line is present
								/>
							))}
							<View className="flex-row items-center justify-center w-full  h-[60px]">
								<CheckBox
									checked={isChecked}
									onPress={() => setIsChecked(!isChecked)}
								/>
								<Text className="text-gray-500 font-Poppins text-sm mr-6 ">
									By signing up, you agree to our{" "}
									<Text className="text-blue font-bold underline">
										Terms of Service
									</Text>
									{"\n"}and{" "}
									<Text className="text-blue font-bold underline">
										Privacy Policy
									</Text>
								</Text>
							</View>
						</View>

						<View className="flex justify-center items-center ">
							<Button title="Sign Up" onPress={handleSignup} />
							<Text className="text-gray-500 font-Poppins my-2">
								Already have an account?{" "}
								<Text
									onPress={toLogin}
									className="text-md mb-1 font-Poppins font-bold text-blue underline"
								>
									Sign In
								</Text>
							</Text>
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
