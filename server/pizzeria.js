function promiseTimeout(amount) {
	return new Promise(resolve => {
		setTimeout(resolve, amount);
	});
}

function kneadDough() {
	return promiseTimeout(2000)
		.then(() => console.log('Dough is kneaded'));
}

async function rollDough() {
	await promiseTimeout(1500);
	console.log('Dough is rolled');
	return new Date().getTime();
}

function spreadTomatoSauce() {
	return promiseTimeout(1000)
		.then(() => console.log('Tomato sauce is spread'));

}

function spreadCheese() {
	return promiseTimeout(2000)
		.then(() => console.log('Cheese is spread'));

}

function spreadMushrooms() {
	return promiseTimeout(2500)
		.then(() => console.log('Mushrooms are spread'));

}

async function bakePizza() {
	await promiseTimeout(3000);
	console.log('Pizza is baked');
	return new Date().getTime();
}

async function makePizza() {
	await kneadDough();
	const startTime = await rollDough();
	await spreadTomatoSauce();
	await spreadCheese();
	await spreadMushrooms();
	const endTime = await bakePizza();
	console.log('Pizza is done!');
	return endTime - startTime;
}

(async () => {
	console.log(await makePizza());
	console.log(await makePizza());
	console.log(await makePizza());
	console.log(await makePizza());
})();


