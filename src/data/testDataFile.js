const testCustomers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  },
  {
    "id": 3,
    "name": "Kelvin Schiller"
  }
]

const testBookings = [
  {
    "id": "5fwrgu4i7k55hl6uf",
    "userID": 2,
    "date": "2023/01/09",
    "roomNumber": 18
  },
  {
    "id": "5fwrgu4i7k55hl6vw",
    "userID": 2,
    "date": "2023/02/11",
    "roomNumber": 9
  },
  {
    "id": "5fwrgu4i7k55hl6x8",
    "userID": 1,
    "date": "2023/01/11",
    "roomNumber": 20
  },
]

const testRooms = [
  {
    "number": 18,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 2,
    "costPerNight": 496.41
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
]


export default {testCustomers, testBookings, testRooms};