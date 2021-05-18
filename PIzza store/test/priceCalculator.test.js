const priceCalculator = require('../public/javascripts/priceCalculator')

test('Should calculate size price: small', () => {
	const price = priceCalculator.calculateSizePrice('small')
	expect(price).toBe(12)
})

test('Should calculate size price: medium', () => {
	const price = priceCalculator.calculateSizePrice('medium')
	expect(price).toBe(14)
})

test('Should calculate size price: large', () => {
	const price = priceCalculator.calculateSizePrice('large')
	expect(price).toBe(20)
})

test('Should calculate crust price: regular', () => {
	const price = priceCalculator.calculateCrustPrice('regular')
	expect(price).toBe(4)
})

test('Should calculate crust price: thin', () => {
	const price = priceCalculator.calculateCrustPrice('thin')
	expect(price).toBe(6)
})

test('Should calculate crust price: deep', () => {
	const price = priceCalculator.calculateCrustPrice('deep')
	expect(price).toBe(8)
})

test('Should calculate toppings: pepperoni, anchovy, ham', () => {
	const price = priceCalculator.totalToppingsCost(['pepperoni', 'anchovy', 'ham'])
	expect(price).toBe(11)
})

test('Should calculate toppings: pepperoni, anchovy, ham, bacon, chicken', () => {
	const price = priceCalculator.totalToppingsCost(['pepperoni', 'anchovy', 'ham', 'bacon', 'chicken'])
	expect(price).toBe(19)
})

test('Should calculate subTotal: small, thin, pepperoni, anchovy, ham, 2', () => {
	const price = priceCalculator.subTotal(12, 6, 11, 2)
	expect(price).toBe(58)
})

test('Should calculate total: small, thin, pepperoni, anchovy, ham, 2', () => {
	const price = priceCalculator.total(58)
	expect(price).toBe(60.9)
})


