class Theater {

	constructor() {
		JSON._load('theaters').then((theater) => {
			this.theaterObjects = theater;
			this.start();
		});

	} //end 

	start(){
		this.eventHandler();
		this.getTheaterObject("Lilla Salongen");
		this.getSeatsPerRow(this.theaterObject);
	}

	getTheaterObject(theaterName) {
		this.theaterObject = this.theaterObjects.find((x) => theaterName == x.name); 
		console.log(this.theaterObject);
	}

	getSeatsPerRow(theaterObject) {	
		let rowlength = theaterObject.seatsPerRow;
		this.seatsStoran = rowlength;
		this.renderTheater();
		return rowlength;
	}

	renderTheater() {
		let html = '';
		let seatnumber=1;
		let status = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			html += `<div class="row d-flex flex-row-reverse theater seat-row">`;
			this.seatsPerRow = this.seatsStoran[row];
			
			for (let seat = 0; seat < this.seatsPerRow; seat++) {
				html += `<div class="${status} seat mr-2 mb-2" id="seat" data-rowid="${row}" data-seatid="${row}${seat}">${seatnumber}</div>`;
				
				seatnumber++;
			}
			html += '</div>';
		}
		$('.theater').html(html);	
	}

	scale() {
		// let orgW = 600, orgH = 480;
		let orgW = 960, orgH = 720;
		let w = $(window).width();
		let h = $(window).height();
		h -= $('header').outerHeight() + 80 + 140;
		w -= 20 * 2;
		let wScale = w / orgW;
		let hScale = h / orgH;
		let scaling = Math.min(wScale, hScale);
		$('.theater .booked .free').css('transform', `scale(${scaling})`);
		$('.theater .booked .free').show();
		$('.theater').width(orgW * scaling);
		$('.theater').height(orgH * scaling);
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




