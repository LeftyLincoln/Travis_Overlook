class Hotel {
  constructor(bookingData, roomData) {
    this.bookings = bookingData
    this.rooms = roomData
    this.availableRooms 
  }

  findAvailableRooms(date) {
    let noRoomAvailable = this.bookings.reduce((acc, booking) => {
      if(booking.date === date) {
        acc.push(booking.roomNumber)
      }
      return acc
    }, [])

    this.availableRooms = this.rooms.reduce((acc, room) => {
      if(!noRoomAvailable.includes(room.number)) {
        acc.push(room)
      }
      return acc
    }, [])

    return this.availableRooms
  }

  filterByRoomType(value) {
      const filteredRooms = this.availableRooms.filter(room => room.roomType === value)
      return filteredRooms



  // addABooking(userID, date, roomNumber) {

  // }

  
}

export default Hotel;