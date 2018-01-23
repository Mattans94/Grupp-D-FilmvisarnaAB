// class MyOrder{

	// constructor(movie, date, time, auditorium, seatNo, price, totalPrice){
		// this.myOrder;
		// this.movie = movie;
		// this.date = date;
		// this.time = time;
		// this.auditorium = auditorium;
		// this.seatNo = seatNo;
		// this.price = price;
		// this.totalPrice = totalPrice;
		// this.orderNo = orderNo;
		// this.customerName = customerName;


	// 	this.myOrder = [];
	// 	this.movie = 'The Party';
	// 	this.date = 2018-01-01;
	// 	this.time = 17:40;
	// 	this.auditorium = 'Stora Salong';
	// 	this.seatNo = 31;
	// 	this.price = 80;
	// 	this.totalPrice = 'totalPrice';
	// 	this.orderNo = 'orderNo';
	// 	this.customerName = 'customerName';
	// }

	// JSON._save('myOrder.json', this.myOrder).then(function(){
	// 	console.log('saved');
	// });

let persons = [{name:'Anna', name: 'Bob', name: 'Cecilia'}];
JSON._save('myOrder.json', persons).then(function(){
  console.log('Saved!');
});



// }