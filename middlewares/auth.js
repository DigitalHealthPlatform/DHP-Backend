import jwt from 'jsonwebtoken';

export const checkUserSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];  // Ensure correct split
            console.log('Token:', token);  // Debug log
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            console.log('Decoded User:', req.user);  // Debug log
            next();
        } catch (error) {
            console.error('Token verification error:', error.message);  // Debug log
            return res.status(401).json({ error: "Token Expired" });
        }
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
};
export default checkUserSession;


export const checkAdminSession = (req, res, next) => {
    // Check if the admin session exists
    if (req.session.admin) {
        next();  // Admin is authenticated via session, proceed to the next middleware or route handler
    } 
    // If no session, check if the Authorization header is present
    else if (req.headers.authorization) {
        try {
            // Extract the token from the Authorization header
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.status(401).send('Access denied. No token provided.');

            // Verify the token using your JWT secret
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.admin = decoded;  // Attach decoded admin data to the request object

            next();  // Proceed to the next middleware or route handler
        } catch (error) {
            // Handle token verification errors
            console.error('Token verification error:', error.message);
            return res.status(401).send('Invalid or expired token');
        }
    } 
    // If neither session nor token is available, deny access
    else {
        res.status(401).send('Not authenticated');
    }
};



// export const verifyAdmin = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) return res.status(401).send('Access denied. No token provided.');
  
//     try {
//       const decoded = jwt.verify(token, 'your_jwt_secret');
//       req.admin = decoded;
//       next();
//     } catch (error) {
//       res.status(400).send('Invalid token');
//     }
//   };

// import jwt from "jsonwebtoken";

// export const checkUserSession = (req,res,next)=>{
//     if (req.session.user) {
//         next();
//     } else if (req.headers.authorization) {
//         try {
//             const token = req.headers.authorization.split('')[1]
//             req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

//             next()
//         } catch (error) {
//             return res.status(401).json({ error: "Token Expired"})
//         }
//     }
//     else {
//         res.status(401).json({error: 'Not authenticated'})
//     }
// };

// export default checkUserSession;
