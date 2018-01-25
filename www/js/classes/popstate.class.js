class Popstate extends Base{

  constructor(){
    super();
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
    $(document).on('click','button.pop',function(e){
      //Create a push state preventDefault
      let href = $(this).data('movie');
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
      '/Tjuren_Ferdinand' : 'movieFerdinand'
    }

    let methodName = urls[url];
    this[methodName]();

  }

  startpage(){
    $('main').empty();
    let startPage = new StartPage();
    startPage.render('main');
    console.log('lalala');
  }

  movieFerdinand(){
    $('.leftContainer').empty();
    let moviepage = new Movie('Tjuren Ferdinand');
    console.log('hello');
  }

}
