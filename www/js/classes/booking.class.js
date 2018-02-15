class Booking extends Base{
	constructor(showObject) {
		super();
		Booking.latestBooking = this;
		this.date = showObject.date;
		this.time = showObject.time;
		this.auditorium = showObject.auditorium;
		this.title = showObject.film;
		this.showObject = showObject;


		Booking.latestBooking = this;


		this.child=0;
		this.adult=0;
		this.pensioner=0;
		this.reservedSeats = 0;

		JSON._load('booking').then((seats) => {
	      this.bookedSeats = seats;
				this.allBookings = seats;
				this.start();
	    });
	}

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

	resetSeatsTotal() {
		this.child = 0;
		this.adult = 0;
		this.pensioner = 0;
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

	checkForDisable(){
		this.disableRemoveButton('child');
		this.disableRemoveButton('adult');
		this.disableRemoveButton('pensioner');
		this.disableAddButton('child');
		this.disableAddButton('adult');
		this.disableAddButton('pensioner');
	}

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
		} else {
			$('#add' + ticketType).prop('disabled', false);
		}
	}

	getShowIndex(){
		return Data.showObjects.findIndex((o) => {return o.date == this.showObject.date && o.time == this.showObject.time});
	}

	resetBookingButtons(){
		$('.seat').not('.booked').addClass('free').removeClass('reserved');
		this.reservedSeats = 0;
	}

	bookingModal(){
		let bookedSeats = [];
		$('.seat.reserved').each(function(){
			let seat = $(this);
			let seatID = seat.data('seatid');
			bookedSeats.push(seatID);
		});
		Booking.latestBooking.prices.calculateTotalPrice()
		Booking.latestBooking.updateTotalPrice();
		$('#modalInputContainer').val('');
    let bookingModal = new BookingModal(Booking.latestBooking.showObject, Booking.latestBooking.prices.totalPrice, bookedSeats);
    $('#modalInputContainer').append(bookingModal.template());
		bookingModal.render('#modalInputContainer')
		$('#bookingConfirmationModalToggler').trigger('click');
  }

	eventHandler() {
		$(document).on('click','.bookingConfirmation', () => {
			if (Booking.latestBooking.reservedSeats > 0) {
				this.bookingModal();
			} else {
				$('.noSeatsChosenMessage').html('Du måste boka minst en plats');
			}
		});

		let that = this;
		$(document).on('click','.book-btn',function(){
				let tempBookingObject = {};
				JSON._load('booking').then((data) => {
					that.bookedSeats = data;
						JSON._load('shows').then((shows) => {
	      			Data.showObjects = shows;
							JSON._load('session').then((userid) => {
								that.loggedInUser = userid;
							})

				.then(() => {
					if (that.loggedInUser.id === null) {
						$('#notLoggedIn').html(that.throwErrorMessageIfNotLoggedIn());
					} else {
					tempBookingObject.show = that.showObject;
					tempBookingObject.show.userID = that.loggedInUser.id;
					tempBookingObject.show.orderID = that.returnGeneratedId();
					tempBookingObject.show.bookedSeats = [];

					$('.seat.reserved').each(function(){
						let seat = $(this);
						let seatID = seat.data('seatid');
						that.showObject.bookedSeats.push(seatID);
						let showObjectIndex = that.getShowIndex();
						Data.showObjects[showObjectIndex].bookedSeats.push(seatID);
					});
					that.bookedSeats.push(tempBookingObject);
					JSON._save('booking', that.bookedSeats);
					JSON._save('shows', Data.showObjects);
					$('#bookingConfirmationModalToggler').trigger('click');
					$('#bookingConfirmedModalToggler').trigger('click');
					}
				})
			})});
			});

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
	}
}
