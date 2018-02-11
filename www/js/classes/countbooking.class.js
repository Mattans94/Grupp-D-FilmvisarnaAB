//When class started load booking number from JSON
class Countbooking extends Base{
	constructor(){
		super();
    this.getBookingNumber();
	}

	async createBookingNumber(){  
		//Load booking number from JSON
    this.getBookingNumber();

    //Add one to booking number
    this.bookingNumber++;


    //Store booking number to JSON 
    await JSON._save('bookingNumber', {value:this.bookingNumber});

    //Return created booking number
    return this.bookingNumber;
	}

  //Load booking number from JSON
  async getBookingNumber(){
    let number =  await JSON._load('bookingNumber');
    this.bookingNumber = number.value;

  //Return the latest booking number
    return this.bookingNumber;

  }

}

