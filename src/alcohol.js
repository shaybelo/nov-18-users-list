class Bar {
	constructor() {
		this.tab = [];
	}

	buyDrink(price) {
		this.tab.push(price);
	}

	getTotal() {
		return this.tab.reduce((total, current) => total+current, 0);
	}

	pay(amount) {
		if(amount === this.getTotal())
			this.tab = [];
		else throw new Error("INVALID_MONEY");
	}
}


module.exports = {
	isAlcoholLegalForAge(age) {
		if (age < 0) throw new Error("INVALID_AGE");

		return age >= 18;
	},

	Bar
};