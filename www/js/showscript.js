let movieNames = ['Let The Sunshine In', 'Wind River', 'Three Billboards Outside Ebbing, Missouri', 'Tjuren Ferdinand', 'Call Me By Your Name'];
let theater = ['Stora Salongen', 'Lilla Salongen'];
let times = ['18.40', '21.00', '22.40'];
let myArrayOfObjects = [];

function randomMovie() {
  let rnd = Math.floor(Math.random() * 5);
  return movieNames[rnd];
}

function randomTheater() {
  let rnd = Math.floor(Math.random() * 2);
  return theater[rnd];
}

function randomWriteShowsToJSON() {
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
      tempObject.auditorium = randomTheater();
      tempObject.film = randomMovie();
      tempObject.time = times[i];

      myArrayOfObjects.push(tempObject);
      console.log(tempObject);
    }
  }
}

function addToArray(object){

}

function saveToJSON(object){
  JSON._save('shows.json', {
      Shows: object
  });
}
