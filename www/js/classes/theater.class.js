

class Theater {

	constructor(numberOfChildren, numberOfAdults, numberOfPensioners, auditorium) {
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;
		this.auditorium = auditorium;

		this.child=0;
		this.adult=0;
		this.pensioner=0;

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
		this.renderTicketButtons();
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

	renderTicketButtons() {
		let html = `<div class="row justify-content-center">
			  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
				  <div class="btn-group mr-2" role="group" aria-label="child group">
				    <button type="button" class="btn btn-secondary adddbtn" id="addchild"><strong>+</strong></button>
				    <input type="text" class="form-control col-2" id="childTickets" placeholder="${this.child}" >
				    <button type="button" class="btn btn-secondary removebtn" id="removechild"><strong>-</strong></button>
				  </div>
				</div>
			  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
				  <div class="btn-group mr-2" role="group" aria-label="adult group">
				    <button type="button" class="btn btn-secondary addbtn" id="addadult"><strong>+</strong></button>
				    <input type="text" class="form-control col-2" id="adultTickets" placeholder="${this.adult}" >
				    <button type="button" class="btn btn-secondary removebtn" id="removeadult"><strong>-</strong></button>
				  </div>
				</div>
			  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
				  <div class="btn-group mr-2" role="group" aria-label="pensioner group">
				    <button type="button" class="btn btn-secondary addbtn" id="addpensioner"><strong>+</strong></button>
				    <input type="text" class="form-control col-2" id="pensionerTickets" placeholder="${this.pensioner}" >
				    <button type="button" class="btn btn-secondary removebtn" id="removepensioner"><strong>-</strong></button>
				  </div>
				</div>
			</div>`;
  	$('.navbar').html(html);
	}

	renderTheater() {
		let html = '';
		let seatnumber=1;
		let status = 'free';

		for (let row = 0; row < this.seatsStoran.length; row++) {
			this.seatsPerRow = this.seatsStoran[row];
			html += `<div class="col-12 row d-flex flex-row-reverse justify-content-center flex-nowrap seat-row m-0">`;

			for (let seat = 0; seat < this.seatsPerRow; seat++) {

				html += `<div class="${status} seat mt-1 ml-1" id="seat" data-rowid="${row}" data-seatid="${row}${seat}" data-status="${status}">${seatnumber}</div>`;

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

		// $(document).on("mouseenter mouseleave", '.seat', function() {
		// 	// let seat = $(this);
		// 	// let seatID = seat.data('seatid');
		// 	// let rowID = seat.data('rowid');
		// 	// let status = seat.data('status');

		// 	let seat = $(this);
		// 	seatID = seat.data('seatid');
		// 	rowID = seat.data('rowid');
		// 	status = seat.data('status');


		// 	if (seatID == seat.data('seatid') && status == 'free' ) {
  //   		$(seat).toggleClass('booked');
  //   		$(seat).toggleClass('free');
  //   		console.log('1 seatID', seatID);
  //   		console.log('2 seat', seat);
  //   	}
  //   	else
  //   		console.log('3 status', status);
		// });

		$(document).on("click", '.seat', function() {
			// let seat = $(this);
			// let seatID = seat.data('seatid');
			// let rowID = seat.data('rowid');
			// let status = seat.data('status');
			let seat = $(this);
			seatID = seat.data('seatid');
			rowID = seat.data('rowid');
			status = seat.data('status');
			console.log('10 status', status)


			if (seatID == seat.data('seatid') && status == 'free' ) {
    		$(seat).addClass('booked');
    		$(seat).removeClass('free');
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

	$(document).on("click", '.addbtn .removebtn', function() {
		if ($('.addbtn') && $('#addchild')) {
			this.child = this.child+1;
		}
		else if ($('.addbtn') && $('#addadult')) {
			this.adult = this.adult+1;
		}
		else if ($('.addbtn') && $('#addpensioner')) {
			this.pensioner = this.pensioner+1;
		}
		else if ($('.addbtn') && $('#removechild')) {
			this.child = this.child-1;
		}
		else if ($('.addbtn') && $('#removeadult')) {
			this.adult = this.adult-1;
		}
		else if ($('.addbtn') && $('#removepensioner')) {
			this.pensioner = this.pensioner-1;
		}
		else { 
			console.log('no changes');
		}
	});
	}
		
} //end class
