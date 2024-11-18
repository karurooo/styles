/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				Poppins: ["Poppins-Regular", "Poppins-Bold"], // Ensure Poppins is configured correctly
			},
			colors: {
				primary: "#FF735C",
			},
		},
	},
	plugins: [],
};
