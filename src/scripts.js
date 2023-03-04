// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

import Customer from "./classes/Customer";
import Rooms from "./classes/Rooms";
import Hotel from "./classes/Hotel";
import { fetchPromises, postRequest } from "./apiCalls";

// Query Selectors
const usernameField = document.querySelector('#userInput')
const passwordField = document.querySelector('#passwordInput')
const bookingSection = document.querySelector(".booking-section");
const amountSpentSection = document.querySelector(".amount-spent-section");
const showAvailableRooms = document.querySelector(".show-rooms-button");
const showAvailableSection = document.querySelector(".available-section");
const dateChosen = document.getElementById("date");
const filterRoomSection = document.getElementById("type-of-room");
const filterRoomBtn = document.querySelector(".filter-rooms-button");
const logInButton = document.querySelector('login-submit')
// Global Variables
let allCustomers;
let allRooms;
let allBookings;
let hotelRepo;
let customer;
let datePicked;
let rooms;

// Event Listeners
window.addEventListener("load", () => {
  resolvePromises();
});

showAvailableRooms.addEventListener("click", showRooms);
filterRoomBtn.addEventListener("click", filterRooms);
showAvailableSection.addEventListener("click", submitABooking);

// userNameField.addEventListener()
// passwordField.addEventListener()
logInButton.addEventListener('', authenticateUser)
// Functions

function resolvePromises() {
  fetchPromises()
    .then((data) => {
      allCustomers = data[0].customers.map(
        (customer) => new Customer(customer)
      );
      allRooms = data[1].rooms.map((room) => new Rooms(room));
      allBookings = data[2].bookings.map((booking) => booking);
    })
    .then(() => {
      hotelRepo = new Hotel(allBookings, allRooms);
      setCustomer(allCustomers);
      customer.showBookings(allBookings);
      displayBookings(customer.bookings);
      customer.showAmountSpent(allRooms);
      displayAmountSpent();
      dateChosen.setAttribute("value", new Date().toISOString().split("T")[0]);
      datePicked = dateChosen.value.replaceAll("-", "/");
      showRooms();
    });
}

function displayBookings(customerBookings) {
  console.log(customerBookings);
  bookingSection.innerHTML = "Your reservations:";
  customerBookings.forEach((booking) => {
    bookingSection.innerHTML += `
      <div class='booking-card'>
        <p class='booking-id' id='${booking.date}'>On ${booking.date} you booked room ${booking.roomNumber}
        </p>
        </div>
      `;
  });
}

function displayAmountSpent() {
  amountSpentSection.innerHTML = `Welcome ${
    customer.name
  }! You have spent $${customer
    .showAmountSpent(allRooms)
    .toFixed(2)} at the Atlantis`;
}

function setCustomer(arr) {
  customer = arr[3];

  //loggedInUser = id from login number - 1

  // let randomCustomerIndex = arr[Math.floor(Math.random() * arr.length)];
  // randomCustomer = new Customer(randomCustomerIndex);
}

function showRooms() {
  datePicked = dateChosen.value.replaceAll("-", "/");
  rooms = hotelRepo.findAvailableRooms(datePicked);

  if (hotelRepo.availableRooms.length < 1) {
    showAvailableSection.innerHTML =
      "We are so deeply sorry there are no rooms on the date, please choose another date.";
  } else {
    showAvailableSection.innerHTML = "Here are our available rooms for you:";
    rooms.forEach((room) => {
      showAvailableSection.innerHTML += `
        <div class='room-card'>
          <button class='button-booking' id='${room.number}'>Book Room ${room.number}</button>
          <p class='room-id' id='${room.number}'>This is a ${room.roomType}<br>
          with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
          </p>
      </div>
    `;
    });
  }
}

function filterRooms() {
  hotelRepo.findAvailableRooms(datePicked);
  showAvailableSection.innerHTML = "";
  let filteredRoom = filterRoomSection.value;
  const filteredByType = hotelRepo.filterByRoomType(filteredRoom);

  if (hotelRepo.availableRooms.length < 1) {
    showAvailableSection.innerHTML =
      "We are so deeply sorry there are no rooms on the date, please choose another date.";
  } else {
    filteredByType.forEach((room) => {
      showAvailableSection.innerHTML += ` 
      <div class='room-card'>
      <button class='button-booking' id='${room.number}'>Book Room ${room.number}</button>
      <p class='room-id' id='${room.number}'>This is a ${room.roomType}<br>
      with ${room.numBeds} ${room.bedSize} bed and costs $${room.costPerNight} per night
      </p>
    </div>
    `;
    });
  }
}

function submitABooking(e) {
  if (e.target.tagName === "BUTTON") {
    const roomNumber = Number(e.target.id);
    postRequest({
      userID: customer.id,
      date: datePicked,
      roomNumber: roomNumber,
    });
  }
}

// authenticateUser(id) {
//  //const userId = usernameField.value.slice(-2)

//   if(passwordField.value === 'overlook2021')


// }








export default resolvePromises;
