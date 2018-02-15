class Base {

  constructor(){
    if(!Base.subRenderCounter){
      Base.subRenderCounter = 1;
      Base.renderingInProgress = false;
      Base.renderQueue = [];
    }
  }

  render(selector = '', templateNo = ''){
    if(Base.renderingInProgress){
      return this.subrender(templateNo);
    }
    Base.renderingInProgress = true;
    let oldBaseEl = this.baseEl;
    this.baseEl = $(this['template' + templateNo]());
    this.addEvents(templateNo);
    if(selector.indexOf('.temp-render-holder') == 0){
      $(selector).replaceWith(this.baseEl)
    }
    else if (!selector && oldBaseEl){
      oldBaseEl.replaceWith(this.baseEl);
    }
    else {
      $(selector || 'main').append(this.baseEl);
    }
    Base.renderingInProgress = false;
    while(Base.renderQueue.length){
      let queued = Base.renderQueue.shift();
      queued.obj.render.apply(queued.obj, queued.args);
    }
  }

  subrender(templateNo){
    Base.subRenderCounter++;
    let className = `temp-render-holder-${Base.subRenderCounter}`;
    Base.renderQueue.push({obj: this, args: [`.${className}`, templateNo]});
    return `<option class="${className}"/>`;
  }

  addEvents(templateNo){
    let types = ['click', 'keyup', 'mouseenter', 'mouseleave','change'];
    for(let type of types){
      let methodName = type + templateNo;
      if(this[methodName]){
        this.baseEl[type]((e) => this[methodName](e));
      }
    }
  }

  getMovieObject(movieTitle) {
    return Data.movieObjects.find((m) => movieTitle == m.title)
  }

  getShowObject(movieTitle) {
    return Data.showObjects.filter((m) => movieTitle == m.film);
  }

  getBookingObject(date, time) {
    let dateFilter = Data.showObjects.filter((m) => date == m.date);
    let rightShowTime = dateFilter.find((m) => time == m.time)
    return rightShowTime;
  }

  makeMovieLink(show){
    let link = `${show.film.replace(' ', '').substr(0, 5)}${show.date}${show.time}`
    link = link.replace(".","-").replace(' ', '').replace('20', '').replace(/-/g, '');
    link = link.toLowerCase();
    return link;
  }
}
