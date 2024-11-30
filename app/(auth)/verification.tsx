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
import { Container } from "~/components/Container"; // Updated import path
import { Button } from "~/components/Button";
import { useRouter, Navigator } from "expo-router";
import { useInputFields } from "~/constants/inputFields";
import { useUserStore } from "~/store/users";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { OtpInput } from "~/components/OtpInput";
import { useTimer } from "~/utils/timer";
import { verificationOtp } from "~/services/auth/verification";
import { resendOtp } from "~/services/auth/resendOtp";
import { handleError } from "~/utils/handleError";
import { signIn } from "~/services/auth/signin"; // Import signIn function

export default function Verification() {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showApplySellerModal, setShowApplySellerModal] = useState(false); // State for ApplySeller modal
	const userStore = useUserStore();
	const userEmail = userStore.email;
	const [loading, setLoading] = useState(false); // Add loading state
	const [isChecked, setIsChecked] = useState(false); // Add state for checkbox
	const [otp, setOtp] = useState(""); // Add otp state
	const router = useRouter();
	const { timeLeft, resetTimer } = useTimer(60);
	const inputFields = useInputFields();

	const handleVerify = async () => {
		setLoading(true);
		try {
			await verificationOtp(otp, userEmail, setShowError, setErrorMessage);
		} catch (error) {
			handleError(error, setErrorMessage, setShowError);
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		resetTimer();
		try {
			const error = await resendOtp(userEmail);
			if (error) {
				throw new Error(error);
			}
		} catch (error) {
			handleError(error, setErrorMessage, setShowError);
		}
	};

	const handleVerification = async (email: string, password: string) => {
		await signIn(
			{ email, password },
			setShowError,
			setErrorMessage,
			setShowApplySellerModal, // Pass setShowApplySellerModal
		);
	};

	const toLogin = () => {
		router.push("/signin");
	};
	const toBack = () => {
		router.back();
	};
	return (
		<Container>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined} // Adjust behavior
				style={{ flex: 1 }}
			>
				<View className="flex h-2/3 justify-center overflow-hidden mx-4">
					{/* Adjust layout */}
					<TouchableOpacity
						className="absolute top-3 left-4 justify-center items-center rounded-full h-10 w-10 z-20 bg-secondary"
						onPress={toBack}
					>
						<MaterialIcons name="navigate-before" size={24} color="black" />
					</TouchableOpacity>
					<View className="absolute top-10 w-full items-center justify-center">
						<Image
							source={require("~/assets/images/Logo.png")}
							className="h-20 w-56"
						/>
					</View>
					<View className="mt-14 h-1/3 justify-end gap-2">
						<Text className="text-center font-Poppins text-xl text-black">
							A 6-digit otp code has been sent to{" "}
							<Text className="text-darkBlac">{userEmail}</Text>
						</Text>
						<View className="h-20 justify-center">
							<OtpInput setOtp={setOtp} /> {/* Pass setOtp to OtpInput */}
						</View>
						<View className="flex-row justify-center">
							{timeLeft > 0 && (
								<Text className="text-center text-md text-black">
									Resend OTP in {timeLeft} seconds
								</Text>
							)}
						</View>
					</View>
					<View className="h-1/3 justify-end gap-2 overflow-hidden mx-6">
						<Button title="Verify" onPress={handleVerify} />
						{timeLeft === 0 && (
							<TouchableOpacity onPress={handleResend}>
								<Text className=" text-center font-Poppins text-md text-[#0000FF] underline">
									Resend OTP
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
				<AlertModal
					isVisible={showError}
					onClose={() => setShowError(false)}
					message={errorMessage || "An error occurred during signup."}
					type="error"
				/>
			</KeyboardAvoidingView>
		</Container>
	);
}
