// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import Customer from "./classes/Customer";
import Rooms from "./classes/Rooms"
import Hotel from "./classes/Hotel"
import fetchPromises from "./apiCalls"


// Query Selectors
const bookingSection = document.querySelector('.booking-section')
const amountSpentSection = document.querySelector('.amount-spent-section')
const showAvailableRooms = document.querySelector('.show-rooms-button')
const showAvailableSection = document.querySelector('.available-section')
const dateChosen = document.getElementById('date')
const filterRoomSection = document.getElementById('type-of-room')
const filterRoomBtn = document.querySelector('.filter-rooms-button')

// Global Variables
let allCustomers;
let allRooms;
let allBookings;
let hotelRepo;
let randomCustomer;

// Event Listeners
window.addEventListener("load", () => {
  resolvePromises();
});

showAvailableRooms.addEventListener('click', showRooms)
filterRoomBtn.addEventListener('click', filterRooms )

// Functions

function resolvePromises() {
  fetchPromises()
  .then((data) => {
  allCustomers = data[0].customers.map((customer) => new Customer(customer))
  allRooms = data[1].rooms.map((room) => new Rooms(room))
  allBookings = data[2].bookings.map(booking => booking)
  console.log(allCustomers, allRooms, allBookings)
  })
  .then(() => {
    hotelRepo = new Hotel(allBookings, allRooms)
    setCustomer(allCustomers)
    randomCustomer.showBookings(allBookings)
    displayBookings(randomCustomer.bookings)
    randomCustomer.showAmountSpent(allRooms)
    displayAmountSpent()
})
    
};

function displayBookings(customerBookings) {
bookingSection.innerHTML = 'Your reservations:'
customerBookings.forEach(booking => {
    bookingSection.innerHTML += `
      <div class='booking-card'>
        <p class='booking-id' id='${booking.date}'>On ${booking.date} you booked room ${booking.roomNumber}
        </p>
        </div>
    `
  })  
}

function displayAmountSpent() {
  amountSpentSection.innerHTML = `Welcome ${randomCustomer.name}! You have spent $${randomCustomer.showAmountSpent(allRooms).toFixed(2)} at the Atlantis`
}

function setCustomer(arr) {
  randomCustomer = arr[0]

  //loggedInUser = id from login number - 1 

  // let randomCustomerIndex = arr[Math.floor(Math.random() * arr.length)];
  // randomCustomer = new Customer(randomCustomerIndex);
}

let datePicked
let rooms

function showRooms () {
 
  datePicked = dateChosen.value.replaceAll('-', '/')
  rooms = hotelRepo.findAvailableRooms(datePicked)

  console.log(datePicked)
  console.log(hotelRepo.availableRooms)
  
  showAvailableSection.innerHTML = 'Here are our available rooms for you:'
  rooms.forEach(room =>  {
  showAvailableSection.innerHTML += `
    <div class='room-card'>
      <p class='room-id' id='${room.number}'>Room ${room.number} is a ${room.roomType}<br>
      with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
      </p>
    </div>
  `
  })
}

function filterRooms() {
showAvailableSection.innerHTML = ''

let filteredRoom = filterRoomSection.value
console.log(filteredRoom)
const filteredByType = hotelRepo.filterByRoomType(filteredRoom) 
filteredByType.forEach(room => {
showAvailableSection.innerHTML += ` 
  <div class='room-card'>
    <p class='room-id' id='${room.number}'>Room ${room.number} is a ${room.roomType}<br>
    with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
    </p>
  </div>
  `
})


}

