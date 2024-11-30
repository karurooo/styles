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

interface PaymentOptionsProps {
	id: number;
	title: string;
	icon: {
		name: keyof typeof MaterialCommunityIcons.glyphMap;
		size: number;
		color: string;
	};
	onPress: () => void;
}

const PaymentOptions: PaymentOptionsProps[] = [
	{
		id: 1,
		title: "Cash on Delivery",
		icon: {
			name: "cash",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Account Settings Pressed"),
	},
	{
		id: 2,
		title: "Credit/Debit Card",
		icon: {
			name: "credit-card",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Payment Method Pressed"),
	},
	{
		id: 3,
		title: "Gcash/Paymaya",
		icon: {
			name: "contactless-payment",
			size: 18,
			color: "#000",
		},
		onPress: () => console.log("Notifications Pressed"),
	},
];

// Export the profile items for use in other parts of the app
export default PaymentOptions;
