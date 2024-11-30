import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";

interface ReusableModalProps {
	visible: boolean;
	onClose: () => void;
	children: React.ReactNode;
	avoidKeyboard?: boolean;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
	visible,
	onClose,
	avoidKeyboard = true,
	children,
}) => {
	const closeModal = () => {
		onClose();
	};

	return (
		<Modal
			isVisible={visible}
			onBackdropPress={onClose}
			onBackButtonPress={onClose}
			animationIn="slideInUp"
			animationOut="slideOutDown"
			useNativeDriver
			avoidKeyboard={avoidKeyboard}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "white",
					borderRadius: 10,
					padding: 20,
				}}
			>
				<TouchableOpacity
					style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
					onPress={onClose}
				>
					<Text style={{ fontSize: 24, color: "black" }}>
						<Ionicons name="close" size={20} color="black" />
					</Text>
				</TouchableOpacity>
				<View style={{ flex: 1 }}>{children}</View>
			</View>
		</Modal>
	);
};

export default ReusableModal;
