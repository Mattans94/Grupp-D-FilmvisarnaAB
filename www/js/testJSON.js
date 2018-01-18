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
            
        <article class="row">

          <section class="col-lg-7 d-flex flex-wrap d-md-block bg-dark mt-5 pb-3">
            HEJHEJHEJHEJ


            <div class="embed-responsive embed-responsive-16by9 mt-3">
              <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/6ZfuNTqbHE8?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
                      <li><strong>Land: </strong>Frankrike</li>
                      <li><strong>Produktionsår: </strong>2017</li>
                      <li><strong>Längd: </strong>94 min</li>
                      <li><strong>Genre: </strong>Drama</li>
                      <li><strong>Språk: </strong>Franska</li>
                      <li><strong>Textning: </strong>Svenska</li>
                    </div>
                  </div>
                </div>


                <div class="d-flex flex-wrap d-md-block">
                  <div class="col-12 col-md-auto float-md-right m-0 m-md-3 p-0 order-2">
                    <ul class="p-3 info-box mb-0">
                      <li><strong>Land: </strong>$(movieObject.productionCountries)</li>
                      <li><strong>Produktionsår: </strong>$(movieObject.productionYear)</li>
                      <li><strong>Längd: </strong>$(movieObject.length)</li>
                      <li><strong>Genre: </strong>$(movieObject.genre)</li>
                      <li><strong>Språk: </strong>$(movieObject.language)</li>
                      <li><strong>Textning: </strong>$(movieObject.subtitles)</li>
                    </ul>
                  </div>

                  <div class="col-md-12 p-3 pt-0">
                    <h2>TITEL HÄR KANSKE LÅNG</h2>
                    <p>Juliette Binoche är lysande i rollen som Isabelle, en frånskild konstnär i 50-års åldern, som försöker sålla bland alla självcentrerade män i hopp om att åter finna kärleken. En elegant romantisk komedi av kritikerrosade Claire Denis om vad som är viktigt i livet och om vad man vill ha i en mogen relation.</p>
                    <p>Invigningsfilm av kritikerveckan och vinnare av SACD Award i Cannes 2017.</p>

                    <p><strong>"Mumma för skådespelare med kammarspelet i blodet" - </strong> <em>Sydsvenskan</em></p>
                    <p><strong>"En regelrätt fest för biobesökarna" - </strong> <em>Svenska Dagbladet</em></p>
                    <p><strong>Medverkande:</strong> Juliette Binoche, Gérard Depardieu, Valeria Bruni Tedeschi, Nicolas Duvauchelle, Claire Tran, Josiane Balasko, Xavier Beauvois, Alex Descas, Bruno Podalydès, Paul Blain</p>
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
