const { isAlcoholLegalForAge } = require('../server/alcohol');

function getLegalAlcoholAge(){
	return 18;
}

describe("Test is alcohol legal for age", () => {
	it('should return legal age for drinking', () => {
		expect(getLegalAlcoholAge()).not.toBeLessThan(18);
	});

	it("should be legal when age is 40", () => {
		const result = isAlcoholLegalForAge(40);
		expect(result).toBe(true);
	});

	it("should NOT be legal when age is 10", () => {
		const result = isAlcoholLegalForAge(10);
		expect(result).not.toBe(true)
	});

	it("should be legal when age is 18", () => {
		const result = isAlcoholLegalForAge(18);
		expect(result).toBe(true);
	});

	it("should throw error when age is negative (??)", () => {
		expect(() => isAlcoholLegalForAge(-50)).toThrowError();
	});
});