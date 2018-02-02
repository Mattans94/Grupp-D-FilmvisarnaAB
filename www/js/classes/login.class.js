class Login {

	constructor(){
		this.loggedInUser = {isLoggedIn: false};
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){
		$("#login-btn").on("click", () => {
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
				this.loggedInUser.isLoggedIn = true;
				this.emptyInputs();
			}

		});

    $('#togglelogin-btn').on('click', function(){
			let text = $(this).text();
			console.log(text);
			$(this).text(text == "Skapa konto" ? "Logga in" : "Skapa konto");
			$('.logintoggle').slideToggle(400);
		});

		$('.myAccBtn').on('click', function(){
			$('.myloginform').fadeToggle(150);
		});


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

	logout(){
		this.loggedInUser = {isLoggedIn: false};
	}

}


