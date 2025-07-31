import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  const token = req.cookies.then || '';

  if(!token) {
    return res.status(401).json({message: 'Non authentifié, token manquant'});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    next();
  }catch (error) {
    return res.status(401).json({message: 'Token invalide ou expiré'})
  }
};

export const authorize = (...roles) => (req, res, next) =>{
  if (!req.user) return res.status(401).json({message: 'Non authentifié'});
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({message: 'Accès interdit: rôle insuffisant'})
  } 
  next();
};

