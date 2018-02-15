class Signup {

	constructor(){
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){

		$("#signup-btn").on("click", () => {

			JSON._load('users').then((users) => {
				this.userObjects = users;
			}).then(() => {

			this.clearAllInputs();

			let condition = this.validateAllChecks();

			if (condition){
				let tempObject = {};

				tempObject.username = $("#signup-username").val();
				tempObject.name = $("#signup-name").val();
				tempObject.password = $("#signup-password").val();
				tempObject.id = this.returnGeneratedId();
				this.saveUsers(tempObject);

				$(".user-created").show();
				this.emptyInputs();
				}
			});


		});
	}

	clearAllInputs() {
		$('.error-signup-message').text('');
		$('.error-signup-message2').text('');
		$('.error-signup-message3').text('');
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

		} else {conditionExist = false;}

		if(this.checkPasswordLength($("#signup-password").val())){
			conditionPasswordLength = true;

		} else {conditionPasswordLength = false;}

		if(this.checkValidEmail()){
			conditionValidEmail = true;

		} else {conditionValidEmail = false;}

		if (conditionExist && conditionValidEmail && conditionPasswordLength && conditionValidName) {
			return true;

		}else {
			return false;
		};

	}

	returnGeneratedId(){
		let generatedID;
		do {
			generatedID = this.generateUserId();
		}	while (this.checkExistingId(generatedID));

		return generatedID;
	}

	generateUserId(){
		let generatedID = '';
		let allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 12; i++) {
			generatedID += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
		}

		return generatedID;
	}

	checkExistingId(generatedID){
		for (let i = 0; i < this.userObjects.length; i++){
			if (generatedID == this.userObjects[i].id){
				return true;
			} else {
				return false;
			}
		}
	}

	saveUsers(newUserObject){
		this.userObjects.push(newUserObject);
		JSON._save('users.json', this.userObjects).then(function(){

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
			$('.error-signup-message3').append('<p>- Lösenord måste vara minst 6 tecken</p>');
			return false;
		}
	}

	checkValidEmail(){
		if ($('#signup-username').is(':valid') && !($('#signup-username').val() == '')) {
			return true;
		}	else {
			$('#signup-username').css({"border": "1px solid red"});
			$('.error-signup-message2').append('<p>- Användarnamn måste vara en giltig email</p>');
			return false;
		}
	}

	checkValidName(){
		if ($('#signup-name').val().length > 1) {

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
