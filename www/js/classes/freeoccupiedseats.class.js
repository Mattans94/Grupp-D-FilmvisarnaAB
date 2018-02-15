class FreeOccupiedSeats extends Base{

  constructor(){
    super();
    this.seats = [];
    JSON._load('theaters').then((theaters) =>{
      this.theaterObjects = theater;
    });
    this.nbrOfSeatsInRow = new theaterObjects;
    this.createFreeSeats( this.nbrOfSeatsInRow);
    this.saveToJSON(this.seats);
  }

	async createFreeSeats(nbrOfSeatsInRow){
   for (let row = 0; row < nbrOfSeatsInRow.length; row++) {
   	for (let seat = 0; seat < nbrOfSeatsInRow[row]; seat++) {
   	  this.seats[row][seat] = true;
   	}
    await JSON._save('freeseats');
  }

	setSeatStatus(status, row, seat){
    let statusUpdateOk = true;
    if(row >= nbrOfSeatsInRow.length || seat >= nbrOfSeatsInRow[row]) {
      statusUpdateOk = false;
    } else {
      this.seats[row][seat] = status;
      this.saveToJSON(this.seats);
    }
    return statusUpdateOk;
	}
}
