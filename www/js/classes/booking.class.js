
class Booking extends Base{

	// constructor(userid, date, time, auditorium) {
	// 


	constructor() {
		super();
		this.date = '2018-03-06';
		this.time = '21.00';
		this.auditorium = 'Lilla Salongen';
		this.title = 'Wind River';
		this.userID = 1;

		this.child=1;
		this.adult=0;
		this.pensioner=0;
		this.myNumberOfSeats=1;
		

		
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
		this.getshowObject(this.title, this.auditorium, this.date, this.time);
		// console.log(this.title, this.auditorium, this.date, this.time);
	    this.eventHandler();
	    this.renderTicketButtons(); 	
	    theater.scale();
		
	}

	getshowObject(showName, auditorium, date, time) {
		this.showObject = this.showObjects.object.filter((x) => showName == x.film);
		this.showObject = this.showObject.filter((x) => auditorium == x.auditorium);
		this.showObject = this.showObject.filter((x) => date == x.date);
		this.showObject = this.showObject.find((x) => time == x.time);
		
		// this.showObject = this.showObject[0]
		// console.log(this.showObject);
	}

	updateTotalPrice(){
		// prices.start();
		let prices= new Prices(this.child, this.adult, this.pensioner);
		prices.calculateTotalPrice();
	}

	myNumberOfSeatsCheck() {
		this.myNumberOfSeats = this.child + this.adult + this.pensioner;
	}

	renderTicketButtons() {
		let html = `<div class="row justify-content-center">
			  	<span>
				  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
			  		<p class="text-white">Barn (under 12 år)</p>
				  		<div class="btn-group mr-2" role="group" aria-label="child group">
				    	<button type="button" class="btn btn-danger addbtn" id="removechild"><strong>-</strong></button>
				    	<input type="text" class="form-control col-2" id="childTickets" placeholder="${this.child}">
				    <button type="button" class="btn btn-danger removebtn" id="addchild"><strong>+</strong></button>
				  </div>
					</div>
				</span>
				<span>
				  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
					<p class="text-white">Ordinarie</p>
					  <div class="btn-group mr-2" role="group" aria-label="adult group">
					    <button type="button" class="btn btn-danger addbtn" id="removeadult"><strong>-</strong></button>
					    <input type="text" class="form-control col-2" id="adultTickets" placeholder="${this.adult}">
					    <button type="button" class="btn btn-danger removebtn" id="addadult"><strong>+</strong></button>
					  </div>
					</div>
				</span>
				<span>
				  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
					<p class="text-white">Pensionär</p>
					  <div class="btn-group mr-2" role="group" aria-label="pensioner group">
					    <button type="button" class="btn btn-danger addbtn" id="removepensioner"><strong>-</i></strong></button>
					    <input type="text" class="form-control col-2" id="pensionerTickets" placeholder="${this.pensioner}" >
					    <button type="button" class="btn btn-danger removebtn" id="addpensioner"><strong>+</strong></button>
					  </div>

					</div>
					
				</div>
				</span>
			
				<div class="ml-3 mt-5">			
					<button class="btn btn-danger book-btn">Forstätt</button>
				</div>`;
  	$('.ticketholder').html(html);

		$('html, body').animate({
        scrollTop: $(".ticketholder").offset().top -20
    }, 500);

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


		$(document).on('click', '#addchild', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.child += 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
			}
			else {
				alert ('Går endast att boka 8 platser!');
			}			
		});

		$(document).on('click', '#removechild', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.child -= 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
		}
		else {
			alert ('Du måste boka minst 1 plats!');
		}
		});		

		$(document).on('click', '#addadult', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.adult += 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
			}
			else {
				alert ('Går endast att boka 8 platser!');
			}	
		});

		$(document).on('click', '#removeadult', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.adult -= 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
			}
		else {
			alert ('Du måste boka minst 1 plats!');
		}
		});

		$(document).on('click', '#addpensioner', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.pensioner += 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
			}
			else {
				alert ('Går endast att boka 8 platser!');
			}	
		});

		$(document).on('click', '#removepensioner', () => {
			if (this.myNumberOfSeats > 0 && this.myNumberOfSeats < 8) {
			this.pensioner -= 1;
			that.renderTicketButtons();
			that.updateTotalPrice();
			that.myNumberOfSeatsCheck();
			console.log('myNumberOfSeats', this.myNumberOfSeats);
			}
		else {
			alert ('Du måste boka minst 1 plats!');
		}
		});

		
			// $(document).on("click", '.addbtn .removebtn', function() {
	// 	if ($('.addbtn') && $('#addchild')) {
	// 		this.child = this.child+1;
	// 	}
	// 	else if ($('.addbtn') && $('#addadult')) {
	// 		this.adult = this.adult+1;
	// 	}
	// 	else if ($('.addbtn') && $('#addpensioner')) {
	// 		this.pensioner = this.pensioner+1;
	// 	}
	// 	else if ($('.addbtn') && $('#removechild')) {
	// 		this.child = this.child-1;
	// 	}
	// 	else if ($('.addbtn') && $('#removeadult')) {
	// 		this.adult = this.adult-1;
	// 	}
	// 	else if ($('.addbtn') && $('#removepensioner')) {
	// 		this.pensioner = this.pensioner-1;
	// 	}
	// 	else { 
	// 		console.log('no changes');
	// 	}
	// });

		
	} // end eventhandler



} // end class