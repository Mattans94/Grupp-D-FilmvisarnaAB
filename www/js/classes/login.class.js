class Login extends Base{

	constructor(app){
		super();
		this.app = app;
		this.loggedInUser = {isLoggedIn: false};
		this.eventHandlers();
		this.readSession();
	}

	eventHandlers(){
		$(document).on('click', '#myBookings-btn', () => {
			if (!(this.session.id === null)){
				this.getRightUserInfo();
			}

		});


		$(document).on('click', '#login-btn', () => {

			JSON._load('users').then((users) => {
     		this.userObjects = users;
   		})
   		.then(() => {
				console.log("jkasdklajs");
				let username = $("#login-username").val();
				let password = $("#login-password").val();
				let condition = this.checkUsername($("#login-username").val());
				if (condition) {
					condition =	this.compareUserPass(username, password);
				}

				if (condition) {

					console.log("you're logged in!");
					let loggedInUserObject = this.getUserObject(username);
					this.loggedInUser = Object.assign(this.loggedInUser, loggedInUserObject);
					this.emptyInputs();
					this.loggedInUser.isLoggedIn = true;
					this.renderNavLoggedIn();
					this.createSession();
				}
			})
		});

		$("#togglelogin-btn").on('click', function() {
			let text = $(this).text();
			console.log(text);
			$(this).text(text == "Skapa konto" ? "Logga in" : "Skapa konto");
			$('.logintoggle').slideToggle(400);
		});


		$('.myAccBtn').on('click', function(){
			$('.myloginform').fadeToggle(200);
		});


		$(document).on("click", "#logout-btn", () => {
			this.logout();
			console.log("Logged out...");
		});


	}

	async createSession(){
    let sessObj = {id:this.loggedInUser.id};
    await JSON._save('session', sessObj);
    this.session = sessObj;
  }

  async readSession(){
    let sessObj = await JSON._load('session');
    await this.userIdLogin(sessObj);
  }

  async userIdLogin(sessObj){
  	this.userObjects = await JSON._load('users');
  	for(let user of this.userObjects){
  		if (sessObj.id == user.id) {
  			this.loggedInUser = user;
  			this.session = sessObj;
  			this.loggedInUser.isLoggedIn = true;
  			this.renderNavLoggedIn();
  			return;
  		}
  	}
  }

  async destroySession(){
    this.session = await JSON._save('session',{id:null});
   	this.loggedInUser = {isLoggedIn: false};
  }

	checkUsername(username){
		let condition = false;
		for(let i = 0; i < this.userObjects.length; i++){
			if(username == this.userObjects[i].username){
				return true;
			}
		}

		if (condition == false) {
			console.log("username not found");
			$('#login-username').css({"border": "1px solid red"});
		}

	}

	getUserObject(username){
		return this.userObjects.find((m) => username == m.username);
	}

	compareUserPass(username, password){
		let userObject = this.getUserObject(username);
		let usernameCondition = false;
		let passwordCondition = false;
		if (username == userObject.username) {
			console.log("Username True");
			usernameCondition = true;
		} else {
			console.log("Username False");
		}
		if (password == userObject.password) {
			console.log("Password True");
			passwordCondition = true;
		} else {
			console.log("Password False");
		}

		if (usernameCondition && passwordCondition) {
			console.log("Login complete");
			$('#login-username').css({"border": "1px solid green"});
			$('#login-password').css({"border": "1px solid green"});
			return true;
		} else {
			console.log("Username or password invalid");
			$('#login-username').css({"border": "1px solid red"});
			$('#login-password').css({"border": "1px solid red"});
			return false;
		}

	}

	isLoggedIn(){
		if (this.loggedInUser.isLoggedIn) {
			console.log("is logged in");
			return true;
		}
	}

	emptyInputs(){
		$('#login-username').val('');
		$('#login-password').val('');
	}

	renderNavLoggedIn(){
    if (this.loggedInUser.isLoggedIn) {
      $('.renderForm').empty();
      this.app.loggedInForm.render('.renderForm');
    }
  }

	logout(){
		this.destroySession();
		this.loggedInUser = {isLoggedIn: false};
		$('.renderForm').empty();
		myApp.loginform.render('.renderForm');
	}


	// Userpage no history yet
	async getRightUserInfo(){
		this.bookingObjects = await JSON._load('booking');
		let loggedInId = this.session.id;
		this.bookedUserShows = this.bookingObjects.filter((m) => loggedInId == m.show.userID);

		this.checkIfBookingPassed();
	}

	getCurrentDate(){
		let dd = new Date();
		let yy = dd.getYear();
		let mm = dd.getMonth() + 1;
		dd = dd.getDate();
		if (yy < 2000) { yy += 1900; }
		if (mm < 10) { mm = "0" + mm; }
		if (dd < 10) { dd = "0" + dd; }
		let currentDate = yy + "-" + mm + "-" + dd;
		return currentDate;
	}

	checkIfBookingPassed(){
		let that = this;
		let oldBookings = [];
		let newBookings = [];
		this.bookedUserShows.forEach(function(bookedShow){
			if (that.getCurrentDate() < bookedShow.show.date) {
				newBookings.push(bookedShow);
			} else {
				oldBookings.push(bookedShow);
			}
		});

		this.renderLoginTemplate(newBookings, oldBookings)
	}

	getBookedSeats(bookedSeats){
		let allSeats = '';
		for (let seat of bookedSeats){
			allSeats += seat + ', ';
		}
		return allSeats
	}

	renderEachShow(bookingArray){
		let html = '';
		for (let i = 0; i < bookingArray.length; i++){
			let movieObject = this.getMovieObject(bookingArray[i].show.film);

			html += `
			<div class="d-flex flex-nowrap mt-3 mb-3 bookingContainer bg-dark text-white p-3">
				<div class="col-3 align-self-center p-0">
					<img class="img-fluid" src="/img/posters/${movieObject.images[0]}">
				</div>
				<div class="col-9">
					<h3 class="mb-3">${bookingArray[i].show.film}</h3>
					<p class="m-0"><span class="pl-0 col-3 d-inline-block mr-3">Plats:</span> ${bookingArray[i].show.auditorium}</p>
					<p class="m-0"><span class="pl-0 col-3 d-inline-block mr-3">Datum:</span> ${bookingArray[i].show.date}</p>
					<p class="m-0"><span class="pl-0 col-3 d-inline-block mr-3">Tid:</span> ${bookingArray[i].show.time}</p>
					<p class="m-0"><span class="pl-0 col-3 d-inline-block mr-3">Platser:</span> ${this.getBookedSeats(bookingArray[i].show.bookedSeats)}</p>
					<p class="m-0"><span class="pl-0 col-3 d-inline-block mr-3">Order:</span> ${bookingArray[i].show.orderID}</p>
				</div>
			</div>

		`
		}
		return html;
	}

	renderLoginTemplate(newBookings, oldBookings){
		$('main').empty();
		let html = `
		<article class="row">
			<div class="col-12 col-lg-6 mt-5 pl-2">
				<h3 class="redHeader m-0 col-12 mb-3 text-center">Aktuella bokningar</h3>
				<div class="errorContainer d-flex justify-content-between flex-wrap flex-lg-nowrap">
					<div class="col-12">
						${this.renderEachShow(newBookings)}
					</div>

				</div>
			</div>
			<div class="col-12 col-lg-6 mt-5 pl-2">
				<h3 class="redHeader m-0 col-12 mb-3 text-center">Historik</h3>
				<div class="errorContainer d-flex justify-content-between flex-wrap flex-lg-nowrap">
					<div class="col-12">
						${this.renderEachShow(oldBookings)}
					</div>
				</div>
			</div>

		</article>`
		$('main').html(html);
	}



}
