class Login {

	constructor(){
		this.username;
		this.name;
		this.password;
		this.eventHandlers();
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

}




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