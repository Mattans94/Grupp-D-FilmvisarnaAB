class Data {}

class App extends Base {
  constructor(){
    super()
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
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');
    this.footer = new Footer;
    $('footer').empty();
    this.footer.render('footer');
    this.footer.footerFix();
    this.loginform = new Loginform();
    this.loginform.render('.renderForm');
    this.loggedInForm = new LoggedInForm();
    this.login = new Login(this);
    this.signup = new Signup();
    this.popstate = new Popstate(this);
  }
}
