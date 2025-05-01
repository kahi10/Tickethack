//cliquer sur navigation cart pour afficher les carts dans le panier et faire appeler mehode get sur les collections carts 
BACKEND_URL = 'https://tickethack-eight.vercel.app/';
fetch(`${BACKEND_URL}/carts`)
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
                selectBooking();
            }
        });


//delete button function
function DeleteCart(){
    const deleteButtons = document.querySelectorAll("#delete");
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tripElement=this.parentNode.parentNode;
            let idtripValue = document.getElementById("Idtrip").textContent;
            let priceText = document.querySelector("#cartPrice").textContent; 
            let price = parseFloat(priceText.replace("€", "").trim());
            let totalPriceText = document.querySelector("#totalPrice").textContent;
            let totalPrice = parseFloat(totalPriceText.replace("Total:", "").replace("€", "").trim());
            totalPrice-=price;
            tripElement.remove();
            document.querySelector('#totalPrice').textContent=`Total:${totalPrice}`;

            fetch(`${BACKEND_URL}/carts`, {
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



// button purchase pour finaliser l'achat 
function selectBooking() {
    const purchaseButton = document.querySelector('#purchaseButton'); 
    console.log(purchaseButton);
    purchaseButton.addEventListener('click', function(){
        const trips = document.querySelectorAll('.tripSelect');
        const idTripValue = document.querySelectorAll('.idTrip').textContent;
        trips.forEach(trip=>{
            fetch(`${BACKEND_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tripId: idTripValue, reservationDate: new Date()}) 
            })
            .then(response => response.json())
            .then(data => {
                window.location.assign('booking.html');
                console.log(data);
            })
        })
        
    })}
    