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

	renderShowTime(movieTitle, id){
		let allShows = this.getShowObject(movieTitle);
		console.log(allShows);
		let myLis = "";

		for (let i = 0; i < 3; i++){
			myLis += `<li><div class="col-5 d-inline">${allShows[i].date}</div> <div class="col-5 d-inline"><h6 class="d-inline">${allShows[i].time}</h6></li>`
		}

		return `
				<div>
          <a class="d-block" data-toggle="collapse" data-target="#${id}" aria-expanded="false" aria-controls="collapseExample"><strong>${allShows[0].film}</strong><i class="fa fa-arrows-v float-right" aria-hidden="true"></i></a>
        </div>
        <div class="collapse" id="${id}">
          <div class="card card-body text-dark">
            <div class="row">
              <ul class="col-md-12 dates">
                <li><div class="col-5 d-inline"><h6 class="d-inline">Date</h6></div> <div class="col-5 d-inline"><h6 class="d-inline">Time</h6></li>
								${myLis}
              </ul>
            </div>
          </div>
        </div>

		`
	}
}
