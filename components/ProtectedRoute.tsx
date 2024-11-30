import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useAuth } from "~/context/AuthContext"; // Import your authentication context

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const navigation = useNavigation();
	const { isAuthenticated } = useAuth(); // Use your authentication context

	useEffect(() => {
		// Ensure navigation logic here runs after the component has mounted
		if (!isAuthenticated) {
			navigation.navigate("Login" as never); // Type assertion to fix the type error
		}
	}, [navigation, isAuthenticated]);

	return <View>{children}</View>;
};

export default ProtectedRoute;
