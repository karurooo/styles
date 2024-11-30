import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TextInputProps,
	KeyboardTypeOptions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface InputFieldProps extends TextInputProps {
	// label: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	isPassword?: boolean;
	isDisabled?: boolean; // New prop
	keyboardType?: KeyboardTypeOptions; // Update keyboardType prop type
}

const InputField: React.FC<InputFieldProps> = ({
	// label,
	placeholder,
	value,
	onChangeText,
	isPassword,
	isDisabled,
	keyboardType = "default", // Default value for keyboardType
	...props
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false); // New state

	return (
		<View className="my-2 flex flex-col">
			{/* <Text className="my-2 font-Poppins text-lg text-blackBerry">{label}</Text> */}

			<View
				className={`flex-row items-center rounded-xl border bg-secondary p-2 ${
					isFocused ? "border-2" : "border-black"
				} ${isDisabled ? "bg-gray-300" : ""}`}
			>
				<TextInput
					className="flex-1 font-Poppins text-black "
					placeholder={isFocused ? "" : placeholder}
					placeholderTextColor={"#000"}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={isPassword && !isPasswordVisible}
					editable={!isDisabled}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					autoCapitalize="sentences"
					keyboardType={keyboardType} // Use keyboardType prop
					{...props}
				/>
				{isPassword && (
					<Ionicons
						name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
						size={24}
						color="black"
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// Add styles for different states
	borderDarker: {
		borderColor: "#000", // Darker color for active state
	},
	borderBlackBerry: {
		borderColor: "#000", // Original color
	},
	bgGray: {
		backgroundColor: "#d3d3d3", // Disabled state background color
	},
});

export default InputField;
