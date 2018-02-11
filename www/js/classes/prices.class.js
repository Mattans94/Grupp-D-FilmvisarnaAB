class Prices extends Base {
	constructor(numberOfChildren, numberOfAdults, numberOfPensioners) {
		super();
		this.numberOfChildren = numberOfChildren;
		this.numberOfAdults = numberOfAdults;
		this.numberOfPensioners = numberOfPensioners;

		this.childObject = Data.priceObject.child;
		this.adultObject = Data.priceObject.adult;
		this.pensionerObject = Data.priceObject.pensioner;


		this.totalTickets = this.numberOfChildren + this.numberOfAdults + this.numberOfPensioners;
		this.totalPrice = 0;
	} //end constructor

	start(){
		this.ticketType;
	}

	renderUnitPrice(unitObject, numberOfUnits) {
		let total = unitObject.price * numberOfUnits;
		return `<p><span class="pl-0 col-7 d-inline-block mr-3">${numberOfUnits} st ${unitObject.unit} á ${unitObject.price}kr</span>${total} kr</p>
		<hr>`
	}

	renderTotalPrice() {
		if (this.totalPrice >= 0) {
			return `<p class="mb-1"><span class="pl-0 col-7 d-inline-block mr-3">Totalt:</span>${this.totalPrice} kr</p>`
		}
	}

		renderTotalAmount() {
		let html = "";
		if (this.numberOfAdults > 0) {
			html += `${this.renderUnitPrice(this.adultObject, this.numberOfAdults)}`
		}
		if (this.numberOfPensioners > 0) {
			html += `${this.renderUnitPrice(this.pensionerObject, this.numberOfPensioners)}`
		}
		if (this.numberOfChildren > 0) {
			html += `${this.renderUnitPrice(this.childObject, this.numberOfChildren)}`
		}

		html += `${this.renderTotalPrice()}`

		html += `
			<div class="d-flex justify-content-end">
				<button class="btn btn-danger bookingConfirmation">Boka nu!</button>
			</div>`

		$('#totalprice').html(html);
	}

	calculateTotalPrice() {
		this.totalPrice = (this.childObject.price * this.numberOfChildren) + (this.adultObject.price * this.numberOfAdults) + (this.pensionerObject.price  * this.numberOfPensioners);
	}

} // end class
