class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings
    
  }

  showBookings(allBookings) {
     this.bookings =  allBookings.filter(booking => this.id === booking.userID)
  }

  showAmountSpent(allRooms) {
   return this.bookings.reduce((acc, booking) => {
    allRooms.forEach(room => {
      if(room.number === booking.roomNumber) {
        acc += room.costPerNight
      }
    }) 
      return acc
    }, 0) 
  }

}



export default Customer;