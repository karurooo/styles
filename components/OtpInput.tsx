import React, { useState, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "./Button";
import { useUserStore } from "~/store/users";

export const OtpInput = ({ setOtp }: { setOtp: (otp: string) => void }) => {
	// Add setOtp prop
	const [otp, setOtpState] = useState(Array(6).fill(""));
	const inputRefs = useRef<Array<TextInput | null>>([]);

	const handleChange = (text: string, index: number) => {
		if (/^\d*$/.test(text)) {
			const newOtp = [...otp];
			newOtp[index] = text;
			setOtpState(newOtp);
			setOtp(newOtp.join("")); // Update the OTP in the parent component

			if (text && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyPress = (e: any, index: number) => {	 	
		if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	return (
		<View className="mx-4 flex ">
			<View className=" flex-row items-center justify-between">
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						ref={(ref) => (inputRefs.current[index] = ref)}
						className="border-black mx-2 h-12 w-12 rounded-lg border text-center text-md text-black bg-secondary"
						value={digit}
						onChangeText={(text) => handleChange(text, index)}
						onKeyPress={(e) => handleKeyPress(e, index)}
						keyboardType="numeric"
						maxLength={1}
					/>
				))}
			</View>
		</View>
	);
};
