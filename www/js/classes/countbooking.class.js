class Countbooking extends Base{
	constructor(){
		super();
    this.getBookingNumber();
	}

	async createBookingNumber(){
    this.getBookingNumber();
    this.bookingNumber++;
    await JSON._save('bookingNumber', {value:this.bookingNumber});
    return this.bookingNumber;
	}

  async getBookingNumber(){
    let number =  await JSON._load('bookingNumber');
    this.bookingNumber = number.value;
    return this.bookingNumber;
  }
}
