import chai from "chai";
import Rooms from "../src/classes/Rooms";
const expect = chai.expect;
import testData from "../src/data/testDataFile";

describe("Rooms", () => {
  let testRooms, room1, room2;
  beforeEach(() => {
    testRooms = testData.testRooms;
    room1 = new Rooms(testRooms[0]);
    room2 = new Rooms(testRooms[1]);
  });

  it("should be a function", () => {
    expect(room1).to.be.instanceOf(Rooms);
  });

  it("should have a unique number", () => {
    expect(room1.number).to.equal(18);
    expect(room2.number).to.equal(9);
  });

  it("should have a specific roomType", () => {
    expect(room1.roomType).to.equal("junior suite");
    expect(room2.roomType).to.equal("single room");
  });

  it("should say if it has a bidet in the room", () => {
    expect(room1.bidet).to.equal(false);
    expect(room2.bidet).to.equal(true);
  });

  it("should specify the bedsize", () => {
    expect(room1.bedSize).to.equal("king");
    expect(room2.bedSize).to.equal("queen");
  });

  it("should specify the number of beds", () => {
    expect(room1.numBeds).to.equal(2);
    expect(room2.numBeds).to.equal(1);
  });

  it("should specify the cost of the room for a night", () => {
    expect(room1.costPerNight).to.equal(496.41);
    expect(room2.costPerNight).to.equal(200.39);
  });
});
