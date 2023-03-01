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
const bookingSection = document.querySelector('booking-section')


// Global Variables
let allCustomers;
let allRooms;
let allBookings;


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
  });
  // .then(() => {
  //   hotelRepo = new Hotel(allBookings)
  //   displayBookings(hotelRepo)
  //   setCustomer(allCustomers)
  // })
};

function displayBookings() {
  bookingSection.innerHTML = ''
  
}


function setCustomer(arr) {
  let randomCustomerIndex = arr[Math.floor(Math.random() * arr.length)];
  randomCustomer = new Customer(randomUserIndex);
  console.log('Random Customer', randomCustomer);
}