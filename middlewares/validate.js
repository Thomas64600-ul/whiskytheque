export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    // Retourner toutes les erreurs, pas seulement la première
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: messages });
  }

  // Stocker les données validées et nettoyées dans req.validatedBody
  req.validatedBody = value;

  next();
};
