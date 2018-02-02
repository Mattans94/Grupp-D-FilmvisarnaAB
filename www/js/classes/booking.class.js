class Booking{

	// constructor(userid, date, time, auditorium) {
	// 


	constructor() {
		this.date = '2018-03-04';
		this.time = '21.00';
		this.auditorium = 'Lilla Salongen';
		this.userID = 1;
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
		JSON._load('booking').then((data) => {
	      // Retrieve the app from JSON
	      this.bookedSeats = data;
	      console.log(this.bookedSeats)
	    })
	 
		this.booking = {};
		let that = this;
		$(document).on('click','.book-btn',function(){
			
			that.booking.show = that.showObject;

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

			$(document).on("click", '.addbtn .removebtn', function() {
		if ($('.addbtn') && $('#addchild')) {
			this.child = this.child+1;
		}
		else if ($('.addbtn') && $('#addadult')) {
			this.adult = this.adult+1;
		}
		else if ($('.addbtn') && $('#addpensioner')) {
			this.pensioner = this.pensioner+1;
		}
		else if ($('.addbtn') && $('#removechild')) {
			this.child = this.child-1;
		}
		else if ($('.addbtn') && $('#removeadult')) {
			this.adult = this.adult-1;
		}
		else if ($('.addbtn') && $('#removepensioner')) {
			this.pensioner = this.pensioner-1;
		}
		else { 
			console.log('no changes');
		}
	});
	}
		
	} // end eventhandler
} // end class