class Booking{

	// constructor(userid, date, time, auditorium, userID) {
	// this.userID = userid;


	constructor() {
		this.date = '2018-03-04';
		this.time = '21.00';
		this.auditorium = 'Lilla Salongen';
		this.userID = '1';
		this.showObject;
	//Alla beställningar som har gjorts
		JSON._load('booking').then((seats) => {
	      // Retrieve the app from JSON
	      this.bookedSeats = seats;
	    });

	    JSON._load('shows').then((shows) => {
	      // Retrieve the app from JSON
	      //console.log(this)
	      this.showObjects = shows;
	      this.start();
	    });


	}

	start(){
		this.eventHandler();
		this.getshowObject('Wind River', this.auditorium, this.date, this.time);
	    this.eventHandler();
		
	}

	getshowObject(showName, auditorium, date, time) {
		console.log(this.showObjects);
		this.showObject = this.showObjects.object.filter((x) => showName == x.film);
		this.showObject = this.showObject.filter((x) => auditorium == x.auditorium);
		this.showObject = this.showObject.filter((x) => date == x.date);
		this.showObject = this.showObject.find((x) => time == x.time);
		// this.showObject = this.showObject[0]
		console.log(this.showObject);
	}

	eventHandler() {
		$(document).ready();
		$(document).on('click','.book-btn', function(){
		// JSON._load('booking').then((seats) => {
	 //      // Retrieve the app from JSON
	 //      this.bookedSeats = seats;
	 //      console.log(this.bookedSeats)
	 //    });
	 let seat = $(this);
	 console.log(seat);
			let seatID = seat.data('seatid');
			let rowID = seat.data('rowid')

		// console.log('this.userID', this.userID);	
		this.booking = {};		
		let that = this;
			this.booking.show = this.showObject;
			console.log('this.showObject', this.showObject);
			// this.booking.show.userID = this.userID;
			this.booking.show.seats = [];

			that.booking.show.userID = that.userID;
			that.booking.show.bookedSeats = [];

			console.log(that.booking);
			$('.seat.booked').each(function(){
				let seat = $(this);
				let seatID = seat.data('seatid');
				console.log(seatID);
				that.booking.show.bookedSeats.push(seatID);
			});
			 that.bookedSeats.push(that.booking);
			//that.bookedSeats.push(that.bookedSeats);
			console.log(that.bookedSeats)
			//console.log(that.booking.show)
			//Object.assign(that.booking.show, {bookedSeats: that.booking})
			//Save booked-info + sittplats to JSON
			JSON._save('booking', that.bookedSeats);
			console.log('saving', that.bookedSeats)

		});

		// JSON._load('booking',(data){
		// 	this.bookings = data;
		// 	this.seatOccupied();
		// });
	}
}