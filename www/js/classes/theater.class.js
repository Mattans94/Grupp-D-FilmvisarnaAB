class Theater extends Base{

	constructor(showObject) {
		super();
		this.showObject = showObject;
		this.auditorium = showObject.auditorium;
		this.movieObject = this.getMovieObject(this.showObject.film);
		this.booking = new Booking(this.showObject);

		Theater.latestTheater = this;

		JSON._load('theaters').then((theater) => {
			this.theaterObjects = theater;
			JSON._load('shows').then((shows) => {
				Data.showObjects = shows;
				})
				.then(() => {
		      this.start();
			})
		});

	}

	start(){
		this.getTheaterObject(this.auditorium);
		this.getSeatsPerRow(this.theaterObject);
		this.setWidth();
		this.setHeight();
		this.renderTheater();
	}





	eventHandlers() {
		manySeatsControl();

		$(document).on('change', '#oneSeatPicker', function() {
			let that = Theater.latestTheater;
			that.booking.resetBookingButtons();
			if(this.checked){
				oneSeatControl();
			} else {
				manySeatsControl();
			}
		});

		function oneSeatControl(){
			$(document).off('mouseenter mouseleave click', '.seat');
			$(document).on("mouseenter", '.seat', function() {
				let that = Theater.latestTheater;
				let seat = $(this);
				if (seat.hasClass('booked')){
					seat.addClass('errorHoverSeat');
				} else {
					seat.addClass('hoverSeat');
				}
			})

			$(document).on("mouseleave", '.seat', function() {
				let that = Theater.latestTheater;
				$(this).prevAll().addBack().removeClass('hoverSeat errorHoverSeat errorHoverFreeSeat');
			});

			$(document).on("click", '.seat', function() {
			let that = Theater.latestTheater;
			let seat = $(this);
				if (that.booking.seatsTotal >= 1) {
					if (seat.hasClass('free') && !(that.booking.reservedSeats >= that.booking.seatsTotal)){
						seat.removeClass('free');
						seat.addClass('reserved');

						that.booking.reservedSeats++;
					} else if (seat.hasClass('reserved')){
						seat.removeClass('reserved');
						seat.addClass('free');
						that.booking.reservedSeats--;
					}
				}
			})
		}

		function manySeatsControl(){
			$(document).off('mouseenter mouseleave click', '.seat');
			$(document).on("mouseenter", '.seat', function() {
				let that = Theater.latestTheater;
				let $seat = $(this);
				if (that.booking.seatsTotal >= 1) {
					let amount = that.booking.seatsTotal;
					let $allPrev = $seat.prevAll();
					let  $seatsToSelect = [];
					if ($(this).hasClass('booked') || amount > $allPrev.length + 1) {
						$seatsToSelect.push({'seat' : $seat, 'seatMark': 'booked'});
					} else {
						$seatsToSelect.push({'seat' : $seat, 'seatMark': 'free'});
					}
					let found = 1;


					$allPrev.each(function(){
						 let $seat = $(this);
						 if(found == amount){return;}
						  if(amount > $allPrev.length + 1) {
								let $seatObj = {'seat' : $seat, 'seatMark': 'booked'}
								$seatsToSelect.push($seatObj);
								found++;
						 } else {
							 if($(this).hasClass('booked')){
								 let $seatObj = {'seat' : $seat, 'seatMark': 'booked'}
								 $seatsToSelect.push($seatObj);
								 found++;
							 }else {
								 let $seatObj = {'seat' : $seat, 'seatMark': 'free'}
								 found++;
								 $seatsToSelect.push($seatObj);
							 }
						 }
					})

					let bookedSeatCheck = $seatsToSelect.find((oneSeat) => 'booked' == oneSeat.seatMark);


					$seatsToSelect.forEach(function($seatObject){
						if (bookedSeatCheck) {
							$seatObject.seat.addClass('errorHoverSeat');
							if ($seatObject.seat.hasClass('free')  ) {
								$seatObject.seat.addClass('errorHoverFreeSeat');
							}
						}
						else {
							$seatObject.seat.addClass('hoverSeat');

						}
					})
				}
			});

			$(document).on("mouseleave", '.seat', function() {
				let that = Theater.latestTheater;
				$(this).prevAll().addBack().removeClass('hoverSeat errorHoverSeat errorHoverFreeSeat');
			});

			$(document).on("click", '.seat', function() {
				let that = Theater.latestTheater;
				that.booking.resetBookingButtons();
				let $seat = $(this);

				if (that.booking.seatsTotal >= 1) {

					if($seat.hasClass('booked')){return};
					if ($seat.hasClass('free') && !(that.booking.reservedSeats >= that.booking.seatsTotal)){
					let amount = that.booking.seatsTotal;
					let $allPrev = $seat.prevAll();
				  let $seatsToSelect = [$seat];
				  let foundFirstBooked = false;
				  let found = 1;
					that.booking.reservedSeats++;

					$allPrev.each(function(){
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
					$seatsToSelect.forEach(function($el){
						$el.addClass('reserved');
					});
				}}
			});
		}


	}// end eventhandler


	convertMinutesToHours(movieObject){
		let totalMinutes = movieObject.length;
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;
		return hours + ' tim ' + minutes + ' min';
	}

	async getRichShow(theShow){
	  let bookings = await JSON._load('booking');

		for(let booking of bookings){
		    if(booking.show.date == theShow.date && booking.show.auditorium == theShow.auditorium && booking.show.time == theShow.time){

		      if(!theShow.bookedSeats){
		        theShow.bookedSeats = [];
		      }
		      theShow.bookedSeats = [...theShow.bookedSeats, ...booking.show.bookedSeats]; // concat (merge) two arrays
		      theShow.bookedSeats = new Set(theShow.bookedSeats);
		      theShow.bookedSeats = Array.from(theShow.bookedSeats);
		    }
		}
    return theShow;
	}


	getTheaterObject(theaterName) {
		this.theaterObject = this.theaterObjects.find((x) => theaterName == x.name);
	}

	getSeatsPerRow(theaterObject) {
		let rowlength = theaterObject.seatsPerRow;
		this.theaterSeats = rowlength;
		return rowlength;
	}

	removeClassFreeFromBookedSeats(){
		if($('.seat').hasClass('booked')) {
			$('.booked').removeClass('free');
		}
	}

	setHeight(){
		let fullHeight = this.theaterSeats.length * 55;
		$('#theater').css('height', `${fullHeight}`);
	}

	setWidth(){
		let longestRow = 0;
		for (let rowLength of this.theaterSeats){
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


	async renderTheater() {
		let html = `<img src="/img/transparent_theater.png" id="screenTransparenting">`;
		let seatnumber=1;
		let seatStatus = 'free';

		let show = await this.getRichShow(this.showObject);


		for (let row = 0; row < this.theaterSeats.length; row++) {
			this.seatsPerRow = this.theaterSeats[row];
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
		$('html, body').animate({scrollTop: $('#theater').offset().top -200}, 500);
	 
		this.removeClassFreeFromBookedSeats();
		this.scale();
	}

}
