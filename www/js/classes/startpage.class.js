class StartPage extends Base {
	constructor(){
		super();
	}

	renderMovie(movieTitle){
		let movieObject = this.getMovieObject(movieTitle);
		return `
		<div class="movieBlock mb-3 mr-2 ml-2 p-3 d-flex flex-column col">
			<img class="img-fluid" src="/img/posters/${movieObject.images[0]}">

			<h4 class="mt-2 mb-2">${movieObject.title}</h4>
			<a href="${movieObject.title}" class="pop align-self-end mt-auto"><button type="button" class="btn btn-danger showmorebtn">Visa mer!</button></a>

		</div>`
	}

}
