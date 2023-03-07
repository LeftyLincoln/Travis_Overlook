// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import "./css/styles.css";
import Customer from "./classes/Customer";
import Rooms from "./classes/Rooms";
import Hotel from "./classes/Hotel";
import { fetchPromises, fetchRequest, postRequest } from "./apiCalls";

// Query Selectors

const bookingSection = document.querySelector(".booking-section");
const amountSpentSection = document.querySelector(".amount-spent-section");
const showAvailableRooms = document.querySelector(".show-rooms-button");
const showAvailableSection = document.querySelector(".available-section");
const dateChosen = document.getElementById("date");
const filterRoomSection = document.getElementById("type-of-room");
const filterRoomBtn = document.querySelector(".filter-rooms-button");
const logInForm = document.querySelector(".login-form");
const signInPage = document.querySelector(".sign-in-page");
const asideSection = document.querySelector(".aside");
const topSection = document.querySelector(".top-section");
const bottomSection = document.querySelector(".bottom-section");
const usernameField = document.getElementById("userInput");
const passwordField = document.getElementById("passwordInput");
const errorMessage = document.querySelector(".error-message");

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

showAvailableSection.addEventListener("click", (e) => {
  submitABooking(e);
});

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  authenticateLogin();
});

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
      dateChosen.setAttribute("value", new Date().toISOString().split("T")[0]);
      datePicked = dateChosen.value.replaceAll("-", "/");
      showRooms();
    });
}

function displayBookings(customerBookings) {
  let reservations = customerBookings.filter(booking => {
    return Date.parse(booking.date)
  })
  reservations.sort((a, b) => new Date(b.date) - new Date(a.date));

  bookingSection.innerHTML = "Your reservations:";
  reservations.forEach((booking) => {
    bookingSection.innerHTML += `
      <div class='booking-card' tabIndex='0'>
        <p class='booking-id' id='${booking.date}'>You booked room ${booking.roomNumber} for ${booking.date} 
        </p>
        </div>
      `;
  });
}

function displayAmountSpent() {
  amountSpentSection.innerHTML = `Welcome ${customer.name}! You have spent $${customer
    .showAmountSpent(allRooms)
    .toFixed(2)} at the Atlantis`;
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
  console.log("Firing");
  if (e.target.tagName === "BUTTON") {
    const roomNumber = Number(e.target.id);
    postRequest({
      userID: customer.id,
      date: datePicked,
      roomNumber: roomNumber,
    });
  }
}

const authenticateLogin = () => {
  const userName = usernameField.value;
  const passWord = passwordField.value;

  if (userName && passWord) {
    if (!userName.includes("customer")) {
      errorMessage.innerText = "No customer found with that name";
    } else if (passWord !== "overlook2021") {
      errorMessage.innerText = "Incorrect password! Perhaps try again";
    } else {
      const userID = parseInt(usernameField.value.split("customer")[1]);
      if (userID < 1 || userID > 50) {
        errorMessage.innerText = "No user found with that name";
      } else {
        getCustomerData();
        showDashboard();
      }
    }
  }
};

const getCustomerData = () => {
  const userID = parseInt(usernameField.value.split("customer")[1]);
  fetchRequest(`customers/${userID}`).then((data) => {
    customer = new Customer(data);
    customer.showBookings(allBookings);
    customer.showAmountSpent(allRooms);
    displayBookings(customer.bookings);
    displayAmountSpent();
  });
};

const showDashboard = () => {
  signInPage.classList.add("hidden");
  asideSection.classList.remove("hidden");
  topSection.classList.remove("hidden");
  bottomSection.classList.remove("hidden");
};

export { resolvePromises, getCustomerData };
