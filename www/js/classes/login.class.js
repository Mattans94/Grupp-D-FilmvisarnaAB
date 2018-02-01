class Login {

	constructor(){
		this.loggedInUser = {isLoggedIn: false};
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){
		$("#login-btn").on("click", () =>{
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
			}

		})
	}

	checkUsername(username){
		for(let i = 0; i < this.userObjects.length; i++){
			if(username == this.userObjects[i].username){
				console.log("username found");
				return true;
			}
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
			return true;
		} else {
			console.log("Username or password invalid");
			return false;
		}

	}

	isLoggedIn(){
		if (this.loggedInUser.isLoggedIn) {
			console.log("is logged in");
			return true;
		}
	}

	logout(){
		this.loggedInUser = {isLoggedIn: false};
	}

}

let login = new Login();
	









