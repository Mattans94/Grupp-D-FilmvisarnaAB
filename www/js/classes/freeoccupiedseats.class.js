class FreeOccupiedSeats extends Bse{

  constructor(){

    super();
    this.seats = [];
    //Load theater data from JSON.



    this.createFreeSeats( this.nbrOfSeatsInRow);
    this.saveToJSON(this.seats);
  }

    JSON._load('theaters').then((theaters) =>{ 
    this.theaterObjects = theater; 
    // this.start(); 
    }); 
    this.nbrOfSeatsInRow =  [8, 9, 10, 10, 10, 10, 12, 12];



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

	setSeatStatus(status, row, seat){
    let statusUpdateOk = true;

    if(row >= nbrOfSeatsInRow.length || seat >= nbrOfSeatsInRow[row])
    {
      statusUpdateOk = false;
    }
    else
    {
      this.seats[row][seat] = status;

      this.saveToJSON(this.seats);      
    }

    return statusUpdateOk;
	}


}



// JSON._load('theaters.json')
// .then(function(data){
//    theater = data;
//    new seats();
// });

  






