class Footer extends Base {
  constructor() {
    super();
    this.fixOnResize();
  }


  footerFix(){
    let height = $('footer').height() + 40;
    $('body').css({marginBottom: height});
  }

  fixOnResize(){
    let that = this;
    $(window).on('resize',function(){
      that.footerFix();
    });
  }
}
