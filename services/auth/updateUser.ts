import { passwordValidation } from "~/utils/passwordValidator";
import { supabase } from "~/utils/supabase";
import React, { useState } from "react"; // Import useState

interface User {
	email: string;
	phone_number?: string;
	address?: string;
	profile_pic?: string;
	password?: string; // Make password optional
}

export const updateUser = async (
	user: User,
	setAlertVisible: (visible: boolean) => void,
	setAlertMessage: (message: string) => void,
	setAlertType: (type: "error" | "confirmation" | "success") => void,
) => {
	try {
		const { data, error } = await supabase
			.from("users")
			.update({
				email: user.email,
				phone_number: user.phone_number,
				address: user.address,
				profile_pic: user.profile_pic,
			})
			.eq("email", user.email);

		if (error) {
			setAlertMessage("Error updating user: " + error.message);
			setAlertType("error");
			setAlertVisible(true);
			throw error;
		}

		if (user.password) {
			const { error: passwordError } = await supabase.auth.updateUser({
				password: user.password,
			});

			if (passwordError) {
				setAlertMessage("Error updating password: " + passwordError.message);
				setAlertType("error");
				setAlertVisible(true);
				throw passwordError;
			}
		}

		setAlertMessage("User updated successfully.");
		setAlertType("success");
		setAlertVisible(true);
		return data;
	} catch (error) {
		console.error("Error updating user:", error);
		setAlertMessage("Error updating user: " + (error as Error).message);
		setAlertType("error");
		setAlertVisible(true);
		return null;
	}
};

export const uploadProfilePic = async (
	identifier: string,
	uri: string,
): Promise<string | null> => {
	try {
		console.log(
			"Uploading profile pic with identifier:",
			identifier,
			"and URI:",
			uri,
		);
		if (!identifier || !uri) throw new Error("Missing identifier or image URI");

		const response = await fetch(uri);
		if (!response.ok) {
			console.error(`Failed to fetch image: ${response.status}`);
			throw new Error(`Failed to fetch image: ${response.status}`);
		}

		const blob = await response.blob();
		console.log("Blob created:", blob);

		const { data, error } = await supabase.storage
			.from("profile_pics")
			.upload(`${identifier}/profile_pic.jpg`, blob, {
				cacheControl: "3600",
				upsert: true,
			});

		if (error) {
			console.error("Supabase storage upload error:", error.message);
			throw error;
		}

		console.log("Upload response data:", data);

		const { publicUrl } = supabase.storage
			.from("profile_pics")
			.getPublicUrl(`${identifier}/profile_pic.jpg`).data;

		if (!publicUrl) {
			console.error("Failed to generate public URL");
			throw new Error("Failed to generate public URL");
		}

		return publicUrl;
	} catch (error) {
		console.error("Error uploading profile picture:", error);
		return null;
	}
};

export const updateUserProfilePic = async (
	email: string,
	uri: string,
	setAlert: (message: string, type: "error" | "success") => void,
) => {
	try {
		const publicUrl = await uploadProfilePic(email, uri);
		if (!publicUrl) throw new Error("Failed to upload profile picture");

		const { error } = await supabase
			.from("users")
			.update({ profile_pic: publicUrl })
			.eq("email", email);

		if (error)
			throw new Error(`Failed to update profile picture: ${error.message}`);

		setAlert("Profile picture updated successfully.", "success");
	} catch (error) {
		console.error(error);
		setAlert((error as Error).message, "error");
	}
};
