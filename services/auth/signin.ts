import { supabase } from "~/utils/supabase";
import { router } from "expo-router";
import { useUserStore } from "~/store/users";
import { fetchUserByEmail, isNewUser } from "~/services/auth/fetchUsers"; // Import the isNewUser function
import { useSellerStore } from "~/store/sellers";

// Define the structure of the seller data
interface SellerStore {
	user_id: string;
	store_name: string;
	store_description: string;
	store_location?: string;
	store_profile_pic?: string;
	document_url?: string;
	status?: string;
	store_rating?: number;
	id: string;
	profile_pic?: string;
	owner_id?: string; // Add this line
}

// ...existing code...

export const fetchSeller = async (
	userId: string,
): Promise<SellerStore | null> => {
	try {
		// Validate userId
		if (!userId) {
			throw new Error("User ID is missing.");
		}

		// Fetch seller data from the "stores" table
		const { data, error } = await supabase
			.from("store")
			.select("*")
			.eq("owner_id", userId)
			.single();

		// Handle errors
		if (error) {
			if (error.code === "PGRST116") {
				// No rows returned
				return null;
			}
			console.error(
				"Error fetching seller:",
				error.message,
				error.details,
				error.hint,
			);
			throw error;
		}

		// Save the fetched data into the SellerStore
		const sellerStore: SellerStore = {
			user_id: data.owner_id,
			store_name: data.name,
			store_description: data.description,
			store_location: data.location,
			store_rating: data.rating ?? 0, // Ensure store_rating is a number
			id: data.id,
			profile_pic: data.profile_pic ?? "", // Ensure profile_pic is a string
			document_url: data.document_url ?? "", // Ensure document_url is a string
			status: data.status ?? "", // Ensure status is a string
		};

		// Return the fetched data
		return sellerStore;
	} catch (error) {
		console.error("Unexpected error fetching seller:", error);
		throw error;
	}
};

export const signIn = async (
	{ email, password }: { email: string; password: string },
	setShowError: (show: boolean) => void,
	setErrorMessage: (message: string) => void,
	setShowApplySellerModal: (show: boolean) => void, // Add this line
	showAlert?: (
		message: string,
		type: "error" | "confirmation" | "success",
	) => void,
) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw error;
		} else {
			const userStore = useUserStore.getState();
			const userData = await fetchUserByEmail(email);
			if (!userData) {
				throw new Error("No user found with the provided email.");
			}
			if (userData) {
				const sellerStore = useSellerStore.getState();
				const sellerData = await fetchSeller(userData.id);

				userStore.setUser({
					id: userData.id,
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					role: userData.role,
					password: userData.password,
					phone_number: userData.phone_number ?? "",
					address: userData.address ?? "",
					profile_pic: userData.profile_pic ?? "",
				});

				if (sellerData) {
					sellerStore.setSeller({
						store_id: sellerData.id, // Updated line
						store_name: sellerData.store_name,
						store_description: sellerData.store_description,
						store_location: sellerData.store_location ?? "",
						profile_pic: sellerData.profile_pic ?? "",
						user_id: sellerData.user_id ?? "", // Ensure user_id is a string
						document_url: sellerData.document_url ?? "", // Ensure document_url is a string
						status: sellerData.status ?? "", // Ensure status is a string
						store_rating: sellerData.store_rating ?? 0, // Ensure store_rating is a number
					});
				}

				if (userData.role === "customer") {
					router.push("/home");
				} else {
					const newUser = await isNewUser(userData.email); // Use email instead of id
					if (newUser && userData.role === "seller") {
						setShowApplySellerModal(true); // Set state to show ApplySeller modal
					} else {
						router.push("/sellerHome");
					}
				}
			}
		}
	} catch (error) {
		const errorMessage = (error as Error).message;
		setErrorMessage(errorMessage);
		setShowError(true);
		if (showAlert) {
			showAlert(errorMessage, "error");
		}
	}
};
