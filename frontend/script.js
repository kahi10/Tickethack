//afficher la date de jour sur input date 
function setTodayDate() {
    const today = new Date(); 
    const yyyy = today.getFullYear(); 
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0'); 

    const formattedDate = `${yyyy}-${mm}-${dd}`; 
    document.querySelector('#dateChoisir').value = formattedDate; 
  }

  window.onload = setTodayDate;

//recuperer les champs des saisir pour la ville départ et la ville arrivée 
document.querySelector(".buttonReseach").addEventListener('click', function () {
   
})