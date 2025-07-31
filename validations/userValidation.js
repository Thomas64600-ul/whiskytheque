import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
        'string.empty' : 'Le nom est requis.',
        'string.min': 'Le nom doit contenir au moins 2 caractères'

    }),
    lastname: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
        'string.empty': 'Le nom est requis.',
        'string.min': 'Le nom doit contenir au mois 2 caractères.',
    }),
    email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
        'string.email': 'Le format de l\'email est invalide.',
        'string.empty': 'L\'email est requis'
    }),
    password: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
        'string.empty': 'Le mot de passe est requis'
    }),
    confirmPassword: Joi.string()
    .min(6)
    .required()
    .messages({
        'string-min': 'Le mot de passe doit contenir au moins 6 caractères.',
        'string-empty': 'Le mot de passe est requis',
    })
});