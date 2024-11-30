import { supabase } from "~/utils/supabase";

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
	id: string; // Ensure the id property is required
	profile_pic?: string; // Add this line
}

export const saveSeller = async (
	seller: SellerStore,
	userId: string,
): Promise<any> => {
	try {
		// Validate required fields
		if (!userId) {
			throw new Error("User ID is missing.");
		}
		if (!seller.user_id || !seller.store_name || !seller.store_description) {
			throw new Error("Required seller information is missing.");
		}

		// Insert seller data into the "stores" table
		const { data, error } = await supabase
			.from("store")
			.insert([
				{
					owner_id: userId,
					name: seller.store_name,
					description: seller.store_description,
					location: seller.store_location ?? null, // Optional field
					profile_pic: seller?.store_profile_pic ?? null, // Optional field
					rating: seller.store_rating ?? 0, // Default to 0
				},
			])
			.select();

		// Handle errors
		if (error) {
			console.error(
				"Error saving seller:",
				error.message,
				error.details,
				error.hint,
			);
			throw error;
		}

		// Return the inserted data
		return data;
	} catch (error) {
		console.error("Unexpected error saving seller:", error);
		throw error;
	}
};

export const updateSeller = async (
	seller: SellerStore,
	userId: string,
): Promise<any> => {
	try {
		// Validate required fields
		if (!userId) {
			throw new Error("User ID is missing.");
		}
		if (!seller.user_id || !seller.store_name || !seller.store_description) {
			throw new Error("Required seller information is missing.");
		}

		// Update seller data in the "stores" table
		const { data, error } = await supabase
			.from("store")
			.update({
				name: seller.store_name,
				description: seller.store_description,
				location: seller.store_location ?? null, // Optional field
				profile_pic: seller?.store_profile_pic ?? null, // Optional field
				rating: seller.store_rating ?? 0, // Default to 0
			})
			.eq("owner_id", userId)
			.select();

		// Handle errors
		if (error) {
			console.error(
				"Error updating seller:",
				error.message,
				error.details,
				error.hint,
			);
			throw error;
		}

		// Return the updated data
		return data;
	} catch (error) {
		console.error("Unexpected error updating seller:", error);
		throw error;
	}
};

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
			store_rating: data.rating,
			id: data.id,
			profile_pic: data.profile_pic,
			document_url: data.document_url,
			status: data.status,
		};

		// Return the fetched data
		return sellerStore;
	} catch (error) {
		console.error("Unexpected error fetching seller:", error);
		throw error;
	}
};
