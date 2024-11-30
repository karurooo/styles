import { supabase } from "~/utils/supabase";
import { useUserStore } from "~/store/users";

export const fetchUserByEmail = async (email: string) => {
	console.log("Fetching user by email:", email);
	try {
		const { data, error } = await supabase
			.from("users")
			.select(
				"id, first_name, last_name, email, role, phone_number, password, address, profile_pic", // Include id
			)
			.eq("email", email)
			.single();

		if (error) {
			if (error.code === "PGRST116") {
				console.error("No user found with the provided email.");
			} else {
				console.error("Error fetching user by email:", error);
			}
			return null;
		} else {
			return data;
		}
	} catch (error) {
		console.error("Unexpected error fetching user:", error);
		return null;
	}
};

export const isNewUser = async (email: string): Promise<boolean> => {
	const user = await fetchUserByEmail(email);
	return user === null;
};
