class Theater {

	// constructor(name, seats, seatsPerRow) {
	// 	this.name = name;
	// 	this.seats = seats;
	// 	this.seatsPerRow = seatsPerRow;

	// 	this.renderTheater();
	// 	this.eventHandler();
	// } //end constructor

	constructor() {
		this.seatsStoran =[ 
      8,
      9,
      10,
      10,
      10,
      10,
      12,
      12
    ];

		this.renderTheater();
		this.eventHandler();
	} //end constructor

	renderTheater() {
		let html = '';
		let seatnumber=1;
		let status = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			html += `<div class="row theater seat-row">`;
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
		h -= $('header').outerHeight() + 80 + 40;
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

	// checkSeatNo(){

	// }

} //end class



// JSON._classes(Theater);
