interface Errors {
  username?: String
  email?: String
  password?: String
  confirmPassword?: String
  general?: String
}

export const validateRegisterInput = (
  username: String,
  email: String,
  password: String,
  confirmPassword: String,
) => {
  const errors: Errors = {};

  if (username.trim() === '') {
    errors.username = 'Username cannot be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email cannot be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password cannot be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username: String, password: String) => {
  const errors: Errors = {};

  if (username.trim() === '') {
    errors.username = 'Username cannot be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot be empty';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
