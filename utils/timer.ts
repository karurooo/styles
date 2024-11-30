import { useState, useEffect } from "react";

export const useTimer = (initialTime: number) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		if (timeLeft <= 0) return;

		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timerId);
	}, [timeLeft]);

	const resetTimer = () => setTimeLeft(initialTime);

	return { timeLeft, resetTimer };
};
