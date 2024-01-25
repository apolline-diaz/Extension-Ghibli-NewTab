// On ajoute un effet de 'typing' sur la date
const monTexteElement = document.getElementById("magical");

// Récupérez le texte à afficher
const texteComplet = monTexteElement.textContent;

// Effacez le contenu actuel de l'élément h1
monTexteElement.textContent = '';

// Utilisez une fonction pour ajouter les lettres une par une avec un délai
function afficherLettreParLettre(index) {
  if (index < texteComplet.length) {
    // Ajoutez la lettre actuelle au contenu de l'élément h1
    monTexteElement.textContent += texteComplet.charAt(index);

    // Appelez récursivement la fonction pour la lettre suivante après un délai
    setTimeout(function() {
      afficherLettreParLettre(index + 1);
    }, 60); 
  }
}

afficherLettreParLettre(0);