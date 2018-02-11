class Booking extends Base{
	constructor(showObject) {
		super();

		// This is from the right showObject
		this.date = showObject.date;
		this.time = showObject.time;
		this.auditorium = showObject.auditorium;
		this.title = showObject.film;
		this.showObject = showObject;
		//


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
				this.allBookings = seats;
				this.start();
	    });


	}

	// Behövs theater.scale() här? Den körs redan on-resize i popstate.
	start(){
		this.eventHandler();
		this.checkForDisable();
		this.updateTotalPrice();
		this.myNumberOfSeatsCheck();
	}

	updateTotalPrice(){
		this.prices = new Prices(this.child, this.adult, this.pensioner);
		this.prices.calculateTotalPrice();
		this.prices.renderTotalAmount();
	}

	myNumberOfSeatsCheck() {
		this.seatsTotal = (this.child + this.adult + this.pensioner);
	}


	returnGeneratedId(){
		let generatedID;
		do {
			generatedID = this.generateOrderId();
		}	while (this.checkExistingId(generatedID));

		return generatedID;
	}

	generateOrderId(){
		let generatedID = '';
		let allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 9; i++) {
			generatedID += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
		}

		return generatedID;
	}

	checkExistingId(generatedID){
		for (let i = 0; i < this.allBookings.length; i++){
			if (generatedID == this.allBookings[i].show.orderID){
				return true;
			} else {
				return false;
			}
		}
	}

	throwErrorMessageIfNotLoggedIn(){
		return 'Du måste logga in för att boka platser';
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
			this.reservedSeats = 0;
		}

	}

	bookingModal(){
		// Hämta bokade säten
		let bookedSeats = [];
		$('.seat.reserved').each(function(){
			let seat = $(this);
			let seatID = seat.data('seatid');
			console.log(seatID);
			bookedSeats.push(seatID);
		});
		// Skicka in allt modalen behöver veta
    let bookingModal = new BookingModal(this.showObject, this.prices.totalPrice, bookedSeats);
    $('main').append(bookingModal.template());
		$('#modalToggler').click();
  }
	// Lång eventHandler - kanske behövs.
	// Varför laddas json in i eventHandler och inte constructorn?
	// Behöver man ladda json varje gång man trycker någonstans? Isåfall lägg inladdning på ett klick
	eventHandler() {
		$(document).on('click','.bookingConfirmation', () => {
			this.bookingModal();
		});

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


				// Kör bokning
				.then(() => {
					// Kollar ifall man är inloggad.
					if (that.loggedInUser.id === null) {
						$('#notLoggedIn').html(that.throwErrorMessageIfNotLoggedIn());
					} else {
					tempBookingObject.show = that.showObject;
					tempBookingObject.show = that.loggedInUser;
					tempBookingObject.show.orderID = that.returnGeneratedId();
					tempBookingObject.show.bookedSeats = [];

					$('.seat.reserved').each(function(){
						let seat = $(this);
						let seatID = seat.data('seatid');
						// console.log(seatID);
						that.showObject.bookedSeats.push(seatID);
						let showObjectIndex = that.getShowIndex();
						Data.showObjects[showObjectIndex].bookedSeats.push(seatID);
						tempBookingObject.show.bookedSeats.push(seatID);
					});
					that.bookedSeats.push(tempBookingObject);
					//Save booked-info + sittplats to JSON
					JSON._save('booking', that.bookedSeats);
					JSON._save('shows', Data.showObjects);
				}})))});



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

		$(document).on('click','.addbtn, .removebtn', () => {
			this.myNumberOfSeatsCheck();
			this.checkForDisable();
			this.updateTotalPrice();
			this.resetBookingButtons();
		})

		// $(document).on('click','.removebtn', () => {
		// 	this.myNumberOfSeatsCheck();
		// 	this.checkForDisable();
		// 	this.updateTotalPrice();
		// 	this.resetBookingButtons();
		// })

	} // end eventhandler

} // end class
