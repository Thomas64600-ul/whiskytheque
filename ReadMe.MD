
# 🥃 Whiskythèque

Une application de gestion de whiskys et de dégustations, conçue en Node.js avec Express, permettant :
- La création, la mise à jour et la suppression de whiskys.
- La gestion des dégustations avec note, description, utilisateur, etc.
- Un système d'authentification et de rôles (admin/user).
- L’envoi d’e-mails via Nodemailer.
- Le stockage d’images avec Cloudinary.

## 🚀 Stack technique

- **Back-end :** Node.js, Express.js
- **Base de données :** MySQL (PHPMyAdmin)
- **Validation :** express-validator
- **Sécurité :** cookie-parser, rate-limiting
- **Tâches planifiées :** node-cron
- **Fichiers & médias :** Multer, Cloudinary
- **Envoi d’e-mail :** Nodemailer

## 📂 Arborescence du projet

```text
📁 WISKYTHEQUE/
  📁 config/
  📁 controllers/
    📄 authController.js
    📄 tastingController.js
    📄 whiskyController.js
  📁 middlewares/
    📄 auditDependencies.js
    📄 auth.js
    📄 deleteUser.js
    📄 rateLimiter.js
    📄 role.js
    📄 tastingValidator.js
    📄 upload.js
    📄 validate.js
    📄 validateRequest.js
    📄 whiskyValidator.js
  📁 models/
    📄 Tasting.js
    📄 User.js
    📄 Whisky.js
  📁 node_modules/
  📁 public/
    📁 uploads/
  📁 routes/
    📄 authRoutes.js
    📄 tastingRoutes.js
    📄 whiskyRoutes.js
  📁 utils/
    📄 cloudinary.js
    📄 sendEmail.js
  📁 validations/
    📄 userValidation.js
  📄 .env
  📄 app.js
  📄 package.json
  📄 ReadMe.MD
  📄 yarn.lock
```

## ✅ Routes principales

### Auth
- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion
- `GET /api/auth/profile` : Profil utilisateur (protégé)

### Whiskys
- `GET /api/whiskys/` : Tous les whiskys
- `GET /api/whiskys/:id` : Whisky par ID
- `POST /api/whiskys/` : Ajouter un whisky (protégé, avec validation)
- `PUT /api/whiskys/:id` : Modifier un whisky
- `DELETE /api/whiskys/:id` : Supprimer un whisky

### Dégustations
- `GET /api/tastings/` : Toutes les dégustations
- `POST /api/tastings/` : Ajouter une dégustation
- `PUT /api/tastings/:id` : Modifier une dégustation
- `DELETE /api/tastings/:id` : Supprimer une dégustation

---

## ✨ Auteurs

Projet réalisé par **Thomas** dans le cadre d'une formation développeur web full stack.