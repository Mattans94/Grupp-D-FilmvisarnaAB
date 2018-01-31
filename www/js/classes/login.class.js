class Login {

	constructor(){
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){

		$("#loginbtn").on("click", () => {
			let condition = this.validateAllChecks();

			if (condition){
				let tempObject = {};

				tempObject.username = $("#username").val();

				tempObject.name = $("#name").val();

				tempObject.password = $("#password").val();

				tempObject.id = this.generateId();

				this.saveUsers(tempObject);

				console.log('Success!');
				}


		});
	}

	validateAllChecks(){
		let conditionExist = false;
		let conditionPasswordLength = false;
		let conditionValidEmail = false;

		if (this.checkExistingUser($("#username").val())){
			conditionExist = true;
			console.log('Username new');
		} else {conditionExist = false; console.log('Username already exist')};

		if(this.checkPasswordLength($("#password").val())){
			conditionPasswordLength = true;
			console.log('password length ok');
		} else {conditionPasswordLength = false; console.log('Password too short')};

		if(this.checkValidEmail()){
			conditionValidEmail = true;
			console.log('Valid email');
		} else {conditionValidEmail = false; console.log('Email not valid')};

		if (conditionExist && conditionValidEmail && conditionPasswordLength) {
			return true;
			console.log('everythings true');
		}else {
			return false;
		};

	}

	getLastId(){

		let highestID = this.userObjects[0].id;

		for(let i = 0; i < this.userObjects.length; i++){
			if (this.userObjects[i].id > highestID) {
				highestID = this.userObjects[i].id;
			}
		}
		return highestID;
	}

	generateId(){

		let newId = this.getLastId() / 1;
		newId += 1;
		return newId;
	}

	saveUsers(newUserObject){
		this.userObjects.push(newUserObject);
		JSON._save('users.json', this.userObjects).then(function(){
			console.log('User saved');
		});
	}

	checkExistingUser(username){
		let condition = true;
		for (let i = 0; i < this.userObjects.length; i++) {
			if (username == this.userObjects[i].username) {
				condition = false;
			}
		}
		return condition;
	}

	checkPasswordLength(password){
		if (password.length > 5){
			return true;
		}
		else{
			return false;
		}
	}

	checkValidEmail(){
		if ($('#username').is(':valid')) {
			return true;
		}	else {
			return false;
		}
	}
}

let x = new Login;

/*

let username;
let name;
let password;

function eventHandlers(){

	$("#loginbtn").on("click", function(){

	username = $("#username").val();
	console.log(username);

	name = $("#name").val();
	console.log(name);

	password = $("#password").val();
	console.log(password);

	});
}
*/
