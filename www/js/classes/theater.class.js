class Theater extends Base{

	constructor(showObject) {
		super();
		this.showObject = showObject;
		this.auditorium = showObject.auditorium;
		this.movieObject = this.getMovieObject(this.showObject.film);
		this.booking = new Booking(this.showObject);

		// Set the last created Theater as a static property
		Theater.latestTheater = this;

		JSON._load('theaters').then((theater) => {
			this.theaterObjects = theater;

		})
		.then(JSON._load('shows').then((shows) => {
			Data.showObjects = shows;
			this.start();
		 }));


	} //end

	start(){
		this.getTheaterObject(this.auditorium);
		this.getSeatsPerRow(this.theaterObject);
		this.setWidth();
		this.setHeight();
		this.renderTheater();

	}

	// Eventhandlers


	eventHandlers() {
		// let seatID; = seat.data('seatid');
		// let rowID;  = seat.data('rowid');
		// let status;  = seat.data('status');
		console.log('eventhandler');
		$(document).on("mouseenter", '.seat', function() {
			let that = Theater.latestTheater;
			let $seat = $(this);
			if (that.booking.seatsTotal >= 1) {

				if($seat.hasClass('booked')){return};
				if ($seat.hasClass('free')){
					let amount = that.booking.seatsTotal;
					let $allNext = $seat.prevAll();
					let $seatsToSelect = [$seat];
					let $errorSeats = [$seat];
					let found = 1;

					$allNext.each(function(){
						 if(found == amount){return;}
						 if($(this).hasClass('booked')){
							 $errorSeats.push($(this));
						 }else{
							 found++;
							 $seatsToSelect.push($(this));
							 $errorSeats.push($(this));
						 }
					});

					if($errorSeats.length > $seatsToSelect.length) {
						$errorSeats.splice(amount);
						$errorSeats = $errorSeats.reverse();
						let errorAmount = $errorSeats.length - $seatsToSelect.length;
						$errorSeats.splice(errorAmount);
						$errorSeats.forEach(function($el){
							$el.addClass('errorHoverSeat');
						})
						$seatsToSelect.forEach(function($el){
							$el.addClass('hoverSeat');
						})
					}

					else {
						$seatsToSelect.forEach(function($el){
							$el.addClass('hoverSeat');
					})}
				}}});

		$(document).on("mouseleave", '.seat', function() {
			$(this).prevAll().addBack().removeClass('hoverSeat errorHoverSeat');
		});

		$(document).on("click", '.seat', function() {
			that.booking.resetBookingButtons();
			let $seat = $(this);

			if (that.booking.seatsTotal >= 1) {

				if($seat.hasClass('booked')){return};
				if ($seat.hasClass('free') && !(that.booking.reservedSeats >= that.booking.seatsTotal)){
				let amount = that.booking.seatsTotal;
				let $allNext = $seat.prevAll();
			  let $seatsToSelect = [$seat];
			  let foundFirstBooked = false;
			  let found = 1;

				$allNext.each(function(){
			     if(foundFirstBooked || found == amount){return;}
			     if($(this).hasClass('booked')){
			       foundFirstBooked = true;
			     }else{
			       found++;
						 that.booking.reservedSeats++;
			       $seatsToSelect.push($(this));
			     }
			  });

				if(found<amount){return;}
				console.log($seatsToSelect);
				$seatsToSelect.forEach(function($el){
					$el.addClass('reserved');
				});
			}}
});






    //  Välja en-stol-kod här. Kanske ha en knapp som togglar denna?
		// 	console.log(that.booking.reservedSeats);
		// 	if (that.booking.seatsTotal >= 1) {
		// 		if (seat.hasClass('free') && !(that.booking.reservedSeats >= that.booking.seatsTotal)){
		// 			seat.removeClass('free');
		// 			seat.addClass('reserved');
    //
		// 			that.booking.reservedSeats++;
		// 		} else if (seat.hasClass('reserved')){
		// 			seat.removeClass('reserved');
		// 			seat.addClass('free');
		// 			that.booking.reservedSeats--;
		// 		}
		// 	}
		// });
	}// end eventhandler


	// Finns redan i movie.class.js
	convertMinutesToHours(movieObject){
		let totalMinutes = movieObject.length;
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;
		return hours + ' tim ' + minutes + ' min';
	}

	async getRichShow(theShow){
	  let bookings = await JSON._load('booking');

	  //let count = 0;
		for(let booking of bookings){
		  //console.log('film', booking.show.film);
		  // for(let show of shows){
		  // 	// if(theShow && show != theShow){continue;}
		  //   //count++;
		    if(booking.show.date == theShow.date && booking.show.auditorium == theShow.auditorium && booking.show.time == theShow.time){
		      //console.log('found it!', show, booking);
		      if(!theShow.bookedSeats){
		        theShow.bookedSeats = [];
		      }
		      theShow.bookedSeats = [...theShow.bookedSeats, ...booking.show.bookedSeats]; // concat (merge) two arrays
		      //console.log(show);
		      theShow.bookedSeats = new Set(theShow.bookedSeats);
		      theShow.bookedSeats = Array.from(theShow.bookedSeats);
		    }
		}
    return theShow;
	}



	// Snyggt! Kommer kunna användas med det show-objektet som kommer in till constructorn
	getTheaterObject(theaterName) {
		this.theaterObject = this.theaterObjects.find((x) => theaterName == x.name);
	}

	// Vad betyder seatsStoran? Finns det bättre namn?
	getSeatsPerRow(theaterObject) {
		let rowlength = theaterObject.seatsPerRow;
		this.seatsStoran = rowlength;
		return rowlength;
	}

	removeClassFreeFromBookedSeats(){
		if($('.seat').hasClass('booked')) {
			$('.booked').removeClass('free');
		}
	}

	// Scaling
	setHeight(){
		let fullHeight = this.seatsStoran.length * 55;
		$('#theater').css('height', `${fullHeight}`);
	}

	setWidth(){
		let longestRow = 0;
		for (let rowLength of this.seatsStoran){
			if (longestRow < rowLength) {
				longestRow = rowLength;
			}
		}
		let fullWidth = longestRow * 55;
		$('#theater').css('width', `${fullWidth}`);
	}

	scale() {
		let orgW = $('#theater').width(), orgH = $('#theater').height();
		let w = $('#theaterBackground').width();
		let h = $(window).height();
		const wScale = w / orgW;
		const hScale = h / orgH;
		let scaling = Math.min(wScale, hScale);

		scaling = scaling * 0.8;

		$('#theater').css('transform', `scale(${scaling})`);
		$('#screenTransparenting').width(orgW + 80).height(orgH);
		$('#theater-holder').width(orgW * scaling);
		$('#theater-holder').height(orgH * scaling);
	}


	// Renders
	async renderTheater() {
		let html = `<img src="/img/test.png" id="screenTransparenting">`;
		let seatnumber=1;
		let seatStatus = 'free';

		let show = await this.getRichShow(this.showObject);
		console.log('show', show);

		for (let row = 0; row < this.seatsStoran.length; row++) {
			this.seatsPerRow = this.seatsStoran[row];
			html += `<div class="d-flex flex-row-reverse justify-content-center flex-nowrap seat-row m-0">`;

			for (let seat = 0; seat < this.seatsPerRow; seat++) {
         let taken = '';
				if(show.bookedSeats.indexOf(seatnumber) >- 1){
					taken = ' booked';
				}

				html += `<div class="${seatStatus + taken} seat mt-1 ml-1" id="seat" data-rowid="${row}" data-seatid="${seatnumber}" data-status="${seatStatus}">${seatnumber}</div>`;

				seatnumber++;
			}
			html += '</div>';
		}
		$('#theater').html(html);
		this.removeClassFreeFromBookedSeats();
		this.scale();
	}

} //end class
