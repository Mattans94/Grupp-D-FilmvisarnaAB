class Login {

	constructor(){
		this.username;
		this.name;
		this.password;
		this.eventHandlers();
		JSON._load('users').then((users) => {
     	this.userObjects = users;
   		})
	}

	eventHandlers(){

		$("#loginbtn").on("click", () => {

		this.username = $("#username").val();
		console.log(this.username);

		this.name = $("#name").val();
		console.log(this.name);

		this.password = $("#password").val();
		console.log(this.password);

		});
	}

	getLastId(){
		let highestID = this.userObjects[0].id;

		for(let i = 0; i < this.userObjects.length; i++){
			if (this.userObjects[i].id > highestID) {
				highestID = this.userObjects[i].id;
			}
		}
	}

	generateId(){


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
