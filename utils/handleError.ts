export const handleError = (
	error: any,
	setAlertMessage: (message: string) => void,
	setAlertVisible: (visible: boolean) => void,
	showAlert?: (
		message: string,
		type: "error" | "confirmation" | "success",
	) => void,
) => {
	const errorMessage = (error as Error).message;
	setAlertMessage(errorMessage);
	setAlertVisible(true);
	if (showAlert) {
		showAlert(errorMessage, "error");
	}
};
