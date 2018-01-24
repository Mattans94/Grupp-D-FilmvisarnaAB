class StartPage extends Base {
	constructor(){
		super();
	}

	renderMovie(movieTitle){
		let movieObject = this.getMovieObject(movieTitle);
		return `<div class="card col-12 col-md-6 bg-dark mt-2">
      <img class="card-img-top" src="/img/posters/${movieObject.images[0]}" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title text-white">${movieObject.title}</h4>
        <button type="button" class="btn align-self-end ml-auto bg-info text-light btn-info">Visa mer!</button>
      </div>
    </div>`
	}

	renderShowTime(movieTitle){
		let allShows = this.getShowObject(movieTitle);
		console.log(allShows);
		return `
				<div>
          <a class="d-block" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><strong></strong><i class="fa fa-arrows-v float-right" aria-hidden="true"></i></a>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="card card-body text-dark">
            <div class="row">
              <ul class="col-md-12 dates">
                <h6>Date</h6>
                <li><a>10/12</a></li>
                <li><a>11/12</a></li>
                <li><a>12/12</a></li>
              
                <h6>Time</h6>
                <li><a>13.00</a></li>
                <li><a>13.00</a></li>
                <li><a>13.00</a></li>
              </ul>
            </div>
          </div>
        </div>

		`
	}
}
