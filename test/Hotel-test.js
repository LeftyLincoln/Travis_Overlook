import chai from 'chai';
const expect = chai.expect;
import testData from '../src/data/testDataFile';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {
  let testBookings, testRooms, hotel
  beforeEach(() => {
    testBookings = testData.testBookings
    testRooms = testData.testRooms
    hotel = new Hotel(testBookings, testRooms)
  });

  it('should be a function', () => {
    expect(hotel).to.be.instanceOf(Hotel);
  });

  it('should hold bookings for the hotel', () => {
    expect(hotel.bookings).to.equal(testBookings);
  });

  it('should hold rooms for the hotel', () => {
    expect(hotel.rooms).to.equal(testRooms);
  });

  // it('should show available rooms for the hotel', () => {
  //   hotel.findAvailableRooms()
  //   expect(hotel.availableRooms).to.equal();
  // });


});
