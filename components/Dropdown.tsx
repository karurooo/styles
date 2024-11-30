import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface DropdownProps {
	label: string;
	options: { label: string; icon: React.ReactNode }[];
	selectedOption: string;
	onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	selectedOption,
	onSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option: string) => {
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<View className="mb-4">
			<Text className="text-xl font-bold mb-2">{label}</Text>
			<TouchableOpacity
				className="border p-2 rounded-lg flex-row justify-between items-center"
				onPress={() => setIsOpen(!isOpen)}
			>
				<Text>{selectedOption}</Text>
				<Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} />
			</TouchableOpacity>
			{isOpen && (
				<FlatList
					data={options}
					keyExtractor={(item) => item.label}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="p-2 border-t flex-row items-center bg-secondary rounded-lg"
							onPress={() => handleSelect(item.label)}
						>
							{item.icon}
							<Text className="ml-2">{item.label}</Text>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	);
};

export default Dropdown;
