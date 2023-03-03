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
  console.log(allCustomers, allRooms, allBookings)
  })
  .then(() => {
    hotelRepo = new Hotel(allBookings, allRooms)
    // console.log(hotelRepo)
    setCustomer(allCustomers)
    randomCustomer.showBookings(allBookings)
    displayBookings(randomCustomer.bookings)
    randomCustomer.showAmountSpent(allRooms)
    displayAmountSpent()
})
    
};

function displayBookings(customerBookings) {
bookingSection.innerHTML = ''
customerBookings.forEach(booking => {
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
  amountSpentSection.innerHTML = `Welcome ${randomCustomer.name}! You have spent $${randomCustomer.showAmountSpent(allRooms).toFixed(2)} at the Atlantis`
}

function setCustomer(arr) {
  randomCustomer = arr[0]

  //loggedInUser = id from login number - 1 

  // let randomCustomerIndex = arr[Math.floor(Math.random() * arr.length)];
  // randomCustomer = new Customer(randomCustomerIndex);
}