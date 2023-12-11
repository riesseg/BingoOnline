# BingoBuche

Bingo original réalisé par Plogojowitz (LegalAlexis) pour le twitch de Bubuchenbois.

---

## Fonctionnement :

La règle du bingo est simple, il faut réussir a remplir une ligne, une colonne ou une diagonale sur la grille.

La case du milieu est un Joker et peut être cochée ou non.

Si un bingo est réalisé, il y'a une animation de victoire avec de la musique.

## Moteur de génération des grilles :

Les grilles se trouvent dans le dossier /*grids/*.

Ce sont des fichiers texte avec un item par ligne.
Le fichier est lu et utilisé pour alimenter les tuiles du bingo.

le fichier *standard.txt* est **OBLIGATOIRE** et doit contenir **25 items** !
Il permet de compléter une grille qui ne contiendrait pas 24 items afin de compléter la grille.
Le but étant de pas devoir forcément s'imposer une longue réflexion pour trouver les idées de nouvelles grilles.

## Multi-grilles

Il est possible d'avoir plusieurs grilles, que les utilisateurs peuvent choisir avant de générer le bingo.
Une liste déroulante permet de sélectionner la grille active.

## Difficulté

Il est possible de paramétrer des obstacles aléatoires depuis le menu.
On peut aller jusqu'à 5 obstacles (au dessus ça devient quasi impossible de faire un bingo).
C'est juste pour plus de challenge

## Bingo Forever

Une fois qu'on a fait un Bingo, si l'option est activée, a chaque nouvelle ligne effectuée, une musique sera jouée et il y'aura des confetis.
Mais il n'y aura pas la popup.
Pour plus de fun. 

## Mode streamer

Utile pour les streamer qui souhaitent utiliser le jeu dans le logiciel de live.
En effet, le mode va transformer le fond en vert et faire dispaître les tuiles. Les tuiles réaparaissent si le streamer passe sa souris sur la grille.
Un interrupteur présent dans le menu permet de réafficher la grille.

Il est également possible de régler le positionnement de la grille, a gauche, au centre ou a droite pour s'adapter (a minima) au layout du stream.

## Configuration

Le bingo se veut facilement adaptable. Pour se faire, il faut :

- Editer les grilles, ou en ajouter dans le dossiers */grids/*
- Modifier les images présentes dans le dossier */grids/img-joker/* pour modifier l'image de la case Joker
- Modifier le fichier config_grids.txt qui se trouve dans */grids/* afin de renseigner les nouvelles grilles et images à utiliser.
- Editer les emotes de la pluie dans le dossier */ressources/rain/img-rain/*
- Editer les images qui s'affiche dans la popup Bingo a gauche et a droite du titre dans le dossier /ressources/rain/img/
- Editer les fichiers mp3 qui se trouvent dans le dossier */ressources/rain/mp3/*
- Modifier le fichier config_rain.txt  qui se trouve dans */ressources/rain/* afin de renseigner les nouvelles images et mp3 à utiliser.

En cas de soucis de chemin lors de l'hébergement sur un site, vous pouvez éditer le fichier path.js qui se trouve dans */functions/*

Pour modifier les couleurs du site, vous trouverez les variables au début du fichier */ressources/css/style.css*
