class Popstate extends Base{

  constructor(app){
    super();
    this.app = app;
    this.clickEvents();
    this.changePage();
    this.eventHandlerSet = false;
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
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    })};


  changePage(bookingShowObject){
    //React on page changed, replace parts of DOM
    // get the current url

    JSON._load('shows').then((shows) => {
      Data.showObjects = shows;
    });



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

    for (let i = 0; i < Data.showObjects.length; i++){
      let dateAndTimeUrl = `/${this.makeMovieLink(Data.showObjects[i])}`;
      let target = 'theaterPage';
      Object.assign(urls, {[dateAndTimeUrl] : target})
    }

    console.log(urls);

    let url = location.pathname;
    console.log(url);

    let methodName = urls[url];

    this[methodName]();

    this.app.login.readSession();
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

  theaterPage(){
    function getDate(urlDate){
      let year = '20' + urlDate.substr(0, 2);
      let month = urlDate.substr(2, 2);
      let day = urlDate.substr(4, 2);
      return `${year}-${month}-${day}`
    }
    function getTime(urlTime){
      let hours = urlTime.substr(0, 2);
      let minutes = urlTime.substr(2, 2);
      return `${hours}.${minutes}`;
    }
    $('main').empty();
    let pathname = location.pathname;
    console.log(pathname);
    let notConvertedDate = pathname.substr(6, 6);
    let notConvertedTime = pathname.substr(12, 4);

    let bookingShowObject = this.getBookingObject(getDate(notConvertedDate), getTime(notConvertedTime));
    //     Loopa igenom json-show
    // Om pathname tid + datum
    // if (urlDate == mm.dtte) && urlTime -== json.time
    // if no show is sent with the rendering show error msg in first if statement
    // booking-showobject is the object that is being clicked when intilize theater
    let theater = new Theater(bookingShowObject);
    //
    if (!this.eventHandlerSet) {
      theater.eventHandlers();
      this.eventHandlerSet = true;
    }
    //
    theater.render('main');
    $(window).on('resize',function(){
      theater.scale();
    });
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
