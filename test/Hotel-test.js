import chai from 'chai';
const expect = chai.expect;
import testData from '../src/data/testDataFile';
import Hotel from '../src/classes/Hotel';

describe('Hotel', () => {
  let testBookings, testRooms, testHotel
  beforeEach(() => {
    testBookings = testData.testBookings
    testRooms = testData.testRooms
    testHotel = new Hotel(testBookings, testRooms)
  });

  it('should be a function', () => {
    expect(testHotel).to.be.instanceOf(Hotel);
  });

  it('should hold bookings for the hotel', () => {
    expect(testHotel.bookings).to.equal(testBookings);
  });

  it('should hold rooms for the hotel', () => {
    expect(testHotel.rooms).to.equal(testRooms);
  });

  it('should show available rooms for the hotel', () => {
    testHotel.findAvailableRooms('2022/02/07')
    expect(testHotel.availableRooms).to.equal();
  });


});
