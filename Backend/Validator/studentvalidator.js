const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function studentValidator(data) {
    let errors = {};

    // Convert empty fields to an empty string to use validator functions
    data.studentid = !isEmpty(data.studentid) ? data.studentid : "";
    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : "";
    data.birthdate = !isEmpty(data.birthdate) ? data.birthdate : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";
    data.standard = !isEmpty(data.standard) ? data.standard : "";
    data.fathername = !isEmpty(data.fathername) ? data.fathername : "";
    data.Fatheroccupation = !isEmpty(data.Fatheroccupation) ? data.Fatheroccupation : "";
    data.mothername = !isEmpty(data.mothername) ? data.mothername : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.nationality = !isEmpty(data.nationality) ? data.nationality : "";

    // Validate studentid
    if (validator.isEmpty(data.studentid)) {
        errors.studentid = "Student ID field is required";
    }

    // Validate fullname
    if (validator.isEmpty(data.fullname)) {
        errors.fullname = "Full name field is required";
    }

    // Validate birthdate
    if (validator.isEmpty(data.birthdate)) {
        errors.birthdate = "Birthdate field is required";
    }


    // Validate gender
    if (validator.isEmpty(data.gender)) {
        errors.gender = "Gender field is required";
    }

    // Validate standard
    if (validator.isEmpty(data.standard)) {
        errors.standard = "Standard field is required";
    }

    // Validate fathername
    if (validator.isEmpty(data.fathername)) {
        errors.fathername = "Father's name field is required";
    }

    // Validate Fatheroccupation
    if (validator.isEmpty(data.Fatheroccupation)) {
        errors.Fatheroccupation = "Father's occupation field is required";
    }

    // Validate mothername
    if (validator.isEmpty(data.mothername)) {
        errors.mothername = "Mother's name field is required";
    }

    // Validate email
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Invalid email address";
    }

    // Validate phone
    if (validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else if (!validator.isMobilePhone(data.phone)) {
        errors.phone = "Invalid phone number";
    }

    // Validate nationality
    if (validator.isEmpty(data.nationality)) {
        errors.nationality = "Nationality field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
