import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AlertProps {
	isVisible: boolean;
	onClose: () => void;
	message: string;
	type: "error" | "confirmation" | "success";
	onConfirm?: () => void;
}

const AlertModal: React.FC<AlertProps> = ({
	isVisible,
	onClose,
	message,
	type,
	onConfirm,
}) => {
	const getIconName = () => {
		switch (type) {
			case "error":
				return "closecircleo";
			case "confirmation":
				return "questioncircleo";
			case "success":
				return "checkcircleo";
			default:
				return "infocirlceo";
		}
	};

	return (
		<Modal
			transparent={true}
			visible={isVisible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View className="flex-1 items-center justify-center bg-secondary/80 z-50">
				<View className="relative h-2/5 w-4/5 justify-between rounded-lg bg-white p-5 shadow-lg">
					<View style={{ alignItems: "center", marginBottom: 10 }}>
						<AntDesign name={getIconName()} size={48} color="black" />
					</View>
					<View className="flex flex-col justify-between pb-2">
						<Text className="text-center text-2xl font-semibold">
							{type === "error"
								? "Error"
								: type === "confirmation"
								? "Confirmation"
								: "Success"}
						</Text>
					</View>
					<ScrollView
						contentContainerStyle={{ justifyContent: "center" }}
						className="py-4"
					>
						<Text className="text-center text-lg font-Poppins">{message}</Text>
					</ScrollView>
					{type === "confirmation" ? (
						<View className="flex-row justify-between pt-2">
							<TouchableOpacity
								onPress={onClose}
								className="mx-2 w-32 flex-row items-center justify-evenly rounded border border-black bg-lightGreen px-4 py-2"
							>
								<Ionicons name="close" size={20} color="black" />
								<Text className="text-black ">Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={onConfirm}
								className="mx-2 w-32 flex-row items-center justify-evenly rounded border border-black bg-oliveGreen px-4 py-2"
							>
								<AntDesign name="checkcircleo" size={18} color="black" />
								<Text className=" text-white">Confirm</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View className="flex-row justify-center pt-2">
							<TouchableOpacity
								onPress={onClose}
								className="mx-2 w-32 flex-row items-center justify-evenly rounded border border-darkGreen bg-primary px-4 py-2"
							>
								<Ionicons name="close" size={20} color="white" />
								<Text className="text-white">Close</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};

export default AlertModal;
