import { useUserStore } from "~/store/users";
import { useSellerStore } from "~/store/sellers";

export const useInputFields = () => {
	const firstName = useUserStore((state) => state.first_name);
	const setFirstName = useUserStore((state) => state.setFirstName);
	const lastName = useUserStore((state) => state.last_name);
	const setLastName = useUserStore((state) => state.setLastName);
	const email = useUserStore((state) => state.email);
	const setEmail = useUserStore((state) => state.setEmail);
	const password = useUserStore((state) => state.password);
	const setPassword = useUserStore((state) => state.setPassword);
	const confirmPassword = useUserStore((state) => state.confirm_password);
	const setConfirmPassword = useUserStore((state) => state.setConfirmPassword);

	//seller application

	const businessName = useSellerStore((state) => state.store_name);
	const setBusinessName = useSellerStore((state) => state.setStoreName);
	const businessDescription = useSellerStore(
		(state) => state.store_description,
	);
	const setBusinessDescription = useSellerStore(
		(state) => state.setStoreDescription,
	);

	return [
		{
			label: "First Name *",
			placeholder: "Enter first name",
			value: firstName,
			onChangeText: setFirstName,
			required: true,
		},
		{
			label: "Last Name *",
			placeholder: "Enter last name",
			value: lastName,
			onChangeText: setLastName,
			required: true,
		},
		{
			label: "Email *",
			placeholder: "Enter email",
			value: email,
			onChangeText: setEmail,
			required: true,
			autoCompleteType: "email",
			textContentType: "emailAddress",
			keyboardType: "email-address",
		},
		{
			label: "Password *",
			placeholder: "Enter password",
			value: password,
			onChangeText: setPassword,
			required: true,
			autoCompleteType: "password",
			textContentType: "password",
			isPassword: true,
		},
		{
			label: "Confirm Password *",
			placeholder: "Confirm Password",
			value: confirmPassword,
			onChangeText: setConfirmPassword,
			required: true,
			autoCompleteType: "password",
			textContentType: "password",
			isPassword: true,
		},
		{
			label: "Business Name *",
			placeholder: "Enter business name",
			value: businessName,
			onChangeText: setBusinessName,
			required: true,
		},
		{
			label: "Business Description *",
			placeholder: "Enter business description",
			value: businessDescription,
			onChangeText: setBusinessDescription,
			required: true,
		},
	];
};
