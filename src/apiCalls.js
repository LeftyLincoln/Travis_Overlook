
function fetchRequest(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw new Error('Error');
    }
  })
  .catch(error => console.log(`Issue at: ${error}`))
}


export default function fetchPromises() {
  const allCustomers = fetchRequest('customers');
  const allRooms = fetchRequest('rooms');
  const allBookings = fetchRequest('bookings');
  return Promise.all([allCustomers, allRooms, allBookings]);
};



