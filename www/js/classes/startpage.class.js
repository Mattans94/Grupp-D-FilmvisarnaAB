class StartPage extends Base {
	constructor(){
		super();
	}

	renderMovie(movieTitle){
		let movieObject = this.getMovieObject(movieTitle);
		return `
		<div class="movieBlock mb-3 mr-2 ml-2 p-3 col" id="wrapper">
			<a href="${movieObject.title}" class="pop d-flex flex-column">
				<img class="img-fluid animation" src="/img/posters/${movieObject.images[0]}">
					<h5 class="wrap-text m-0 p-0">${movieObject.title}</h5>	
			</a>
		</div>
		`
	}
}
