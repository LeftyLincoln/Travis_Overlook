import { getCustomerData, resolvePromises, showMessage, showUserErrorMessage} from "./scripts";

function fetchRequest(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .catch(showUserErrorMessage());
}

function postRequest(booking) {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        resolvePromises();
        getCustomerData();
        showMessage();
      }
    })
    .catch(showUserErrorMessage());
}

function fetchPromises() {
  const allCustomers = fetchRequest("customers");
  const allRooms = fetchRequest("rooms");
  const allBookings = fetchRequest("bookings");
  return Promise.all([allCustomers, allRooms, allBookings]);
}

export { fetchPromises, fetchRequest, postRequest };
