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
// const usernameField = document.querySelector("#userInput");
// const passwordField = document.querySelector("#passwordInput");
const bookingSection = document.querySelector(".booking-section");
const amountSpentSection = document.querySelector(".amount-spent-section");
const showAvailableRooms = document.querySelector(".show-rooms-button");
const showAvailableSection = document.querySelector(".available-section");
const dateChosen = document.getElementById("date");
const filterRoomSection = document.getElementById("type-of-room");
const filterRoomBtn = document.querySelector(".filter-rooms-button");
// const logInButton = document.querySelector("login-submit");
// const logInPage = document.querySelector(".login");
// const asideSection = document.querySelector(".aside");
// const topSection = document.querySelector(".top-section");
// const bottomSection = document.querySelector(".bottom-section");

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

// logInButton.addEventListener("submit", (e) => {
//   e.preventDefault();
//   checkPassword();
// });

// Functions

const resolvePromises = () => {
  fetchPromises()
    .then((data) => {
      allCustomers = data[0].customers.map((customer) => new Customer(customer))
      allRooms = data[1].rooms.map((room) => new Rooms(room))
      allBookings = data[2].bookings.map((booking) => booking)
    })
    .then(() => {
      hotelRepo = new Hotel(allBookings, allRooms)
      setCustomer(allCustomers)
      customer.showBookings(allBookings)
      displayBookings(customer.bookings)
      customer.showAmountSpent(allRooms)
      displayAmountSpent()
      dateChosen.setAttribute("value", new Date().toISOString().split("T")[0]);
      datePicked = dateChosen.value.replaceAll("-", "/");
      showRooms();
    });
};

const displayBookings = (customerBookings) => {
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
};

const displayAmountSpent = () => {
  amountSpentSection.innerHTML = `Welcome ${customer.name}! You have spent $${customer
    .showAmountSpent(allRooms)
    .toFixed(2)} at the Atlantis`;
};

const setCustomer = (arr) => {
  customer = arr[3];
  //loggedInUser = id from login number - 1
};

const showRooms = () => {
  datePicked = dateChosen.value.replaceAll("-", "/");
  rooms = hotelRepo.findAvailableRooms(datePicked);

  if (hotelRepo.availableRooms.length < 1) {
    showAvailableSection.innerHTML =
      "We are so deeply sorry there are no rooms on this date, please choose another date.";
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
};

const filterRooms = () => {
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
};

const submitABooking = (e) => {
  if (e.target.tagName === "BUTTON") {
    const roomNumber = Number(e.target.id);
    postRequest({
      userID: customer.id,
      date: datePicked,
      roomNumber: roomNumber,
    });
  }
};

//const userId = usernameField.value.slice(-2)

// const checkPassword = () => {
//   if (passwordField.value === "overlook2021") {
//     console.log("good work");
//     // getCustomerData()
//     // showDashboard()
//     //resolvePromises() ??
//   } else {
//     alert("Please check your password and try again");
//   }
// };

// const showDashboard = () => {
//   logInPage.classList.add("hidden");
//   asideSection.classList.remove("hidden");
//   topSection.classList.remove("hidden");
//   bottomSection.classList.remove("hidden");
// };

// const getCustomerData = () => {
//   const userID = Number(usernameField.value.slice(-2));
//   const i = allCustomers.map((customer) => customer.id).indexOf(userID);
//   customer = new Customer(allCustomers[i]);
//   customer.showBookings(allBookings)
//   customer.showAmountSpent(allRooms)
//   displayBookings()
//   displayAmountSpent()
// };

export default resolvePromises;
