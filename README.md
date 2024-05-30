# Assignements FRONT (MBDS Madagascar 2024 - ANGULAR)

Ce projet consiste généralement à établir une application pour la gestion des assignements

## Membres du groupe
    1. RAKOTOMANANA Nick Mathieu Andrianina - numéro (23)
    2. RANDRIAMAMBOLA Soatoavina Koloina Ornella - numéro (36)

## Lancement du projet

Etapes à suivre pour lancer le projet en local : 
1. Cloner le repository `https://github.com/mathieu29nick/Projet_Assignements_FRONT`
2. Ouvrer un terminal et installer les dependances avec la commande `npm i` ou `npm install`
3. Dirigez-vous dans le répertoire `src\app\shared\api.ts`
4. Choisissez le 1er url (déployé) et la 2ème url pour le local (Commenté celle que vous ne voulez pas utilisé)
5. Si vous avez choisi d'utiliser la 2éme url (local), il faudra aussi lancé le projet BACKEND `https://github.com/mathieu29nick/Projet_Assignements_BACK` dans votre local
5. Dirigez-vous dans le répertoire `package.json` et remplacer `"start": "node server.js"` par `"start": "ng serve"`
6. Dans le terminal, utilisé la commande  `npm run start` ou `ng serve` pour démarer l'application

## Le Projet

### Matériel/Outils/Site(s) pour aider à la réalisation
1. Angular Material (`https://material.angular.io/`)
2. Angular Wiki (`https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/`)
3. ChatGPT, vidéos sur Youtube et Stack OverFlow

### Hébergement
1. Hebergeur : `render.com`

### Contenu par défaut
1. Utilisateurs : `1` (Admin), `5` (Professeurs), `10` (Elèves)
2. Niveau études : `3` niveaux (L1, L2, L3)
3. Matières : `35` Matières
4. Assignements : chaque Matières contiennent également `3` assignements
5. Pour chacune des 3 assignements par matière, un assignement est assigné aux 10 élèves. Donc au total nous avons `(35*3*10 = 1050 Assignements)` dans notre application

### Auhentification/Rôle des utilisateurs
1. L' `ADMIN` qui peut : 
    ```sh
    1. Voir la liste des professeurs
    2. Voir la liste des élèves
    3. Ajouter un nouveau élève
    4. Ajouter un nouveau professeur
    5. Voir la liste des matières de chaque professeurs
    6. Voir la liste des assignations créées par les professeurs et les détails de chaque assignation
    7. Voir en detail pour chaque assignation la liste des élèves assignés à cette assignation
    8. Voir les perfomances des élèves en forme de (Graph/Tableau de bord) par rapport à ses matières/notes des élèves , l admin peut voir les notes par ordre croissant ou décroissant
    9. Voir son propre Profil

    ## Mail / Password
    1. admin1@example.com / motdepasse1

2. Les `Professeurs` qui peuvent : 
    ```sh
    1. Ajouter des nouveaux assignements dans une de ses matières
    2. Voir la liste des assignations créées par les professeurs et les détails de chaque assignation
    3. Voir en detail pour chaque assignation la liste des élèves assignés à cette assignation
    4. Valider les assignements rendus par les élèves
    5. Voir les perfomances des élèves en forme de (Graph/Tableau de bord) par rapport à ses matières/notes des élèves , ils peuvent voir les notes par ordre croissant ou décroissant
    6. Modifier des assignements
    7. Ajouter les notes/remarques pour les assignements des élèves
    8. Clôturer un assignement
    9. Voir son propre Profil

    ## Mail / Password
    1. prof1@example.com / motdepasse
    2. prof2@example.com / motdepasse
    3. prof3@example.com / motdepasse
    4. prof4@example.com / motdepasse
    5. prof5@example.com / motdepasse

3. Les `Eleves` qui peuvent : 
    ```sh
    1. Voir la liste de leurs devoirs avec la possibilité de filtrer par niveau, matière, statut du devoir, et trier par date d échéance (croissante ou décroissante).
    2. Voir la fiche de l assignement
    3. Voir la fiche de leurs devoirs
    4. Rendre leurs assignations si la date d expiration de celles-ci ne sont pas encore dépassées
    5. Voir ses propres perfomances en forme de (Graph/Tableau de bord) par rapport à ses matières/notes,les peuvent voir ses notes par ordre croissant ou décroissant
    6. Voir leur propre Profil

    ## Mail / Password
    1. jeanmartin26@example.com / motdepasse1
    2. marcluc@example.com / motdepasse2
    3. emmarouuseau@example.com / motdepasse3
    4. bonnetzoe56@example.com / motdepasse4
    5. leclercjade10@example.com / motdepasse5
    6. caronines23@example.com / motdepasse10
    7. dupontethan289@example.com / motdepasse
    8. clararoy8@example.com / motdepasse
    9. merciersarah123@example.com / motdepasse9
    10. martinenzo23@example.com / motdepasse10

### Fonctionnalité détaillée pour chaque module
1. Gestion des utilisateurs
    ```sh
    Chaque utilisateur a son propre rôle et peut voir différentes fonctionnalités de navigation sur le site en fonction de son rôle

2. Gestion des Assignements
    ```sh
    1. Liste des assignements
    2. Modification des assignements si la date d expiration de ces assignements n est pas dépassée
    3. Ajouter un nouveau assignement dans une Matière
    4. Clôturer un assignement
    5. Voir le detail de chaque assignement
    6. Ajouter une note et une remarque à chaque assignement si ce n est pas déjà fait

3. Gestion des Matières
    ```sh
    1. Liste des matières
    2. Ajouter une nouvelle matière

4. Gestions Admin
    ```sh
    1. Mon profil

5. Gestion des Professeurs
    ```sh
    1. Mon Profil
    2. Liste des Professeurs
    3. Ajouter un nouveau Professeur

6. Gestion des Elèves
    ```sh
    1. Mon Profil
    2. Liste des Elèves
    3. Ajouter un nouveau Elève

7. Performance
    ```sh
    1. Chaque utilisateur peut voir les performances des élèves dans chaque matière en fonction du niveau d étude, de la matière et de la date de rendu du devoir