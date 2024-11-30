import { supabase } from "~/utils/supabase";
import { passwordValidation } from "~/utils/passwordValidator";
import { router } from "expo-router";

export const signUp = async (
	userStore: any,
	setShowError: (show: boolean) => void,
	setErrorMessage: (message: string) => void,
	isChecked: boolean, // Add this parameter
) => {
	try {
		if (!passwordValidation(userStore.password)) {
			throw new Error(
				"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
			);
		} else if (userStore.password !== userStore.confirm_password) {
			throw new Error("Passwords do not match.");
		} else if (!isChecked) {
			throw new Error("Please agree to the terms and conditions.");
		}

		const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
			{
				email: userStore.email,
				password: userStore.password,
			},
		);

		if (signUpError) {
			throw signUpError;
		}

		const { data, error } = await supabase.from("users").insert([
			{
				first_name: userStore.first_name,
				last_name: userStore.last_name,
				email: userStore.email,
				password: userStore.password,
				role: userStore.role,
			},
		]);

		if (error) {
			if (
				error.message.includes(
					'duplicate key value violates unique constraint "users_email_key"',
				)
			) {
				throw new Error(
					"This email already exists. Please try a different one.",
				);
			}
			throw error;
		} else {
			router.push("/verification");
		}

		return data;
	} catch (error) {
		const errorMessage = (error as Error).message;
		setErrorMessage(errorMessage);
		setShowError(true);
		throw error;
	}
};
