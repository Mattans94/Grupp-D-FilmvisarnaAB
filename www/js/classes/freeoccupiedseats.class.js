class FreeOccupiedSeats{

  constructor(){
    this.seats = [];
    //Load theater data from JSON.
    this.nbrOfSeatsInRow =  [8, 9, 10, 10, 10, 10, 12, 12];
    this.createFreeSeats( this.nbrOfSeatsInRow);
    this.saveToJSON(this.seats);
  }



	createFreeSeats(nbrOfSeatsInRow){
   
   for (let row = 0; row < nbrOfSeatsInRow.length; row++) {
   	for (let seat = 0; seat < nbrOfSeatsInRow[row]; seat++) {
   		this.seats[row][seat] = true; // True = free

   	}
  }

    saveToJSON(object){
    JSON._save('freeseats.json', {
        Seats: object
    });

  }

	setSeatsStatus(status, row, seat){
    this.seats[row][seat] = status;
	}


}



// JSON._load('theaters.json')
// .then(function(data){
//    theater = data;
//    new seats();
// });

  






