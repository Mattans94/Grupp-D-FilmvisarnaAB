class GetJSON {
  constructor(){
    this.myJSON;
    this.getJSONFromMovies();
    this.firstObject;

  }

  getJSONFromMovies() {
    JSON._load('movies')
    .then((data) => {
      // Retrieve the app from JSON
      this.myJSON = data;
    })
    .catch((errorMessage) => {
    	console.log(errorMessage);
    })
  }

  consoleMe() {
    console.log(this.myJSON[0].title);
  }

  checkMovie(movieTitle) {
    // Example 1:
    // return this.myJSON.find(function(m) {
    //   return movieTitle == m.title;
    // })
    // Example 2:
    // for (let i = 0; i < this.myJSON.length; i++){
    //   if (movieTitle == this.myJSON[i].title) {
    //     return this.myJSON[i];
    //   }
    // }
    // Example 3
    return this.myJSON.find((m) => movieTitle == m.title)
  }

  getActors(movieObject){
  	let actors = "";
  	for(let actor of movieObject.actors){
  		actors += '<li>'+ actor +'</li>';
  	}
  	return actors;
 }

  renderDescription(movieTitle) {
    let movieObject = this.checkMovie(movieTitle);
    $('.myContent').html(`
      <h1>Titel: ${movieObject.title}</h1>
      <h3>Beskrivning:</h3> ${movieObject.description}
      <h3>Regissör:</h3> ${movieObject.director}
      <h3>Skådespelare:</h3>
      <ul>${this.getActors(movieObject)}</ul>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieObject.youtubeTrailers[0]}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

      `)
  }


}

let x = new GetJSON


$(document).on('click', 'button', function() {
  let myBtn = $(this).data('btn')
  x.renderDescription(myBtn);
});
