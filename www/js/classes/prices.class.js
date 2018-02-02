class Prices {
	constructor(numberOfChildren, numberOfAdults, numberOfPensioners) {
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;

		JSON._load('prices').then((prices) => {
			this.priceObject = prices;
			this.start();
		});

	} //end constructor

	start(){
		// this.getPriceObject('adult');
		// console.log('c', this.priceObject.child);
		// console.log('a', this.priceObject.adult);
		// console.log('p', this.priceObject.pensioner);
		this.getPricePerChild(this.priceObject.child);
		this.getPricePerAdult(this.priceObject.adult);
		this.getPricePerPensioner(this.priceObject.pensioner);
		this.calculateTotalPrice(this.numberOfChildren, this.numberOfAdults, this.numberOfPensioners);

		// that = this;
		this.ticketType;
	}


// behåll utifall att vi vill kunna lägga till fler prisobjekt tex standardpris eller långfilmpris
	// getPriceObject(priceType) {
	// 	console.log('priceType', priceType);
	// 	this.ticketType = this.priceObjects.find((prices) => priceType == prices.type); 
	// 	// this.priceObject = this.priceObjects.find((x) => priceType == x.type);
	// 	console.log(ticketType);
	// }

	getPricePerChild(priceObject){
		// console.log('c priceObject', priceObject);
		let childPrice = priceObject;
		this.pricePerChild = childPrice;
		console.log('this.pricePerChild', this.pricePerChild);
		return childPrice;
	}

	getPricePerAdult(priceObject){
		// console.log('a priceObject', priceObject);

		let adultPrice = priceObject;
		this.pricePerAdult = adultPrice;
		console.log(this.pricePerAdult);		
		return adultPrice;
	}

	getPricePerPensioner(priceObject){
		// console.log('p priceObject', priceObject);

		let pensionerPrice = priceObject;
		this.pricePerPensioner = pensionerPrice;
		console.log('this.pricePerPensioner', this.pricePerPensioner);		

		return pensionerPrice;
	}

	calculateTotalPrice(numberOfChildren, numberOfAdults, numberOfPensioners) {
		console.log(numberOfChildren, numberOfAdults, numberOfPensioners);
		let totalAdult=0;
		let totalChild=0;
		let totalPensioner=0;
		let GrandTotal=0;

		totalAdult = this.pricePerAdult * numberOfAdults;
		totalChild = this.pricePerChild * numberOfChildren;
		totalPensioner = this.pricePerPensioner * numberOfPensioners;
		GrandTotal = totalAdult + totalChild + totalPensioner;
		console.log('totalAdult',totalAdult);
		console.log('totalChild',totalChild);
		console.log('totalPensioner',totalPensioner);

		console.log('GrandTotal',GrandTotal);
	}
} // end class