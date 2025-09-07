# AurelChat App

AurelChat App est une application de chat en temps réel avec une architecture full-stack (Node.js/Express pour le backend, React/Vite pour le frontend).

## Fonctionnalités principales
- Authentification des utilisateurs (inscription, connexion)
- Création et gestion de salons de discussion
- Envoi et réception de messages en temps réel
- Notifications de nouveaux messages
- Interface utilisateur moderne et responsive

## Structure du projet
```
AurelChat App/
├── backend/        # Serveur Node.js/Express
│   ├── controllers/   # Logique métier (auth, messages, salons)
│   ├── middlewares/   # Middlewares Express (auth)
│   ├── models/        # Modèles Mongoose (User, Room, Message)
│   ├── routes/        # Routes API REST
│   ├── public/        # Fichiers statiques
│   ├── app.js         # Configuration Express
│   └── server.js      # Démarrage du serveur
├── frontend/        # Application React (Vite)
│   ├── src/             # Code source React
│   ├── public/          # Assets statiques
│   ├── index.html       # Point d'entrée
│   └── vite.config.ts   # Configuration Vite
├── README.md        # Documentation
└── package.json     # Scripts racine
```

## Installation

### Prérequis
- Node.js >= 16
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Utilisation
1. Démarrer le backend (`npm start` dans `backend/`).
2. Démarrer le frontend (`npm run dev` dans `frontend/`).
3. Accéder à l'application via [http://localhost:5173](http://localhost:5173).

### Compte de test
Vous pouvez vous connecter avec :
- **Nom d'utilisateur** : `aurel`
- **Mot de passe** : `aurel`

## Technologies utilisées
- **Backend** : Node.js, Express, MongoDB, Socket.io
- **Frontend** : React, Vite, Context API

## Contribuer
Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commitez vos modifications (`git commit -m 'Ajout de ma feature'`)
4. Poussez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

## Licence
Ce projet est sous licence MIT.
