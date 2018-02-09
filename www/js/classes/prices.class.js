class Prices {
	constructor(numberOfChildren, numberOfAdults, numberOfPensioners) {
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;

		JSON._load('prices').then((prices) => {
			this.priceObject = prices;
			this.start();
		});

		this.pricePerChild=0;
		this.pricePerAdult=0;
		this.pricePerPensioner=0;
		// console.log('pricePerChild', this.pricePerChild, 'pricePerAdult', this.pricePerAdult, 'pricePerPensioner', this.pricePerPensioner);

		this.totalChild=0;
		this.totalAdult=0;
		this.totalPensioner=0;
		this.GrandTotal=0;

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
		this.renderGrandTotal();
		// that = this;
		this.ticketType;
	}

	renderGrandTotal() {
		let html=`Totalt: ${this.GrandTotal} kr`;
		$('#totalprice').html(html);
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
		// console.log('this.pricePerChild', this.pricePerChild);
		return childPrice;
	}

	getPricePerAdult(priceObject){
		// console.log('a priceObject', priceObject);

		let adultPrice = priceObject;
		this.pricePerAdult = adultPrice;
		// console.log(this.pricePerAdult);		
		return adultPrice;
	}

	getPricePerPensioner(priceObject){
		// console.log('p priceObject', priceObject);

		let pensionerPrice = priceObject;
		this.pricePerPensioner = pensionerPrice;
		// console.log('this.pricePerPensioner', this.pricePerPensioner);		

		return pensionerPrice;
	}

	calculateTotalPrice() {
		// console.log('numberOfChildren', numberOfChildren, 'numberOfAdults', numberOfAdults, 'numberOfPensioners', numberOfPensioners);
		

		this.totalChild = this.pricePerChild * this.numberOfChildren;
		// console.log('totalChild', this.totalChild, 'pricePerChild', this.pricePerChild, 'numberOfChildren', this.numberOfChildren);
		this.totalAdult = this.pricePerAdult * this.numberOfAdults;
		this.totalPensioner = this.pricePerPensioner * this.numberOfPensioners;
		this.GrandTotal = this.totalChild + this.totalAdult + this.totalPensioner;

		this.renderGrandTotal;

		// console.log('totalChild',this.totalChild);
		// console.log('totalAdult',this.totalAdult);
		// console.log('totalPensioner',this.totalPensioner);

		// console.log('GrandTotal', this.GrandTotal);
	}
} // end class