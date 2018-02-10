class Prices extends Base {
	constructor(numberOfChildren, numberOfAdults, numberOfPensioners) {
		super();
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;


		this.pricePerChild = Data.priceObject.Prices.child;
		this.pricePerAdult = Data.priceObject.Prices.adult;
		this.pricePerPensioner = Data.priceObject.Prices.pensioner;

		this.totalTickets = this.numberOfChildren + this.numberOfAdults + this.numberOfPensioners;

	} //end constructor

	start(){
		this.ticketType;
	}

	renderGrandTotal() {
		let html=`
			<h4 class="text-light">Antal: ${this.totalTickets} biljetter</h4>
			<h4 class="text-light">Pris: ${this.totalPrice} kr</h4>
		`;
		$('#totalprice').html(html);
	}

	calculateTotalPrice() {
		this.totalPrice = (this.pricePerChild * this.numberOfChildren) + (this.pricePerAdult * this.numberOfAdults) + (this.pricePerPensioner * this.numberOfPensioners);
	}

} // end class
