fetch('http://localhost:3000/bookings')
.then(response => response.json())
.then(trips => {
    //console.log(trips)
    if (!trips.result) {
        return
    }
    document.querySelector('.bookingvide').innerHTML = '';
    trips?.data.forEach(el => {
        document.querySelector('.bookingvide').innerHTML += `
        <div class="myBookings">
            <h3>My bookings</h3>
            <div class="bookingSelect">
                <span id="bookingTrip">${el.tripId.departure}>${el.tripId.arrival}</span>
                <span id="bookingtripHeure">${new Date(el.tripId.date).getHours()}:${new Date(el.tripId.date).getMinutes()}</span>
                <span id="totalbookingprice">${el.tripId.price}€</span>
                <span id="calculateheursdepart">Departure in ${restTimeTrip(el.tripId.date)} hours</span>
            </div>
            <hr width="20%">
            <p id="greetingMessage">Enjoy your travels with TicketHack!</p>
        </div>
    `
    });
    
})

function restTimeTrip(departure) {
    const timeNow = new Date().getTime();
    const departureTime = new Date(departure).getTime();
    return `${Math.round((departureTime - timeNow) / 1000 / 3600)}`
}

