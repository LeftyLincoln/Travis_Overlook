import { getCustomerData, resolvePromises, showMessage, showUserErrorMessage} from "./scripts";

function fetchRequest(type) {
  return fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/${type}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .catch(() => console.log('error'));
}

function postRequest(booking) {
  fetch("https://overlook-api-jfogiato.vercel.app/api/v1/bookings", {
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
