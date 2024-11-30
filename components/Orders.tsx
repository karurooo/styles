import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PaymentOptions from "~/constants/paymentOptions";

const MyOrders = ({ onClose }: { onClose: () => void }) => {
	const router = useRouter();
	const toBack = () => {
		router.back();
	};

	return (
		<View className="items-center gap-2">
			<Text style={styles.title}>My Orders</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	detail: {
		fontSize: 18,
		color: "gray",
	},
	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	optionText: {
		fontSize: 18,
		marginLeft: 10,
	},
});

export default MyOrders;
