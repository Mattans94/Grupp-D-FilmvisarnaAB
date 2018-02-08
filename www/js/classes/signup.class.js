class Signup {

	constructor(){
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){

		$("#signup-btn").on("click", () => {
			this.clearAllInputs();

			let condition = this.validateAllChecks();

			if (condition){
				let tempObject = {};

				tempObject.username = $("#signup-username").val();

				tempObject.name = $("#signup-name").val();

				tempObject.password = $("#signup-password").val();

				tempObject.id = this.generateId();

				this.saveUsers(tempObject);

				console.log('Success!');
				this.emptyInputs();
				}


		});
	}

	clearAllInputs() {
		$('.error-signup-message').text('');
		$('#signup-password').css({"border": "1px solid green"});
		$('#signup-username').css({"border": "1px solid green"});
		$('#signup-name').css({"border": "1px solid green"});
	}

	validateAllChecks(){
		let conditionExist = false;
		let conditionPasswordLength = false;
		let conditionValidEmail = false;
		let conditionValidName = false;

		if (this.checkValidName()) {
			conditionValidName = true;
		}

		if (this.checkExistingUser($("#signup-username").val())){
			conditionExist = true;
			console.log('Username new');
		} else {conditionExist = false; console.log('Username already exist')};

		if(this.checkPasswordLength($("#signup-password").val())){
			conditionPasswordLength = true;
			console.log('password length ok');
		} else {conditionPasswordLength = false; console.log('Password too short')};

		if(this.checkValidEmail()){
			conditionValidEmail = true;
			console.log('Valid email');
		} else {conditionValidEmail = false; console.log('Email not valid')};

		if (conditionExist && conditionValidEmail && conditionPasswordLength && conditionValidName) {
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
		if (!condition) {
			$('#signup-username').css({"border": "1px solid red"});
			$('.error-signup-message').append('<p>- Användaren finns redan</p>');
		}
		return condition;
	}

	checkPasswordLength(password){
		if (password.length > 5){
			return true;
		}
		else{
			$('#signup-password').css({"border": "1px solid red"});
			$('.error-signup-message').append('<p>- Lösenord måste vara minst 6 tecken</p>');
			return false;
		}
	}

	checkValidEmail(){
		if ($('#signup-username').is(':valid') && !($('#signup-username').val() == '')) {
			return true;
		}	else {
			$('#signup-username').css({"border": "1px solid red"});
			$('.error-signup-message').append('<p>- Användarnamn måste vara en giltig email</p>');
			return false;
		}
	}

	checkValidName(){
		if ($('#signup-name').val().length > 1) {
			console.log("valid name");
			return true;
		} else {
			$('#signup-name').css({"border": "1px solid red"});
			$('.error-signup-message').append('<p>- Ditt namn måste innehålla minst 2 bokstäver</p>');
			return false;
		}
	}

	emptyInputs(){
		$('#signup-username').val('');
		$('#signup-name').val('');
		$('#signup-password').val('');
	}

}


















