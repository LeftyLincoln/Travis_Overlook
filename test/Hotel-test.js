import chai from "chai";
const expect = chai.expect;
import testData from "../src/data/testDataFile";
import Hotel from "../src/classes/Hotel";

describe("Hotel", () => {
  let testBookings, testRooms, testHotel;
  beforeEach(() => {
    testBookings = testData.testBookings;
    testRooms = testData.testRooms;
    testHotel = new Hotel(testBookings, testRooms);
  });

  it("should be a function", () => {
    expect(testHotel).to.be.instanceOf(Hotel);
  });

  it("should hold bookings for the hotel", () => {
    expect(testHotel.bookings).to.equal(testBookings);
  });

  it("should hold rooms for the hotel", () => {
    expect(testHotel.rooms).to.equal(testRooms);
  });

  it("should show available rooms for the hotel on date", () => {
    testHotel.findAvailableRooms("2022/02/07");
    expect(testHotel.availableRooms).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 10,
        roomType: "suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 1,
        costPerNight: 497.64,
      },
      {
        number: 11,
        roomType: "single room",
        bidet: true,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 207.24,
      },
      {
        number: 14,
        roomType: "residential suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 1,
        costPerNight: 457.88,
      },
    ]);
  });

  it("should filter available rooms by roomtype", () => {
    testHotel.findAvailableRooms("2022/02/07");
    expect(testHotel.filterByRoomType("suite")).to.deep.equal([
      {
        number: 10,
        roomType: "suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 1,
        costPerNight: 497.64,
      },
    ]);
  });
});
