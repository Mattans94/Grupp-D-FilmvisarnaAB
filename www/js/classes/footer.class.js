class Footer extends Base {

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
