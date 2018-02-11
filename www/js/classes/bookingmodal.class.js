class BookingModal extends Base {
  constructor(showObject, totalPrice, bookedSeats){
		super();
    this.movie = showObject.film;
    this.auditorium = showObject.auditorium;
    this.time = showObject.time;
    this.date = showObject.date;
    this.totalPrice = totalPrice;
    this.bookedSeats = bookedSeats;
    this.movieObject = this.getMovieObject(showObject.film);
	}

  getAllSeats(){
    this.bookedSeatsString = '';
    for (let i = 0; i < this.bookedSeats.length; i++){
      this.bookedSeatsString += this.bookedSeats[i] + ', ';
    }
    return this.bookedSeatsString;
  }
}
