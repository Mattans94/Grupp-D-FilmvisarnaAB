class Kalendarium extends Base {
	constructor(){
		super();
	}

	makeSmallDate(date){
		let month = date.slice(5, -3);
		let day = date.slice(-2);
		date = day + "/" + month;

		for (let i = 0; i < date.length; i++) {
			date = date.replace("0", "");
		}

		return date;
	}

	getTheater(theater, movieTitle) {
		let allShows = this.getShowObject(movieTitle);
    return allShows.filter((m) => theater == m.auditorium);
  }

	renderShowTime(movieTitle, theater, id){

		let allShows = this.getTheater(theater, movieTitle);
		let myLis = "";
		for (let i = 0; i < 3; i++){
			myLis += `<a href="${this.makeMovieLink(allShows[i])}"><li><div class="col-6 pr-0 d-inline">${this.makeSmallDate(allShows[i].date)}</div> <div class="col-6 d-inline pl-1 float-right">${allShows[i].time}</div></li></a>`
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
	// Making dates into XX/XX
}
