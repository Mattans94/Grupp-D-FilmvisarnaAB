class Booking extends Base{

	// constructor(userid, date, time, auditorium) {
	//

	// Bör ta emot ett showObject från klassen theater som också initierar denna klass?
	// Behöver booking någonsin kallas om inte theater-kallas?
	constructor(showObject) {
		super();

		// This is from the right showObject
		this.date = showObject.date;
		this.time = showObject.time;
		this.auditorium = showObject.auditorium;
		this.title = showObject.film;
		this.showObject = showObject;
		//


		this.orderID = [];

		this.child=0;
		this.adult=0;
		this.pensioner=0;
		this.reservedSeats = 0;

		// Detta finns redan globalt i en data-klass. Är nog inte fel att ladda om när man väl bokar.
		// Men bör göras till Data-klassen istället för endast i denna klassen
	//Alla beställningar som har gjorts
		JSON._load('booking').then((seats) => {
	      // Retrieve the app from JSON
	      this.bookedSeats = seats;
				this.start();
	    });


	}

	// Behövs theater.scale() här? Den körs redan on-resize i popstate.
	start(){
		this.eventHandler();
		this.renderTicketButtons();
		this.checkForDisable();
		this.updateTotalPrice();
		this.myNumberOfSeatsCheck();
		console.log('twice?');
	}



	updateTotalPrice(){
		// prices.start();
		let prices = new Prices(this.child, this.adult, this.pensioner);
		prices.calculateTotalPrice();
		prices.renderTotalAmount();
	}

	myNumberOfSeatsCheck() {
		this.seatsTotal = (this.child + this.adult + this.pensioner);
	}

	renderTicketButtons() {
		let html =
			`<div class="d-flex flex-nowrap flex-column flex-md-row justify-content-md-around align-items-center">

					<div class="text-center text-md-left">
						<p class="text-white mb-0">Ordinarie</p>
					  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
						  <div class="btn-group mr-2" role="group" aria-label="adult group">
							  <button type="button" class="btn btn-danger removebtn" id="removeadult"><strong>-</strong></button>
							  <input type="text" class="form-control" id="adultTickets" placeholder="${this.adult}">
							  <button type="button" class="btn btn-danger addbtn" id="addadult"><strong>+</strong></button>
						 	</div>
						</div>
					</div>

					<div class="text-center text-md-left">
						<p class="text-white mb-0">Barn (under 12 år)</p>
					  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
					  	<div class="btn-group mr-2" role="group" aria-label="child group">
						    <button type="button" class="btn btn-danger removebtn" id="removechild"><strong>-</strong></button>
						    <input type="text" class="form-control" id="childTickets" placeholder="${this.child}">
						    <button type="button" class="btn btn-danger addbtn" id="addchild"><strong>+</strong></button>
					  	</div>
						</div>
					</div>
					<div class="text-center text-md-left">
						<p class="text-white mb-0">Pensionär</p>
						<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">

							<div class="btn-group mr-2" role="group" aria-label="pensioner group">
								<button type="button" class="btn btn-danger removebtn" id="removepensioner"><strong>-</strong></button>
								<input type="text" class="form-control" id="pensionerTickets" placeholder="${this.pensioner}" >
								<button type="button" class="btn btn-danger addbtn" id="addpensioner"><strong>+</strong></button>
							</div>
						</div>
					</div>
				</div>

				<div class="text-center text-md-left">
					<small class="text-danger"> Max 8 biljetter per bokning
					</small>
				</div>

			`;
  	$('.ticketholder').html(html);
	 }

	// Kan man göra om denna på något sätt för att optimera?
	checkForDisable(){
		this.disableRemoveButton('child');
		this.disableRemoveButton('adult');
		this.disableRemoveButton('pensioner');
		this.disableAddButton('child');
		this.disableAddButton('adult');
		this.disableAddButton('pensioner');

	}

	// Bra metoder, men vad händer om man går in i console och "fakear klick"?
	// Utöka till att sätta till placeholder till 0 utifall man skulle ändra på det sättet?
	disableRemoveButton(ticketType){
		let val = this[ticketType];
		if (val <= 0){
			$('#remove' + ticketType).prop('disabled', true);
		} else {
			$('#remove' + ticketType).prop('disabled', false);
	}
		}

	disableAddButton(ticketType){
		let val = this[ticketType];
		if (val >= 8  || this.seatsTotal == 8){
			$('#add' + ticketType).prop('disabled', true);
		}else {
			$('#add' + ticketType).prop('disabled', false);
		}
	}

	getShowIndex(){
		return Data.showObjects.findIndex((o) => {return o.date == this.showObject.date && o.time == this.showObject.time});
	}

	resetBookingButtons(){
		if (this.seatsTotal < this.reservedSeats) {
			$('.seat').addClass('free').removeClass('reserved');
		}
	}

	// Lång eventHandler - kanske behövs.
	// Varför laddas json in i eventHandler och inte constructorn?
	// Behöver man ladda json varje gång man trycker någonstans? Isåfall lägg inladdning på ett klick
	eventHandler() {

		let that = this;
		$(document).on('click','.book-btn',function(){
			// Temporärt objekt varje gång man klickar
			let tempBookingObject = {};
			// Laddar in all json som behövs
			JSON._load('booking').then((data) => {
					// Retrieve the app from JSON
				that.bookedSeats = data;
			})
			.then(JSON._load('shows').then((shows) => {
      	Data.showObjects = shows;
	    })
			.then(JSON._load('session').then((userid) => {
				that.loggedInUser = userid;
			})
			.then(() => {
				tempBookingObject.show = that.showObject;
				tempBookingObject.show.userID = that.loggedInUser;
				tempBookingObject.show.orderID = [];
				tempBookingObject.show.bookedSeats = [];

				$('.seat.reserved').each(function(){
					let seat = $(this);
					let seatID = seat.data('seatid');
					// console.log(seatID);
					that.showObject.bookedSeats.push(seatID);
					let showObjectIndex = that.getShowIndex();
					Data.showObjects[showObjectIndex].bookedSeats.push(seatID);
					// tempBookingObject.show.bookedSeats.push(seatID);
				});
			 	that.bookedSeats.push(tempBookingObject);
			//that.bookedSeats.push(that.bookedSeats);
			// console.log(that.bookedSeats)
			//console.log(that.booking.show)
			//Object.assign(that.booking.show, {bookedSeats: that.booking})
			//Save booked-info + sittplats to JSON
			JSON._save('booking', that.bookedSeats);
			JSON._save('shows', Data.showObjects);
			// console.log('saving', that.bookedSeats)


		})))});

		// JSON._load('booking',(data){
		// 	this.bookings = data;
		// 	this.seatOccupied();
		// });

		// $(document).on('click', '.btn-danger', function() {
		// 	let clickedbutton = $(this);
		// 	clickedbutton
		// });

		// Kan man göra dessa annorlunda? Kolla tillsammans
		$(document).on('click', '#addchild', () => {
			this.child += 1;
			$('#childTickets').attr("placeholder", this.child);
			})

		$(document).on('click', '#removechild', () => {
			this.child -= 1;
			$('#childTickets').attr("placeholder", this.child)
		})

		$(document).on('click', '#addadult', () => {
			this.adult += 1;
			$('#adultTickets').attr("placeholder", this.adult)
		})

		$(document).on('click', '#removeadult', () => {
			this.adult -= 1;
			$('#adultTickets').attr("placeholder", this.adult)
		})

		$(document).on('click', '#addpensioner', () => {
			this.pensioner += 1;
			$('#pensionerTickets').attr("placeholder", this.pensioner)
		})

		$(document).on('click', '#removepensioner', () => {
			this.pensioner -= 1;
			$('#pensionerTickets').attr("placeholder", this.pensioner)
		})

		$(document).on('click','.addbtn', () => {
			this.myNumberOfSeatsCheck();
			this.checkForDisable();
			this.updateTotalPrice();
			this.resetBookingButtons();
		})

		$(document).on('click','.removebtn', () => {
			this.myNumberOfSeatsCheck();
			this.checkForDisable();
			this.updateTotalPrice();
			this.resetBookingButtons();
		})

	} // end eventhandler

} // end class
