import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {message: "Trop de tentatives de connexion.Réessayez dans 15 minutes "},
});