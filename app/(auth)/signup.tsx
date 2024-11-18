import React, { useState } from "react";
import { View, Text } from "react-native";
import AlertModal from "../../components/Alert";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function Signup() {
	const [isAlertVisible, setAlertVisible] = useState(false);

	const handleSignup = () => {
		// ...signup logic...
		setAlertVisible(true);
	};

	return (
		<Container>
			<View>
				<Text>Signup</Text>
				<Button title="Sign Up" onPress={handleSignup} />
				<AlertModal
					isVisible={isAlertVisible}
					onClose={() => setAlertVisible(false)}
					message="Signup successful!"
					type="success"
				/>
			</View>
		</Container>
	);
}
