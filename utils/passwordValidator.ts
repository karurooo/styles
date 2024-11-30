export const passwordValidation = (password: string): boolean => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return passwordRegex.test(password);
};
