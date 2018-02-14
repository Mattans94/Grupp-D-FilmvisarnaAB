class StartPage extends Base {
	constructor(){
		super();
	}

	renderMovie(movieTitle){
		let movieObject = this.getMovieObject(movieTitle);
		return `
		<div class="movieBlock mb-3 mr-2 ml-2 p-3 d-flex flex-column col">
			<a href="${movieObject.title}" class="pop"><img class="img-fluid" src="/img/posters/${movieObject.images[0]}"></a>
			<a href="${movieObject.title}" class="pop"><h5 class="mt-2 mb-2">${movieObject.title}</h5></a>

		</div>`
	}

}
