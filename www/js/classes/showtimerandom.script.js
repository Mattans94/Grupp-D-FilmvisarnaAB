class Showtime{

  constructor(){
    this.movieNames = ['Let The Sunshine In', 'Wind River', 'Three Billboards Outside Ebbing, Missouri', 'Tjuren Ferdinand', 'Call Me By Your Name', 'The Party'];
    this.theater = ['Stora Salongen', 'Lilla Salongen'];
    this.times = ['18.40', '21.00', '22.40'];
    this.myArrayOfObjects = [];
    // this.randomWriteObjectsToArray();
    // this.saveToJSON(this.myArrayOfObjects);
      }

  randomMovie() {
    let rnd = Math.floor(Math.random() * 6);
    return this.movieNames[rnd];
  }

  randomTheater() {
    let rnd = Math.floor(Math.random() * 2);
    return this.theater[rnd];
  }

  randomWriteObjectsToArray() {
    let currentDate;
    let myDateCo = 1;


    for (let j = 0; j < 28; j++){
      if (myDateCo < 10) {
        currentDate = '2018-03-0'+myDateCo;
      } else {
        currentDate = '2018-03-'+myDateCo;
      }
      myDateCo++;

      for (let i = 0; i < 3; i++) {
        let tempObject = {};
        tempObject.date = currentDate;
        tempObject.auditorium = this.randomTheater();
        tempObject.film = this.randomMovie();
        tempObject.time = this.times[i];

        this.myArrayOfObjects.push(tempObject);
      }
    }
  }


  saveToJSON(object){
    JSON._save('shows.json', {
      object
    });
  }

}
