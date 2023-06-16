const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function signupValidator(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? validator.trim(data.username) : "";
    data.email = !isEmpty(data.email) ? validator.trim(data.email) : "";
    data.password = !isEmpty(data.password) ? validator.trim(data.password) : "";
    data.confirmPassword = !isEmpty(data.confirmPassword)
        ? validator.trim(data.confirmPassword)
        : "";
        
    // validation for username 

    if (validator.isEmpty(data.username)) {
        errors.username = "Username is required.";
    } else if (!validator.isLength(data.username, { min: 3 })) {
        errors.username = "Username must be at least 3 characters.";
    } else if (!validator.isLength(data.username, { max: 50 })) {
        errors.username = "Username may not be greater than 50 characters.";
    }
    // validation for email 

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required.";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email address is not valid.";
    }

    // validation for password 
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required.";
    } else if (
        !validator.isStrongPassword(data.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
    ) {
        errors.password =
            "Password must be at least 8 characters, with minimum 1 lowercase, 1 uppercase, 1 number, and 1 symbol.";
    }

    // validation for confirmPassword 

    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password is required.";
    } else if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
