class Theater {

	constructor() {
		JSON._load('theaters').then((theater) => {
			this.theaterObjects = theater;
			this.start();
		});

	} //end

	start(){
		this.eventHandler();
		this.getTheaterObject("Stora Salongen");
		this.getSeatsPerRow(this.theaterObject);
		this.setWidth();
		this.setHeight();
		this.renderTheater();
		this.scale();
	}

	getTheaterObject(theaterName) {
		this.theaterObject = this.theaterObjects.find((x) => theaterName == x.name);
		console.log(this.theaterObject);
	}

	getSeatsPerRow(theaterObject) {
		let rowlength = theaterObject.seatsPerRow;
		this.seatsStoran = rowlength;
		return rowlength;
	}

	renderTheater() {
		let html = '';
		let seatnumber=1;
		let status = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			this.seatsPerRow = this.seatsStoran[row];
			html += `<div class="col-12 row d-flex flex-row-reverse justify-content-center flex-nowrap seat-row m-0">`;

			for (let seat = 0; seat < this.seatsPerRow; seat++) {

				html += `<div class="${status} seat mt-1 ml-1" id="seat" data-rowid="${row}" data-seatid="${row}${seat}">${seatnumber}</div>`;

				seatnumber++;
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
		console.log(fullHeight);
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
		$(document).on("mouseenter mouseleave click", '.seat', function() {
			let seat = $(this);
			let seatID = seat.data('seatid');
			let rowID = seat.data('rowid')

			if (seatID == seat.data('seatid') ) {
    		$(seat).toggleClass('booked');
    		$(seat).toggleClass('free');
    		console.log(seatID);
    	}
    	else
    		console.log(this.seatid);
		});
	}




} //end class