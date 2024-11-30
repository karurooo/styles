import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av"; // Correct imports

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
	useEffect(() => {
		const timer = setTimeout(() => onFinish(), 6000);
		return () => clearTimeout(timer);
	}, [onFinish]);

	return (
		<View style={styles.container}>
			<Video
				source={require("~/assets/video/Logo Animation/splash-animation-2.mp4")}
				style={styles.video}
				resizeMode={ResizeMode.CONTAIN} // Correct ResizeMode
				shouldPlay
				onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
					if (status.isLoaded && status.didJustFinish) {
						// Ensure correct type check
						onFinish();
					}
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	video: {
		width: "100%",
		height: "100%",
	},
});
