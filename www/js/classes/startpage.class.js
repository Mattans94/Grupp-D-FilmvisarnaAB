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


	// Making dates into XX/XX
	makeSmallDate(date){
		let month = date.slice(5, -3);
		let day = date.slice(-2);
		date = day + "/" + month;

		for (let i = 0; i < date.length; i++) {
			date = date.replace("0", "");
		}

		return date;
	}

	renderShowTime(movieTitle, id){
		let allShows = this.getShowObject(movieTitle);
		let myLis = "";

		for (let i = 0; i < 3; i++){
			myLis += `<li><div class="col-6 d-inline">${this.makeSmallDate(allShows[i].date)}</div> <div class="col-6 d-inline float-right">${allShows[i].time}</div></li>`
		}

		return `
			<div class="collapseShowtime mb-2" role="tablist" class="mb-2">
				<a data-toggle="collapse" href="#${id}" role="button" aria-expanded="true" aria-controls="collapseOne" class="collapsed">
					<div class="col-12 m-0">
						<i class="fa" aria-hidden="true"></i><strong class="col-12 p-0">${allShows[0].film}</strong>
					</div>
				</a>

				<div id="${id}" class="collapse pb-2" role="tabpanel" aria-labelledby="headingOne" data-parent="#${id}">

						<div class="col-12">
							<div class="col-6 d-inline-block pl-0"><strong>Datum:</strong></div><div class="col-6 d-inline-block float-right"><strong>Tid:</strong></div>
							<ul class="listShowTimes">
								${myLis}
							</ul>
						</div>
					</div>
			</div>

		`
	}
}
