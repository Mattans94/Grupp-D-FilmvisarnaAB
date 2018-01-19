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

  convertMinutesToHours(movieObject){
    let totalMinutes = movieObject.length;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return hours + 'h ' + minutes + 'm';
  }

  getAllReviews(movieObject){
    let allReviews = "";
    for(let review of movieObject.reviews){
      allReviews += `<p><strong>&ldquo;${review.quote}&ldquo;</strong><em>- ${review.source}</em></p>`;
    }
    return allReviews;
  }

  renderShowtime(movieObject){
   let allShowTimes = this.checkShows(movieObject.title);
   let showTimesRendered = '';
   let co = 0;
   for (let showTimeObject of allShowTimes) {
     showTimesRendered += `<li data-movieTime="${co}"><div class="col-4 d-inline-block"><strong>${showTimeObject.date}</strong></div><div class="col-4 d-inline-block">${showTimeObject.auditorium}</div> <div class="col-3 d-inline-block">${showTimeObject.time}</div></li>`
     co++
   }
   return showTimesRendered;
  }

  renderTrailer(movieObject){
    return `<div class="embed-responsive embed-responsive-16by9 mt-3">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${movieObject.youtubeTrailers[0]}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>`
  }

  renderCarousel(movieObject){
    return `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="/img/slides/cmbyn1.jpg" alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h2>${movieObject.title}</h2>
            <button class="showTrailer btn">Trailer</button>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/slides/cmbyn2.jpg" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h2>${movieObject.title}</h2>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/slides/cmbyn3.jpg" alt="Third slide">
          <div class="carousel-caption d-none d-md-block">
            <h2>${movieObject.title}</h2>
          </div>
        </div>
      </div>`
  }

  renderMovie(movieTitle) {
    let movieObject = this.checkMovie(movieTitle);
    $('main').html(`

        <article class="row">

          <section class="col-lg-7 d-flex flex-wrap d-md-block bg-dark mt-5 pb-3">

          ${this.renderTrailer(movieObject)}
          ${this.renderCarousel(movieObject)}






              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
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
                      <h3 class="ml-4">Visningar ${movieObject.title}:</h3>
                      <div class="col-12">
                      <div class="col-4 d-inline-block"><strong>Datum:</strong></div><div class="col-4 d-inline-block"><strong>Biograf:</strong></div> <div class="col-3 d-inline-block"><strong>Tid:</strong></div>
                        <ul class="listShowTimes">${this.renderShowtime(movieObject)}</ul>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="d-flex flex-wrap d-md-block">
                  <div class="col-12 col-md-auto float-md-right m-0 m-md-3 p-0 order-2">
                    <ul class="p-3 info-box mb-0">
                      <li><strong>Land: </strong>${movieObject.productionCountries}</li>
                      <li><strong>Produktionsår: </strong>${movieObject.productionYear}</li>
                      <li><strong>Längd: </strong>${this.convertMinutesToHours(movieObject)}</li>
                      <li><strong>Genre: </strong>${movieObject.genre}</li>
                      <li><strong>Språk: </strong>${movieObject.language}</li>
                      <li><strong>Textning: </strong>${movieObject.subtitles}</li>
                    </ul>
                  </div>

                  <div class="col-md-12 p-3 pt-0">
                    <h2>${movieObject.title}</h2>
                    <p>${movieObject.description}</p>

                    ${this.getAllReviews(movieObject)}
                    <p><strong class="mb-0">Medverkande:</strong></p>
                    <ul>${this.getActors(movieObject)}</ul>
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
  x.renderMovie(myBtn);
});


setTimeout(function(){ x.renderMovie('Call Me By Your Name'); }, 200);
