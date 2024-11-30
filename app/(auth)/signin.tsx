import React, { useState } from "react";
import { Container } from "~/components/Container";
import { Button } from "~/components/Button";
import {
	Image,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from "react-native";
import AlertModal from "~/components/Alert";
import InputField from "~/components/InputField";
import { useRouter } from "expo-router";
import { useInputFields } from "~/constants/inputFields";
import { useUserStore } from "~/store/users";
import { signIn } from "~/services/auth/signin";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "~/context/AuthContext";
import { handleError } from "~/utils/handleError";

export default function Signin() {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const inputFields = useInputFields().filter(
		(field) => field.label === "Email *" || field.label === "Password *",
	);
	const userStore = useUserStore();
	const { checkAuth, showAlert } = useAuth();

	const handleSignin = async () => {
		setLoading(true);
		try {
			await signIn(userStore, setShowError, setErrorMessage);
			await checkAuth();
		} catch (error) {
			handleError(error, setErrorMessage, setShowError);
			showAlert(errorMessage, "error");
		} finally {
			setLoading(false);
		}
	};

	const toSignup = () => {
		router.push("/signup");
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
								Welcome Back
							</Text>
							<Text className="font-Poppins text-lg text-gray-500">
								Sign in to your account
							</Text>
						</View>
						<View className="h-2/3 w-full justify-start my-4">
							{inputFields.map((field, index) => (
								<InputField
									key={index}
									placeholder={field.placeholder}
									value={field.value}
									onChangeText={field.onChangeText}
									isPassword={field.isPassword}
								/>
							))}
							<Text
								className="text-blue underline font-Poppins text-center mt-"
								onPress={() => console.log("Forgot Password pressed")}
							>
								Forgot Password
							</Text>
							<View className="flex-row items-center justify-center w-full my-2"></View>
							<View className="flex justify-center items-center ">
								<Button title="Sign In" onPress={handleSignin} />
								<Text className="text-gray-500 font-Poppins my-2">
									Don't have an account?{" "}
									<Text
										onPress={toSignup}
										className="text-md mb-1 font-Poppins font-bold text-blue underline"
									>
										Sign Up
									</Text>
								</Text>
							</View>
						</View>

						<View></View>
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
