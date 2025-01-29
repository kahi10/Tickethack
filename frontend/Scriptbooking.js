fetch('http://localhost:3000/bookings')
.then(response => response.json())
.then(trips => {
    console.log(trips)
    if (!trips.result) {
        return
    }
    document.querySelector('.bookingvide').innerHTML = '';
    trips.data.forEach(el => {
        document.querySelector('.bookingvide').innerHTML += `
        <div class="myBookings">
            <h3>My bookings</h3>
            <div class="bookingSelect">
                <span id="bookingTrip">${el.tripId.departure}>${el.tripId.arrival}</span>
                <span id="bookingtripHeure">${new Date(el.tripId.date).getHours()}:${new Date(el.tripId.date).getMinutes()}</span>
                <span id="totalbookingprice">${el.tripId.price}€</span>
                <span id="calculateheursdepart">Departure in ${restTimeTrip(el.reservationDate, el.tripId.date)} hours</span>
                </div>
            <hr width="10%">
            <p id="greetingMessage">Enjoy your travels with TicketHack!</p>
          </div>
    `
    });
    
})


function restTimeTrip(reservation, departure) {
    const reservationTime = reservation.getTime();
    const departureTime = new Date(departure).getTime();
    
    return `${(departureTime - reservationTime) / 1000 / 60}`
}