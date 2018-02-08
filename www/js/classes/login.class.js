class Login extends Base{

	constructor(app){
		super();
		this.app = app;
		this.loggedInUser = {isLoggedIn: false};
		this.eventHandlers();
		this.readSession();
	}

	eventHandlers(){
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

		$(document).on('click', '#togglelogin-btn', () => {
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

}
