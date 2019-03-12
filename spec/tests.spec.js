describe("Test boolean on variable", () => {
	let a;

	it("should be true", () => {
		a = true;

		expect(a).toBe(true);
	});

	it("should be false", () => {
		a = false;

		expect(a).toBe(false);
	});
});