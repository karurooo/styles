import { create } from "zustand";

interface Seller {
	store_id: string;
	store_name: string;
	store_description: string;
	store_location: string;
	profile_pic: string;
	user_id: string;
	document_url: string;
	status: string;
	store_rating: number;
}

interface SellerStore {
	Seller: Seller | null;
	store_id: string;
	store_name: string;
	store_description: string;
	store_location: string;
	profile_pic: string;
	user_id: string;
	document_url: string;
	status: string;
	store_rating: number;
	setId: (store_id: string) => void;
	setStoreName: (store_name: string) => void;
	setStoreDescription: (store_description: string) => void;
	setStoreLocation: (store_location: string) => void;
	setProfilePic: (profile_pic: string) => void;
	setSeller: (seller: Seller) => void;
	setUserId: (user_id: string) => void;
	setDocumentUrl: (document_url: string) => void;
	setStatus: (status: string) => void;
	setStoreRating: (store_rating: number) => void;
}

export const useSellerStore = create<SellerStore>((set) => ({
	Seller: null,
	store_id: "",
	store_name: "",
	store_description: "",
	store_location: "",
	profile_pic: "",
	user_id: "",
	document_url: "",
	status: "",
	store_rating: 0,
	setId: (store_id) => set({ store_id }),
	setStoreName: (store_name) => set({ store_name }),
	setStoreDescription: (store_description) => set({ store_description }),
	setStoreLocation: (store_location) => set({ store_location }),
	setProfilePic: (profile_pic) => set({ profile_pic }),
	setSeller: (seller) =>
		set({
			Seller: seller,
			store_id: seller.store_id,
			store_name: seller.store_name,
			store_description: seller.store_description,
			store_location: seller.store_location,
			profile_pic: seller.profile_pic,
			user_id: seller.user_id,
			document_url: seller.document_url,
			status: seller.status,
			store_rating: seller.store_rating,
		}),
	setUserId: (user_id) => set({ user_id }),
	setDocumentUrl: (document_url) => set({ document_url }),
	setStatus: (status) => set({ status }),
	setStoreRating: (store_rating) => set({ store_rating }),
}));
