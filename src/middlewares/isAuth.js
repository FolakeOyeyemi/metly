const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    //   check is token is present in your request header                                     [Bearer Token]
    const token = req.headers.authorization.split(" ")[1]; // get the token from the header
    if (!token)
      return res.status(401).json({
        message: "Access denied",
      });

    // verify and decode the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({
        message: "Invalid token",
      });
    // if decoded returns true === create a new obj called user wrapped in the decoded obj
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};


exports.authorize = (roles) => {
    return function (req, res, next) {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        return res.status(401).json({ 
            message: "Permission Denied - You are not an admin" 
        });
      }
        // console.log(req.user);
        // console.log(roles);
    };
  };