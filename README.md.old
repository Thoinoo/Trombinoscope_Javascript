# Javascript : Génération d'un trombinoscope

## Contexte
La plateforme de github mets à disposition une API. Cette dernière vous permets de vous y connecter par le biais d'une application afin d'en extraire de la data. 

Vous avez par exemple la route `https://api.github.com/users/{username}` vous permets de pouvoir récupérer des informations concernant le profil utilisateur donné.

## Objectif
L'objectif du jour est de générer un trombinoscope dynamiquement à partir d'un fichier JSON.
Vous trouverez au sein de ce dépôt un fichier `etudiants.json` contenant le nom d'utilisateur github des étudiants de votre classe. 

### Interrogation de l'API
A partir du fichier JSON ci-joint, interrogez l'api de github afin d'extraire les informations concernant les profils utilisateurs

## Génération de DOM à la volée
Après interrogation de l'API générez des blocs à la volée permettant de visualiser : 
 - Le nom de l'utilisateur (Avec un lien vers son profil github)
 - L'avatar de l'utilisateur
 - Une vignette avec le nombre de repositorys liés
 - Une vignette avec le nombre de followers
 - Une possibilité de pouvoir accéder aux pages des profils des followers

Vos blocs devront être intégralement générés en Javascript par le biais de la méthode `document.createElement`et de `appendChild`.

## Utilisation plus avancée de l'api
Interrogez également l'url `https://api.github.com/users/{username}/repos`, récupérez les trois derniers dépôts sur lequel l'utilisateur a contribué. 
 - Le nom du dépôt doit être visible au niveau de la vignette utilisateur.
 - Un lien vers le dépôt doit exister.

## Utilisation de JQuery

Vous avez utilisé du VanillaJS jusqu'alors. C'est à dire le javascript natif présent au sein de tout browser. 
De nombreuses entreprises continuent à utiliser jQuery ce qui leurs permets de s'abstraire des particularités des différents navigateurs. 

Découvrons ici comment l'utiliser ! 

- Importez la bibliothèque `jQuery`, disponible [ici](https://jquery.com/download/)
- Modifiez le code précédent afin de remplacer le createElement,  le appendChild et les fetchs par les méthodes correspondantes de jQuery.


Attention, dans le futur, il n'est pas nécessaire d'utiliser $.ajax mais bien le fetch. Et il est important de noter qu'il n'est pas nécessaire d'inclure jQuery au sein de toutes vos applications. Cette bibliothèque est lourde et est souvent importée pour très peu de fonctionnalités. 
