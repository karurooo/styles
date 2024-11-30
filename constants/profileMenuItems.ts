// Import necessary libraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { logout } from "~/services/auth/logout";
import { useUserStore } from "~/store/users";

const handleLogout = () => {
	const userStore = useUserStore.getState();
	userStore.resetUser();
	console.log("Logout Pressed");
	router.push("/signin");
};

interface ProfileMenuItems {
	id: number;
	title: string;
	icon: {
		name: keyof typeof MaterialCommunityIcons.glyphMap;
		size: number;
		color: string;
	};
	onPress: () => void;
}

const profileMenuItems: ProfileMenuItems[] = [
	{
		id: 1,
		title: "My Account",
		icon: {
			name: "account",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Account Settings Pressed"),
	},

	//payment method
	{
		id: 2,
		title: "Payment Method",
		icon: {
			name: "credit-card",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Payment Method Pressed"),
	},
	{
		id: 3,
		title: "My Cart",
		icon: {
			name: "cart",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Notifications Pressed"),
	},
	{
		id: 4,
		title: "Orders",
		icon: {
			name: "shopping",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Orders Pressed"),
	},
	{
		id: 5,
		title: "Help",
		icon: {
			name: "help-circle",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Help Pressed"),
	},
	{
		id: 6,
		title: "Store Profile",
		icon: {
			name: "store",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Store Profile Pressed"),
	},
	{
		id: 7,
		title: "Add Product",
		icon: {
			name: "plus-circle",
			size: 18,
			color: "#000",
		},
		onPress: handleLogout,
	},
	{
		id: 8,
		title: "My Listings",
		icon: {
			name: "format-list-bulleted",
			size: 18,
			color: "#000",
		},
		onPress: handleLogout,
	},
];

// Export the profile items for use in other parts of the app
export default profileMenuItems;
