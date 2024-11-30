import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PaymentOptions from "~/constants/paymentOptions";

const PaymentMethod = ({ onClose }: { onClose: () => void }) => {
	const router = useRouter();
	const toBack = () => {
		router.back();
	};

	return (
		<View className="items-center gap-2">
			<Text style={styles.title}>Payment Method</Text>
			{PaymentOptions.map((option) => (
				<TouchableOpacity
					key={option.id}
					className="bg-secondary p-4 w-3/4 rounded-lg"
					onPress={option.onPress}
				>
					<View className="flex flex-row justify-between items-center ">
						<View className="h-8 w-8 bg-white rounded-full items-center justify-center p-1">
							<MaterialCommunityIcons
								name={option.icon.name}
								size={option.icon.size}
								color={option.icon.color}
							/>
						</View>

						<Text style={styles.optionText}>{option.title}</Text>
					</View>
				</TouchableOpacity>
			))}
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

export default PaymentMethod;
