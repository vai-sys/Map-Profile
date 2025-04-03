const jwt = require('jsonwebtoken');


 const authMiddleware = (req, res, next) => {

  // const token = req.cookies.auth_token;
  console.log("Auth Middleware:", req.cookies.auth_token);
  const token = req.cookies.auth_token || req.headers.authorization?.split(" ")[1];


 
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded)
    req.user = decoded; 
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};


const authorizeAdmin = (req, res, next) => {
  
  if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
  next();
};

module.exports={authMiddleware,authorizeAdmin};