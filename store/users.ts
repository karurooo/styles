import { create } from "zustand";
import { supabase } from "~/utils/supabase";
import { fetchUserByEmail } from "~/services/auth/fetchUsers";

interface User {
	first_name: string;
	last_name: string;
	email: string;
	role: string;
	password: string; // Add this line
	otp?: string; // Make otp optional
	name?: string; // Add name property
	phone_number?: string; // Add phone_number property
	address?: string; // Add address property
	confirm_password?: string; // Remove confirm_password from the backend user model
	profile_pic?: string; // Add profile_pic property
	id: string; // Add this line
}

interface UserStore {
	user: User | null;
	first_name: string;
	last_name: string;
	email: string;
	role: string;
	password: string;
	otp: string;
	name?: string;
	phone_number?: string;
	address?: string;
	profile_pic?: string;
	isAuthenticated: boolean;
	setFirstName: (first_name: string) => void;
	setLastName: (last_name: string) => void;
	setEmail: (email: string) => void;
	setRole: (role: string) => void;
	setPassword: (password: string) => void;
	setOtp: (otp: string) => void;
	setProfilePic: (profile_pic: string) => void;
	setPhone_Number?: (phone_number: string) => void;
	setAddress?: (address: string) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	setUser: (user: User) => void;
	resetUser: () => void;
	checkSession: () => void;
	logout: () => void;
	fetchUser: (email: string) => Promise<void>;
	id: string; // Add this line
	confirm_password: string; // Add this line
	setConfirmPassword: (confirm_password: string) => void; // Add this line
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	first_name: "",
	last_name: "",
	email: "",
	role: "",
	password: "",
	confirm_password: "",
	otp: "",
	name: "",
	phone_number: "",
	address: "",
	profile_pic: "",
	isAuthenticated: false,
	id: "", // Add this line
	setFirstName: (first_name) => set({ first_name }),
	setLastName: (last_name) => set({ last_name }),
	setEmail: (email) => set({ email }),
	setRole: (role) => set({ role }),
	setPassword: (password) => set({ password }),
	setOtp: (otp) => set({ otp }),
	setPhone_Number: (phone_number) => set({ phone_number }),
	setAddress: (address) => set({ address }),
	setProfilePic: (profile_pic) => set({ profile_pic }),
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
	setConfirmPassword: (confirm_password) => set({ confirm_password }), // Add this line
	setUser: (user) =>
		set({
			user,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			role: user.role,
			password: user.password, // Add this line
			otp: user.otp,
			name: user.name ?? "",
			phone_number: user.phone_number ?? "",
			address: user.address ?? "",
			profile_pic: user.profile_pic ?? "",
			id: user.id, // Add this line
		}),
	resetUser: () => set({ user: null }),

	checkSession: async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (session) {
			const user = {
				first_name: "",
				last_name: "",
				email: session.user.email || "",
				role: "",
				password: "",
				otp: "",
				id: session.user.id || "", // Add this line
			};
			set({ user, isAuthenticated: true });
		} else {
			set({ isAuthenticated: false });
		}
	},
	logout: async () => {
		await supabase.auth.signOut();
		set({ user: null });
	},
	fetchUser: async (email: string) => {
		try {
			const userData = await fetchUserByEmail(email);
			if (userData) {
				set({
					user: userData,
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					role: userData.role,
					password: userData.password, // Add this line
					phone_number: userData.phone_number ?? "",
					address: userData.address ?? "",
					profile_pic: userData.profile_pic ?? "",
					id: userData.id, // Add this line
				});
			}
			console.log("User data fetched:", userData);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	},
}));
