class Theater extends Base {

	constructor(Booking, numberOfChildren, numberOfAdults, numberOfPensioners, auditorium) {
		super();
		this.booking = Booking;
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;
		this.auditorium = auditorium;


		JSON._load('theaters').then((theater) => {
			this.theaterObjects = theater;
			this.start();

		});

	} //end constructor

	start(){
		this.eventHandler();
		this.getTheaterObject("Stora Salongen");
		this.getSeatsPerRow(this.theaterObject);
		this.setWidth();
		this.setHeight();
		this.renderTheater();
		// this.renderTicketButtons();
		let booking = new Booking;
		this.scale();
	}

	getTheaterObject(theaterName) {
		console.log(theaterName);

		this.theaterObject = this.theaterObjects.find( (x) => theaterName == x.name);
		console.log(this.theaterObject);
	}

	getSeatsPerRow(theaterObject) {
		let rowlength = theaterObject.seatsPerRow;
		this.seatsStoran = rowlength;
		return rowlength;
	}


	renderTheater() {
		let html = '';
		let seatNumber=1;
		let seatStatus = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			this.seatsPerRow = this.seatsStoran[row];
			html += `<div class="col-8 row d-flex flex-row-reverse justify-content-center flex-nowrap seat-row m-0">`;

			for (let seat = 0; seat < this.seatsPerRow; seat++) {

				html += `<div class="${seatStatus} seat mt-1 ml-1" id="seat" data-rowid="${row}" data-seatid="${seatNumber}" data-status="${seatStatus}">${seatNumber}</div>`;

				seatNumber++;
			}
			html += '</div>';
		}

		$('#theater').html(html);

		$('html, body').animate({
        scrollTop: $("#theater").offset().top -20
    }, 500);
	}

	setHeight(){
		let fullHeight = this.seatsStoran.length * 55;
		// console.log(fullHeight);
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



	eventHandler() {
		$(document).ready();
			let seatID;
			let rowID;
			let status;

		$(document).on("mouseenter", '.seat', function() {	
			let myNumberOfSeats=0;
			myNumberOfSeats = booking.myNumberOfSeats;
			let seat = $(this);
			seatID = seat.data('seatid');
			rowID = seat.data('rowid');

			if (seatID == seat.data('seatid') && status == 'booked' ) {
	    		console.log('this seat is booked', seat);
	    }
	    else if (seatID == seat.data('seatid') && status == 'free' ) {
	    	for(let i = 0; i < myNumberOfSeats; i++) {
	    		// $(seat).each(function(seatID, seat) {

	    			$('seatID').addClass('reserving');
		    		$('seatID').removeClass('free');
		    		$('seatID').data('status', 'reserving');
		    		status = seat.data('status');

		    		if ( $( this ).is(seatID+myNumberOfSeats) ) {
				      return false;
				    }

    		}
    	}
	  });

// 	  <script>
// $( "button" ).click(function() {
//   $( "div" ).each(function( index, element ) {
//     // element == this
//     $( element ).css( "backgroundColor", "yellow" );
//     if ( $( this ).is( "#stop" ) ) {
//       $( "span" ).text( "Stopped at div index #" + index );
//       return false;
//     }
//   });
// });
// </script>
			
    $(document).on("mouseleave", '.seat', function() {			
			let seat = $(this);
			seatID = seat.data('seatid');
			rowID = seat.data('rowid');
			status = seat.data('status');
			console.log('11 status', status)
    	
    	if (seatID == seat.data('seatid') && status == 'reserving' ) {
    		$(seat).removeClass('reserving');
    		$(seat).addClass('free');
    		$(seat).data('status', 'free');
    		status = seat.data('status');
    		console.log('12 seatID', seatID);
    		console.log('13 seat',seat); 
    		// console.log(status);
    		
    	}
    		console.log('7 status', status);
		});
		

		$(document).on("click", '.seat', function() {
			
			let seat = $(this);
			seatID = seat.data('seatid');
			rowID = seat.data('rowid');
			status = seat.data('status');
			console.log('10 status', status)


			if (seatID == seat.data('seatid') && status == 'reserving' ) {
    		$(seat).addClass('booked');
    		$(seat).removeClass('reserving');
    		$(seat).data('status', 'booked');
    		status = seat.data('status');
    		console.log('4 seatID', seatID);
    		console.log('5 seat',seat); 
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
    		console.log('7 status', status);
		});


	}// end eventhandler
		
} //end class



let theater = new Theater();
let booking = new Booking(this);
// console.log(prices);
$(window).resize(theater.scale);
// let prices = new Prices(1,1,1);