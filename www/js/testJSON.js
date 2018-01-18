class GetJSON {
  constructor(){
    this.movieObjects;
    this.showObjects;
    this.getJSONForMovies();
    this.getJSONForShows();
  }

  getJSONForShows() {
    JSON._load('shows')
    .then((data) => {
      // Retrieve the app from JSON
      this.showObjects = data;
    })
    .catch((errorMessage) => {
    	console.log(errorMessage);
    })
  }

  getJSONForMovies() {
    JSON._load('movies')
    .then((data) => {
      // Retrieve the app from JSON
      this.movieObjects = data;
    })
    .catch((errorMessage) => {
    	console.log(errorMessage);
    })
  }

  checkMovie(movieTitle) {
    // Example 1:
    // return this.movieObjects.find(function(m) {
    //   return movieTitle == m.title;
    // })
    // Example 2:
    // for (let i = 0; i < this.movieObjects.length; i++){
    //   if (movieTitle == this.movieObjects[i].title) {
    //     return this.movieObjects[i];
    //   }
    // }
    // Example 3
    return this.movieObjects.find((m) => movieTitle == m.title)
  }

  checkShows(movieTitle) {
    return this.showObjects.filter((m) => movieTitle == m.film);
  }

  getActors(movieObject){
  	let actors = "";
  	for(let actor of movieObject.actors){
  		actors += '<li>'+ actor +'</li>';
  	}
  	return actors;
 }

  renderShowtime(movieObject){
   let allShows = this.checkShows(movieObject.title);
   console.log(allShows);
   setTimeout(()=>{console.log(allShows)},1000)
   return `<li>Var: ${allShows[0].auditorium} Datum: ${allShows[0].date} Tid: ${allShows[0].time}`
  }

  renderDescription(movieTitle) {
    let movieObject = this.checkMovie(movieTitle);
    $('main').html(`

        <article class="row">

          <section class="col-lg-7 d-flex flex-wrap d-md-block bg-dark mt-5 pb-3">


            <div class="embed-responsive embed-responsive-16by9 mt-3">
              <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movieObject.youtubeTrailers[0]}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>


            <div class="bg-light">

              <div id="accordion" role="tablist">
                <a data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true" aria-controls="collapseOne">
                  <div class="col-12 m-0 p-2 pl-3">
                    <i class="fa fa-film mr-2" aria-hidden="true"></i>Boka/Visa tider här
                  </div>
                </a>

                  <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="p-3">
                      <ul>
                        ${this.renderShowtime(movieObject)}
                      </ul>
                    </div>
                  </div>
                </div>


                <div class="d-flex flex-wrap d-md-block">
                  <div class="col-12 col-md-auto float-md-right m-0 m-md-3 p-0 order-2">
                    <ul class="p-3 info-box mb-0">
                      <li><strong>Land: </strong>${movieObject.productionCountries}</li>
                      <li><strong>Produktionsår: </strong>${movieObject.productionYear}</li>
                      <li><strong>Längd: </strong>${movieObject.length}</li>
                      <li><strong>Genre: </strong>${movieObject.genre}</li>
                      <li><strong>Språk: </strong>${movieObject.language}</li>
                      <li><strong>Textning: </strong>${movieObject.subtitles}</li>
                    </ul>
                  </div>

                  <div class="col-md-12 p-3 pt-0">
                    <h2>${movieObject.title}</h2>
                    <p>${movieObject.description}</p>

                    <p><strong>&ldquo;${movieObject.reviews[0].quote}&ldquo;</strong><em>- ${movieObject.reviews[0].source}</em></p>
                    <p><strong>Medverkande:</strong>${this.getActors(movieObject)}</p>
                  </div>
              </div>

              </div>


          </section>

          <section class="col-lg-3">
            <div class="bg-light mt-5 p-2">
              <h3>Kalendarium</h3>
              <ul>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
          </section>

        </article>


      `)
  }


}

let x = new GetJSON


$(document).on('click', 'button', function() {
  let myBtn = $(this).data('btn')
  x.renderDescription(myBtn);
});
