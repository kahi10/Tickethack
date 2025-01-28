//afficher placeholder de input date pour la date actuelle
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois (0-indexé)
    const day = String(today.getDate()).padStart(2, '0'); // Jour
    return `${day}/${month}/${year}`;
}

const dateInput = document.querySelector('#dateChoisir');
console.log(dateInput);

dateInput.setAttribute('placeholder', getCurrentDate());