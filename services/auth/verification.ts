import { supabase } from "~/utils/supabase";
import { router } from "expo-router";

export const verificationOtp = async (
	otp: string,
	userEmail: string,
	setShowError: (show: boolean) => void,
	setErrorMessage: (message: string) => void,
) => {
	try {
		const { error } = await supabase.auth.verifyOtp({
			email: userEmail,
			token: otp, // Ensure this is correctly passed
			type: "signup",
		});

		if (error) {
			throw error;
		} else {
			router.push("/signin");
		}
	} catch (error) {
		const errorMessage = (error as Error).message;
		setErrorMessage(errorMessage);
		setShowError(true);
		throw error;
	}
};
