const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modals/User");
const SignupValidator = require("../Validator/SignupValidator");
const loginValidator = require("../Validator/loginValidator");
const dotenv = require("dotenv")
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET_TOKEN

// create user function 
exports.signup = async (req, res) => {
    let success = false;
    const { errors, isValid } = SignupValidator(req.body);

    if (!isValid) {
        return res.status(400).json({ success: false, message: { errors } });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Cannot repeat the same email id" });
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secpass,
            confirmPassword: secpass,
        });
        await user.save();

        const data = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };

        const expirationTime = 4 * 60 * 60; // 4 hours in seconds
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: expirationTime });

        success = true;
        res.json({ success, data, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error...");
    }
};

// login user function 
exports.login = async (req, res, next) => {
    const { errors, isValid } = loginValidator(req.body);

    if (!isValid) {
        return res.status(400).json({ success: false, message: { errors } });
    }
    let success = false
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "User does not exists.." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "password does not match.." })
        }
        const data = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
        const expirationTime =  1 * 60; // 4 hours in seconds
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: expirationTime });
        let success = true
        res.json({ success, data, authtoken, expirationTime })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error...")
    }
}

// forgotPassword function for reset password 
exports.forgotPassword = async (req, res, next) => {
    try {
        const { errors, isValid } = loginValidator(req.body);
        const { email, password, confirmPassword } = req.body;
        if (!isValid) {
            return res.status(400).json({ status: false, message: { errors } });
        }

        const isExisiting = await User.findOne({ email });
        if (!isExisiting) {
            return res.status(500).json({
                success: false,
                message: "Forgot Password Failed, Please check your email address.",
            });
        }

        const isValidatePassword = await bcrypt.compare(
            password,
            isExisiting.password
        );
        if (isValidatePassword) {
            return res.status(500).json({
                success: false,
                message: "New Password should be different from previous password.",
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 12);
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: "Could not update password, please try again.",
            });
        }

        const isUpdated = await User.findOneAndUpdate({ email }, {
            password: hashedPassword,
            confirmPassword: hashedPassword
        });
        if (isUpdated) {
            res.json({ success: true, message: "Password updated" });
        }
    } catch (error) {
        console.log("error", error);
    }
};

