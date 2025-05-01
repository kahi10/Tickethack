//afficher la date du jour sur input date 
function setTodayDate() {
    const today = new Date(); 
    const yyyy = today.getFullYear(); 
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0'); 

    const formattedDate = `${yyyy}-${mm}-${dd}`; 
    document.querySelector('#dateChoisir').value = formattedDate; 
  }

  window.onload = setTodayDate;

//cliquer sur le butoon Reseach recuperer les champs des saisir pour la ville départ et la ville arrivée 
document.querySelector(".buttonReseach").addEventListener('click', function () {
  const cityDepart = document.querySelector('#cityDeparture').value;
  const cityArrivel = document.querySelector('#cityArrival').value;
  const cityDate =  document.querySelector('#dateChoisir').value;
  const notFoundHTML = () => {
    document.querySelector('#train').src = './images/notfound.png';
    document.querySelector('h2').textContent = 'No trip found';
  };
  if (!cityDepart || !cityArrivel || !cityDate) {
    notFoundHTML();
  }
  fetch(`http://localhost:3000/trips/${cityDepart}/${cityArrivel}/${cityDate}`)
  .then(response => response.json())
  .then(data => {
      if (!data.trips?.length) {
        notFoundHTML();
      } else {
        document.querySelector('.divResult').innerHTML = '';
        data.trips.forEach(el => {
          document.querySelector('.divResult').innerHTML += `
            <div class="trip">
                <span id="depAriv">${el.departure}>${el.arrival}</span>
                <span id="heureTrip">${new Date(el.date).getHours()}:${new Date(el.date).getMinutes()}</span>
                <span id="price">${el.price}€</span>
                <p id='Idtrip'>${el._id}</p>
                <button class="buttonBook" id=>Book</button>
            </div>
          `
          selectTrip()
        });
      } 
  });
});
function selectTrip() {
  const results = document.querySelector('.trip');
  results.parentNode.querySelectorAll('.buttonBook').forEach(el => {
    el.addEventListener('click', function() {
      idTrip = this.parentNode.querySelector('#Idtrip').textContent
      console.log(idTrip)
      fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id: idTrip})
      })
      .then(response => response.json())
      .then(data => {
        window.location.assign('cart.html');
      })
  });
})
}
