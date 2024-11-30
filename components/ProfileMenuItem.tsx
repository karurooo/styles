import {
	TouchableOpacity,
	Text,
	View,
	TouchableOpacityProps,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ProfileItemProps extends TouchableOpacityProps {
	title: string;
	onPress: () => void;
	icon?: {
		name: keyof typeof MaterialCommunityIcons.glyphMap;
		size: number;
		color: string;
	};
}

export const ProfileItem = ({ title, onPress, icon }: ProfileItemProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="mx-6 my-1 flex flex-row items-center justify-between rounded-2xl border bg-white p-3"
		>
			<View className="flex flex-row items-center">
				{icon && (
					<View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-secondary">
						<MaterialCommunityIcons
							name={icon.name}
							size={icon.size}
							color={icon.color}
						/>
					</View>
				)}
				<Text className="font-Poppins text-lg text-black">{title}</Text>
			</View>
			<MaterialCommunityIcons name="chevron-right" size={24} color="black" />
		</TouchableOpacity>
	);
};
