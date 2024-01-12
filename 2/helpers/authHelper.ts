export const isEmailValid = (email: string): boolean => {
    const emailPattern = new RegExp('^([a-zA-Z0-9._-])+@([a-zA-Z0-9.-])+\\.([a-zA-Z]{2,4})$');
    return emailPattern.test(email);
};

export const isPasswordStrong = (password: string): boolean => {
    const MIN_LENGTH = 8;
    const passwordPattern = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$');
    return password.length >= MIN_LENGTH && passwordPattern.test(password);
};
