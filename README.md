Projet 7 - Réseau social d'entreprise Groupomania !

7ème projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

    Vue.js + Vuex + Vue Router
    NodeJS + Express + Sequelize
    MySQL

Frontend

Ouvrir le dossier "frontend" dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

npm run serve

si le navigateur ne s'ouvre pas automatiquement allez à :

    http://localhost:8080/

Backend

Ouvrir le dossier "backend" dans le terminal de votre éditeur puis exécuter la commande:

npm install

puis

npm start

Base de données

Se connecter au serveur MySql de votre choix : mysql -u root -p. 
Exécuter la commande: CREATE DATABASE database_development.
Vérifiez les identifiants dans le fichier config.json du dossier "groupomania-social-network-backend" puis importer le fichier script-database-Groupomania.sql fourni.


Utilisation

Pour s'inscrire sur le social network de Groupomania, il vous faut renseigner :

    Un pseudo (entre 5 et 12 caractères)
    Une adresse mail valide
    Un mot de passe (de 8 à 20 caractères, lettres et chiffres acceptés uniquement, majuscules et minuscules, pas de symboles). 
    
    Dans cette première version de MVP, vous pouvez :
    - Modifier votre profil (bio, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même.
    - Publier des posts avec contenu text et photo, les modifier et les supprimer.
