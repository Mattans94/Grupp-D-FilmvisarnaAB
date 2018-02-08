class Theater extends Base{

	constructor(showObject) {
		super();
		// this.booking = Booking;
		// this.numberOfChildren = numberOfChildren;
		// this.numberOfAdults = numberOfAdults;
		// this.numberOfPensioners = numberOfPensioners;
		// this.auditorium = auditorium;
		this.showObject = showObject;
		this.auditorium = showObject.auditorium;

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
		this.booking = new Booking(this.showObject);
		this.booking.renderTicketButtons();
		this.renderMovieInfo()

		this.scale();
		this.eventHandler();

	}

	// This is Andreas try
	renderMovieInfo(){
		let time = this.showObject.time;
		let date = this.showObject.date;
		let movie = this.showObject.film;
		let html = `
		<h3 class="text-light">
			Film: ${movie}
			Salong: ${this.auditorium}
			Datum & tid: ${date} ${time}
		</h3>
		`;
		$('#movierepresentation').html(html);

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



	renderTheater() {
		let html = '';
		let seatnumber=1;
		let seatStatus = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			this.seatsPerRow = this.seatsStoran[row];
			html += `<div class="col-12 row d-flex flex-row-reverse justify-content-center flex-nowrap seat-row m-0">`;

			for (let seat = 0; seat < this.seatsPerRow; seat++) {

				html += `<div class="${seatStatus} seat mt-1 ml-1" id="seat" data-rowid="${row}" data-seatid="${seatnumber}" data-status="${seatStatus}">${seatnumber}</div>`;

				seatnumber++;
			}
			html += '</div>';
		}
		$('#theater').html(html);

		// $('html, body').animate({
    //     scrollTop: $("#theater").offset().top -20
    // }, 500);
	}



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
		let w = $(window).width()
		let h = $(window).height();
		w -= 20 * 2;
		h -= 20 * 2;
		const wScale = w / orgW;
		const hScale = h / orgH;
		let scaling = Math.min(wScale, hScale);

		$('#theater').css('transform', `scale(${scaling})`);
		$('#theater-holder').width(orgW * scaling);
		$('#theater-holder').height(orgH * scaling);
	}

	scaleToCenter(){
		 let holderWidth = $('#theater-holder').width();
		 let theaterWidth = $('#theater').width();
		 let marginLeft = holderWidth - theaterWidth;

		 $('#theater').css("margin-left",marginLeft);
	}

// checkFreeSeats(){
// 		if($(this).hasClass('booked')){return;}
// 		  let amount = booking.myNumberOfSeats;
// 		  let $allNext = $(this).nextAll();
// 		  let $elementsToSelect = [$(this)];
// 		  console.log($elementsToSelect);

// 		  let foundNextStop = false;
// 		  let found = 1;
// 		  $allNext.each(function() {
// 		     if (foundNextStop || found == amount) {
// 		     	return;
// 		     }
// 		     if ($(this).hasClass('booked')) {
// 		       foundNextStop = true;
// 		     }
// 		     else {
// 		       found++;
// 		       $elementsToSelect.push($(this));
// 		     }
// 		  });

// 		  if(found<amount) {
// 		  	return;
// 		  }
// 		  console.log($elementsToSelect);
// 		  $elementsToSelect.forEach(function($element) {
// 		    $element.addClass('select');
// 		  });
// 	}

	eventHandler() {
		let that = this;

		let seat = $(this);
			let seatID; // = seat.data('seatid');
			let rowID; // = seat.data('rowid');
			let status; // = seat.data('status');

		$(document).on("click", '.seat', function() {
			let myNumberOfSeats=0;
			myNumberOfSeats = that.booking.myNumberOfSeats;
			let $seat = $(this);
			seat = $(this);
			console.log('Seat', seat);
			seatID = seat.data('seatid');
			console.log('seatID', seatID);
			rowID = seat.data('rowid');
			console.log('rowID', rowID);

			if (seatID == seat.data('seatid') ) {
    		$(seat).toggleClass('booked');
    		$(seat).toggleClass('free');
    	}

		});

$(document).on("mouseleave", '.seat', function() {
			// seat = $(this);
			// seatID = seat.data('seatid');
			// rowID = seat.data('rowid');
			// status = seat.data('status');
			// console.log('11 status', status)

    	if (seatID == seat.data('seatid') && status == 'reserving' ) {
    		$(seat).removeClass('reserving');
    		$(seat).addClass('free');
    		$(seat).data('status', 'free');
    		status = seat.data('status');
    		// console.log('12 seatID', seatID);
    		// console.log('13 seat',seat);
    	}
		});


		$(document).on("click", '.seat', function() {

			// seat = $(this);
			// seatID = seat.data('seatid');
			// rowID = seat.data('rowid');
			// status = seat.data('status');
			console.log('10 status', status)


			if (seatID == seat.data('seatid') && status == 'reserving' ) {
    		$(seat).addClass('booked');
    		$(seat).removeClass('reserving');
    		$(seat).data('status', 'booked');
    		// status = seat.data('status');
    		// console.log('4 seatID', seatID);
    		// console.log('5 seat',seat);
    		// console.log(status);
    	}
    	else
    		if (seatID == seat.data('seatid') && status == 'booked' ) {
	    		$(seat).addClass('free');
	    		$(seat).removeClass('booked');
	    		$(seat).data('status', 'free');
    			status = seat.data('status');
	    		console.log('6 seat', seat);
    	}
    		// console.log('7 status', status);
		});


	}// end eventhandler

} //end class
