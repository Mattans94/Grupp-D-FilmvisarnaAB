class Popstate extends Base{

  constructor(app){
    super();
    this.app = app;
    this.clickEvents();
    this.changePage();
    window.addEventListener('popstate', () => this.changePage());
  }

  makeUrl(url){
    url = url.replace(/,/g, "");
    url = url.replace(/ /g, "_");
    return url;
  }

  clickEvents(){
    let that = this;
    $(document).on('click','.pop',function(e){
      //Create a push state preventDefault
      let href = $(this).attr('href');
      href = that.makeUrl(href);
      history.pushState(null, null, href);
      //Call the change page function
      if (href === '/Theater'){
        let date = $(this).data('date');
        let time = $(this).data('time');
        let bookingShowObject = that.getBookingObject(date, time);
        that.changePage(bookingShowObject);
      }else {
        that.changePage();
      }
      //Stop the browers from starting a page reload
      e.preventDefault();
    })};


  changePage(bookingShowObject){
    //React on page changed, replace parts of DOM
    // get the current url
    let url = location.pathname;

    let urls = {
      '/' : 'startpage',
      '/Tjuren_Ferdinand' : 'movieFerdinand',
      '/Wind_River': 'movieWindRiver',
      '/Three_Billboards_Outside_Ebbing_Missouri': 'movieThreeBillboards',
      '/Call_Me_By_Your_Name': 'movieCallMe',
      '/Let_The_Sunshine_In': 'movieLetThe',
      '/The_Party': 'movieTheParty',
      '/our_theaters': 'renderOurTheaters',
    }

    let methodName = urls[url];

    // Checking if there is any movie coming into theater
    if (url == "/Theater") {
      this.theaterPage(bookingShowObject);
    } else {
    this[methodName]();
    this.app.login.readSession();
    }
    if(url == '/our_theaters') {
      $('main').removeClass('container').addClass('container-fluid');
    }
    else{
      $('main').removeClass('container-fluid').addClass('container');
    }
  }

  renderKalendarium(){
    let kalendarium = new Kalendarium;
    kalendarium.render('article');
  }

  startpage(){
    $('main').empty();
    let startPage = new StartPage();
    startPage.render('main');
    this.renderKalendarium();
  }

  theaterPage(bookingShowObject){
    $('main').empty();
    // if no show is sent with the rendering show error msg in first if statement
    if (!bookingShowObject){
      let error = new ErrorMessage();
      error.render('main');
    }else {
    // booking-showobject is the object that is being clicked when intilize theater
    let theater = new Theater(bookingShowObject);
    console.log(theater);
    theater.render('main');
    $(window).on('resize',function(){
      theater.scale();
    });
    }
  }

  // Movies
  movieFerdinand(){
    $('main').empty();
    let moviepage = new Movie('Tjuren Ferdinand');
    this.renderKalendarium();
  }

  movieWindRiver(){
    $('main').empty();
    let moviepage = new Movie('Wind River');
    this.renderKalendarium();
  }

  movieThreeBillboards(){
    $('main').empty();
    let moviepage = new Movie('Three Billboards Outside Ebbing, Missouri');
    this.renderKalendarium();
  }

  movieCallMe(){
    $('main').empty();
    let moviepage = new Movie('Call Me By Your Name');
    this.renderKalendarium();
  }

  movieLetThe(){
    $('main').empty();
    let moviepage = new Movie('Let The Sunshine In');
    this.renderKalendarium();
  }

  movieTheParty(){
    $('main').empty();
    let moviepage = new Movie('The Party');
    this.renderKalendarium();
  }


  renderOurTheaters(){
    $('main').empty();
    let ourtheaterspage = new OurTheaters();
    //$('main').removeClass('container').addClass('container-fluid');
    ourtheaterspage.render('main');

  }

}
