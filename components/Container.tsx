import { SafeAreaView } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaView className=" flex-1 flex flex-col  bg-white justify-between items-center">
			{children}
		</SafeAreaView>
	);
};
