//cliquer sur navigation cart pour afficher les carts dans le panier et faire appeler mehode get sur les collections carts 
fetch("http://localhost:3000/carts")
    .then(response=> response.json())
    .then(data => {
        if(!data.result){
            document.querySelector('#header').parentNode.innerHTML+=`<div class="cartvide">  
            <p>No tickets in your cart <br>
            Why not plan a trip?</p>
            </div>`
            document.querySelector(".myCarts").style.display = "none"
        }else{
            let totalPrice=0;
            data.data.forEach(trip => {
                const depart=trip.tripId.departure;
                const arrival=trip.tripId.arrival;
                const date=new Date(trip.tripId.date)
                const heure=date.getHours();
                const mins=date.getMinutes();
                const Price=trip.tripId.price;
                const Idtrip=trip._id;
                totalPrice+=Price;
                document.querySelector('.alltrips').innerHTML+=`<div class="tripSelect">
                  <span id="cartTrip">${depart}>${arrival}</span>
                  <span id="cartHeure">${heure}:${mins}</span>
                  <span id="cartPrice">${Price}€</span>
                  <p id="Idtrip">${Idtrip}<p>
                  <button id="delete">x</button></div>`
                });
                document.querySelector(".myCarts").style.display = "flex";
                document.querySelector('#totalPrice').textContent=`Total: ${totalPrice}€`;
                DeleteCart();
            }
        });


//delete button function
function DeleteCart(){
    const deleteButtons = document.querySelectorAll("#delete");
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tripElement=this.parentNode.parentNode;
            let idtripValue = document.getElementById("Idtrip").textContent;
            
            tripElement.remove();
            document.querySelector('#totalPrice').textContent=`Total:`;

            fetch('http://localhost:3000/carts', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({_id: idtripValue})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        });
    });
}




//cliquer sur navigation booking pour afficher la page html booking et faire appeler methode get sur les collections bookings 
document.querySelector('#bookingNav').addEventListener('click',function(){


})
