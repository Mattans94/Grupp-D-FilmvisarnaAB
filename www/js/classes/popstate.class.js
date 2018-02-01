class Popstate{

  constructor(app){
    this.app = app;
    this.clickEvents();
    this.changePage();
    window.addEventListener('popstate', () => this.changePage());
  }

  makeUrl(url){
    url = url.replace(/,/g, "");
    url = url.replace(/ /g, "_");
    url = url.replace(/%20/g, "_");
    return url;
  }

  clickEvents(){
    let that = this;
    $(document).on('click','.pop',function(e){
      //Create a push state preventDefault
      let href = $(this).attr('href');
      console.log(href);
      href = that.makeUrl(href);
      history.pushState(null, null, href);
      //Call the change page function
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    })};


  changePage(){
    //React on page changed, replace parts of DOM
    // get the current url
    let url = location.pathname;

    let urls = {
      '/' : 'startpage',
      '/Theater' : 'theaterPage',
      '/Tjuren_Ferdinand' : 'movieFerdinand',
      '/Wind_River': 'movieWindRiver',
      '/Three_Billboards_Outside_Ebbing_Missouri': 'movieThreeBillboards',
      '/Call_Me_By_Your_Name': 'movieCallMe'
    }

    let methodName = urls[url];
    this[methodName]();

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
    $('main').empty();
    let theater = new Theater();
    theater.render('main');
    theater.scale();
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

}
