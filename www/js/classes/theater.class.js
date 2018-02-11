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

		console.log('showObject', this.showObject);

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
		this.renderMovieHeadingInTheater()
		this.renderMovieBookingCompilition();
		this.scale();
		this.eventHandler();

	}

	// Finns redan i movie.class.js
	convertMinutesToHours(movieObject){
		let totalMinutes = movieObject.length;
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;
		return hours + ' tim ' + minutes + ' min';
	}

	renderMovieBookingCompilition(){
		let movieObject = this.getMovieObject(this.showObject.film);
		let html = `
		<h2 class="m-3 pt-3 col-8 mx-auto">Sammanställning</h2>
		<div class="col-8 mx-auto p-3 orderCompilation d-flex justify-content-between flex-column flex-md-row mt-3 bg-dark">
			<div class="d-none d-md-block col-md-4 col-lg-3">
				<img class="img-fluid" src="/img/posters/${movieObject.images[0]}">
			</div>
			<div class="col-12 col-md-9 text-light">
				<h4>${this.showObject.film}</h4>
				<p> ${movieObject.genre}, ${this.convertMinutesToHours(movieObject)}, tal: ${movieObject.language}, text: ${movieObject.subtitles}</p>
				<p><span class="pl-0 col-2 col-md-2 d-inline-block mr-3">Plats:</span> ${this.showObject.auditorium}</p>
				<p><span class="pl-0 col-2 col-md-2 d-inline-block mr-3">Datum:</span> ${this.showObject.date}</p>
				<p><span class="pl-0 col-2 col-md-2 d-inline-block mr-3">Tid:</span> ${this.showObject.time}</p>
			</div>
		</div>


		<h2 class="m-3 col-8 mx-auto">Kostnad</h2>
		<div id="totalprice" class="col-8 mx-auto p-3 pl-4 bg-dark text-light">



		</div>

		`

		$('.orderCompilation').html(html);
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


	// This is Andreas try
	renderMovieHeadingInTheater(){
		let time = this.showObject.time;
		let date = this.showObject.date;
		let movie = this.showObject.film;

		let movieObject = this.getMovieObject(this.showObject.film);
		let html = `
		<div class="d-flex flex-nowrap flex-column flex-md-row m-0 mt-5 p-4" id="theaterBackground" style="background-image: url(/img/slides/${movieObject.slides[0]}); ">
			<div class="col-5 col-md-3 col-lg-2">
				<img class="img-fluid" src="/img/posters/${movieObject.images[0]}">
			</div>
			<div class="col-12 col-md-9 text-light">
				<h3>${this.showObject.film}</h3>
				<p> ${movieObject.genre}, ${this.convertMinutesToHours(movieObject)}, tal: ${movieObject.language}, text: ${movieObject.subtitles}</p>
				<h5><span class="pl-0 col-2 col-md-1 d-inline-block mr-3">Plats:</span> ${this.showObject.auditorium}</h5>
				<h5><span class="pl-0 col-2 col-md-1 d-inline-block mr-3">Datum:</span> ${this.showObject.date}</h5>
				<h5><span class="pl-0 col-2 col-md-1 d-inline-block mr-3">Tid:</span> ${this.showObject.time}</h5>
			</div>
		</div>

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
	}

	removeClassFreeFromBookedSeats(){
		if($('.seat').hasClass('booked')) {
			$('.booked').removeClass('free');
		}
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
		let w = $('#theaterBackground').width();
		let h = $(window).height();
		const wScale = w / orgW;
		const hScale = h / orgH;
		let scaling = Math.min(wScale, hScale);

		scaling = scaling * 0.8;

		$('#screenTransparenting').width(orgW + 80).height(orgH);

		$('#theater').css('transform', `scale(${scaling})`);
		$('#theater-holder').width(orgW * scaling);
		$('#theater-holder').height(orgH * scaling);

		this.scaleLightFromScreen();
	}
	scaleLightFromScreen(){



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
		// let seatID; = seat.data('seatid');
		// let rowID;  = seat.data('rowid');
		// let status;  = seat.data('status');
			$(document).on("click", '.seat', function() {
			let seat = $(this);


			if (that.booking.seatsTotal >= 1) {
				if (seat.hasClass('free') && !(that.booking.reservedSeats == that.booking.seatsTotal)){
					seat.removeClass('free');
					seat.addClass('reserved');
					that.booking.reservedSeats++;
				} else if (seat.hasClass('reserved')){
					seat.removeClass('reserved');
					seat.addClass('free');
					that.booking.reservedSeats--;
				}
			}


		});







	}// end eventhandler

} //end class
