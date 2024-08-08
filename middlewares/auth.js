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
