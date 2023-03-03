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

// Functions

function resolvePromises() {
  fetchPromises()
  .then((data) => {
  allCustomers = data[0].customers.map((customer) => new Customer(customer))
  allRooms = data[1].rooms.map((room) => new Rooms(room))
  allBookings = data[2].bookings.map(booking => booking)
  console.log(allCustomers)
  console.log(allRooms)
  console.log(allBookings)
  })
  .then(() => {
    hotelRepo = new Hotel(allBookings, allRooms)
    console.log(hotelRepo)
    setCustomer(allCustomers)
    displayBookings(allBookings)
    displayAmountSpent()
})
    
};

function displayBookings(allBookings) {
const singleCustomer = randomCustomer.showBookings(allBookings)  
console.log(singleCustomer)

bookingSection.innerHTML = ''
singleCustomer.forEach(booking => {
    bookingSection.innerHTML += `
      <div class='booking-card'>
        <button class='booking-id' id='${booking.id}'>${booking.id}</button>
        <button class='booking-id' id='${booking.userID}'>${booking.userID}</button>
        <button class='booking-id' id='${booking.date}'>${booking.date}</button>
        <button class='booking-id' id='${booking.roomNumber}'>${booking.roomNumber}</button>
      </div>
    `
  })  
}

function displayAmountSpent() {
  randomCustomer.showAmountSpent(allRooms)
  console.log(randomCustomer)
}



function setCustomer(arr) {
  let randomCustomerIndex = arr[Math.floor(Math.random() * arr.length)];
  randomCustomer = new Customer(randomCustomerIndex);
}