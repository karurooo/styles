import { TouchableOpacity, Text } from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
	onPress: () => void;
	title?: string;
	disabled?: boolean; // Add disabled prop
}

export const Button = ({ onPress, title, disabled }: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled} // Use disabled prop
			className={`bg-primary mt-2 h-10 w-full flex-row items-center justify-center rounded-xl ${
				disabled ? "opacity-50" : ""
			}`} // Add opacity when disabled
		>
			<Text className="font-Poppins mr-2 text-white">{title}</Text>
		</TouchableOpacity>
	);
};
