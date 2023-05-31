const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create a user signup 
exports.userSignup = async (req, res) => {
    const { name, email, password } = req.body;

try {
  
    // Check if user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }


    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });


    return res.status(201).json({
        message: "User created successfully",
        user,
    });
} catch (error) {
    return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
    });
}
};

// Login User
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

    // check is user exists
    const userExistInDb = await User.findOne({ email });
    console.log(userExistInDb)
    console.log(userExistInDb)

    if(!userExistInDb) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    // match password
    const isPasswordCorrect = await bcrypt.compare( password, userExistInDb.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Tokenize payload
    const token = await jwt.sign({
        email: userExistInDb.email,
        id: userExistInDb._id,
        name: userExistInDb.name,
        role: userExistInDb.role,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60* 60 //1 hour
});

return res.status(200).json({
    message: "User login successful",
    token,
     });
    
    } catch ( error ) {
        return res.status(500).json({
            error: error.message,
        });
    }
  };


//   Assign Admin role
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. You do not have permission to perform this action.",
          });
    }
    next();
};
