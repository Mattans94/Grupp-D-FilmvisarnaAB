class Prices extends Base {
	constructor(numberOfChildren, numberOfAdults, numberOfPensioners) {
		super();
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;


		this.pricePerChild = Data.priceObject.Prices.child;
		this.pricePerAdult = Data.priceObject.Prices.adult;
		this.pricePerPensioner = Data.priceObject.Prices.pensioner;
		
	} //end constructor

	start(){
		this.ticketType;
	}

	renderGrandTotal() {
		let html=`<h4 class="text-light">Totalt: ${this.GrandTotal} kr</h4>`;
		$('#totalprice').html(html);
	}

	calculateTotalPrice() {
		this.GrandTotal = (this.pricePerChild * this.numberOfChildren) + (this.pricePerAdult * this.numberOfAdults) + (this.pricePerPensioner * this.numberOfPensioners);
	}

} // end class
