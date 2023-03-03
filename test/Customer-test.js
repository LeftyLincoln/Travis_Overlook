import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import testData from '../src/data/testDataFile';


describe('Customer', () => {
  let customer1, customer2, testCustomers, testBookings, testRooms
  beforeEach(() => {
    testCustomers = testData.testCustomers
    testBookings = testData.testBookings
    testRooms = testData.testRooms
    customer1 = new Customer(testCustomers[0]);
    customer2 = new Customer(testCustomers[1]);
  });

  it('should be a function', () => {
    expect(customer1).to.be.instanceOf(Customer);
  });
  
  it('should have a unique id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it('should have a unique name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal( "Rocio Schuster");
  });

  it('should save bookings for that customer', () => {
    customer1.showBookings(testBookings)
    expect(customer1.bookings).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6x8",
      "userID": 1,
      "date": "2023/01/11",
      "roomNumber": 20
    }])
  })

  it('calculate amount customer has spent on bookings', () => {
    customer2.showBookings(testBookings)
    expect( customer2.showAmountSpent(testRooms)).to.equal(696.8)
  });

});