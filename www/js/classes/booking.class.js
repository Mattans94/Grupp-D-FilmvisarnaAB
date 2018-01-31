class Booking {

	// constructor(userid, date, time, auditorium) {
	// this.userID = userid;

	constructor() {
		this.date = '2018-03-04';
		this.time = '21.00';
		this.auditorium = 'Lilla Salongen';
	//Alla beställningar som har gjorts
		JSON._load('booking').then((seats) => {
	      // Retrieve the app from JSON
	      this.bookedSeats = seats;
	    });

	    JSON._load('shows').then((shows) => {
	      // Retrieve the app from JSON
	      this.showObjects = shows;
	      this.start();
	    });
	}

	start(){
		this.getshowObject('Wind River', this.auditorium, this.date, this.time);
		
	}

	getshowObject(showName, auditorium, date, time) {
		this.showObject = this.showObjects.object.filter((x) => showName == x.film);
		this.showObject = this.showObject.filter((x) => auditorium == x.auditorium);
		this.showObject = this.showObject.filter((x) => date == x.date);
		this.showObject = this.showObject.filter((x) => time == x.time);

		console.log(this.showObject);
	}

	eventHandler() {
		// JSON._load('booking').then((seats) => {
	 //      // Retrieve the app from JSON
	 //      this.bookedSeats = seats;
	 //      console.log(this.bookedSeats)
	 //    });

		this.booking = {};
		let that = this;
		$(document).on('click','.book-btn',function(){
			
			that.booking.show = that.showObject;
			that.booking.show.userID = this.userID;
			that.booking.show.seats = [];

			console.log('this.booking', this.booking);
			$('.seat.booked').each(function(){
				let seat = $(this);
				let seatID = seat.data('seatid');
				console.log(seatID);
				that.booking.show.seats.push(seatID);
			});

			that.bookedSeats.push(that.booking);
			//Save booked-info + sittplats to JSON
			JSON._save('booking', that.bookedSeats);
			console.log('saving', that.bookedSeats,)

		});

		// JSON._load('booking',(data){
		// 	this.bookings = data;
		// 	this.seatOccupied();
		// });
	}
}