
function fetchRequest(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then((response) => response.json())
  .then(data => console.log(data))
  .catch((error) => console.log(error))
}

export default function fetchPromises() {
  const allCustomers = fetchRequest('customers');
  const allRooms = fetchRequest('rooms');
  const allBookings = fetchRequest('bookings');
  return Promise.all([allCustomers, allRooms, allBookings]);
};



