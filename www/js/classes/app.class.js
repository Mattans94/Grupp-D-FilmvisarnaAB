class Data {}

class App extends Base {
  constructor(){

    super()
        // Tell jsonflex to recreate instances of the class Garment
    // JSON._classes(Garment);

    // Load shows, add as a property, then start the app
    JSON._load('shows').then((shows) => {
      // Retrieve the app from JSON
      Data.showObjects = this.showObjects = shows;
    })
    .then(JSON._load('movies').then((movies) => {
      // Retrieve the app from JSON
      Data.movieObjects = this.showObjects = movies;
    })
    .then(() => {
      this.start();
      // this.eventHandlers();
    }));


  }

  start(){
    // Create a navbar
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');

    // Create footer, empty footer, render footer and fix auto-height.
    this.footer = new Footer;
    $('footer').empty();
    this.footer.render('footer');
    this.footer.footerFix();

    // Create a startpage

    new Popstate();

    // Sending movies and shows to Movieclass
    // this.Base = new Base(this);

    // Then call renderMovie() to render the movie with the same title.

    // Initiate handling of SPA push/pop-state
  }

  // eventHandlers(){
  //   let that = this;
  //   $(document).on('click', '.showmorebtn', function(){
  //     let clicked = $(this);
  //     let movieTitle = clicked.data('movie');
  //     that.movie = new Movie(movieTitle);
  //   })
  // }

}
