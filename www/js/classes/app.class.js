class Data {}

class App extends Base {
  constructor(){

    super()
        // Tell jsonflex to recreate instances of the class Garment
    // JSON._classes(Garment);

    // Load shows, add as a property, then start the app
    JSON._load('shows').then((shows) => {
      Data.showObjects = shows;
    JSON._load('movies').then((movies) => {
      Data.movieObjects = movies;
    JSON._load('prices').then((prices) => {
        Data.priceObject = prices;
    })
    .then(this.start())
      })
    });


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

    this.loginform = new Loginform();
    this.loginform.render('.renderForm');

    this.loggedInForm = new LoggedInForm();

    this.login = new Login(this);
    // Create a startpage
    this.signup = new Signup();
    this.popstate = new Popstate(this);


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
