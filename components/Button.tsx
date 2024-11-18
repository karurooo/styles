import { TouchableOpacity, Text } from "react-native";
import { ReactNode } from "react";

interface ButtonProps {
	onPress: () => void;
	title?: string;
}

export const Button = ({ onPress, title }: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="bg-primary mt-4 h-10 w-56 flex-row items-center justify-center rounded-2xl"
		>
			<Text className="font-Poppins mr-2  text-white">{title}</Text>
		</TouchableOpacity>
	);
};
