// - Minimum 8 characters
// - At least one uppercase letter, one lowercase letter, one number, and one special character
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
