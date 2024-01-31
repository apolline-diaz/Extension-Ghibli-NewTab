# Ghibli - New Tab

L'extension Ghibli New Tab remplace votre nouvel onglet par une page personnalisée autour de l'univers des films du Studio Ghibli.

## Contexte

Cette extension a été conçue dans le cadre d'un projet collectif au sein de notre école Ada Tech School, en janvier 2024 (à 4 mois de formation).
Contributeur-ices : 
Tinéni Baeyens
Julien Nguyen
Apolline Diaz

La conception de la première version 1.0 a été finalisée en 7 jours.

## Installation

Vous pouvez installer l'extension via la page dédiée aux extensions de Chrome.

## Description

L'extension vous permet d'obtenir un espace agréable, avec les informations clés de la journée (date, heure, météo), et démarrer votre navigation avec des outils pratiques!

Vous pourrez notamment y découvrir de nouveaux fonds d'écran tirés des films Ghibli, à chaque nouvel onglet ou dès que vous rafraichissez la page. 
Un bouton "Reload" vous permet de changer autant de fois que vous souhaitez le film qui s'affiche (au lieu d'actualiser la page).
Toutes les images sont tirées du site officiel du Studio Ghibli et sont libres de droit.
A cela s'ajoute, des informations clés sur les films pour mieux les découvrir. 
Elles sont récupérées grâce à une API qui regroupe des données concernant chaque film (https://ghibliapi.vercel.app/).
Si vous êtes curieux.se, vous pouvez obtenir plus de détails sur le film en cliquant sur le lien "See More" à côté du synopsis.

> Features :
- Recherche Google
- Fonds d'écran aléatoires tirés des films du Studio Ghibli
- Informations techniques sur les films (titre et synopsis) et redirection vers les résultats Google associés au titre
- Date
- Heure
- Météo avec géolocalisation et barre de recherche 
- Curseur personnalisé
- To Do List
- Lecteur de playlist de bandes originales

## Permissions du navigateur

Des permissions sont requises dans le manifest.json, notamment pour:

- Storage: stocke les données relatives aux outils (comme la To Do List et les données de l'API Ghibli)
- Geolocation: donne accès aux informations météo de l'API OpenWeather 

## Langages de programmation

- HTML
- JavaScript
- CSS
