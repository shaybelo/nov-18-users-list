const { Bar } = require('../server/alcohol');

describe("Test Bar Class", () => {
	let bar;

	beforeEach(() => {
		bar = new Bar();
	});

	it('should have an empty tab on a new bar', () => {
		expect(bar.tab.length).toBe(0);
	});

	describe('when buying a drink', () => {
		beforeEach(() => {
			bar.buyDrink(34);
		});

		it('should add a new drink to the tab', () => {
			expect(bar.tab.length).toBe(1);
		});

		it('should add the correct price to the tab', () => {
			expect(bar.tab[0]).toBe(34);
		});
	});

	it('should return the correct total', () => {
		bar.tab = [10, 20, 40, 20];
		expect(bar.getTotal()).toBe(90);
	});

	describe('when paying', () => {
		beforeEach(() => {
			spyOn(bar, 'getTotal').and.returnValue(100);
		});

		it('should reset tab when paying the correct amount', () => {
			bar.pay(100);
			expect(bar.tab.length).toBe(0);
		});

		it('should throw error when paying the incorrect amount', () => {
			expect(() => bar.pay(50)).toThrowError();
		});
	});
});