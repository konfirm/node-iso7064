/* global source, describe, it, each, expect */

const { ISO7064 } = require('../../../main.js');

describe('ISO7064', () => {
	const instance = new ISO7064();

	each`
		property      | available | value
		--------------|-----------|-------
		algorithm     | yes       | Custom
		specification | yes       | ISO 7064, Custom
		designation   | yes       | ${0}
		modulus       | yes       | ${undefined}
		radix         | yes       | ${undefined}
		indices       | yes       | ${undefined}
		alphabet      | yes       | ${undefined}
		double        | yes       | ${false}
	`(
		'has $property available $available with value $value',
		({ property, available, value }, next) => {
			expect(property in instance).to.equal(available === 'yes');
			expect(instance[property]).to.equal(value);

			next();
		}
	);

	each`
		method
		-------
		normalize
		checksum
		validate
		generate
	`('has method $method', ({ method }, next) => {
		expect(method in instance).to.be.true();
		expect(instance[method]).to.be.function();

		next();
	});

	it('throws if the checksum method is not implemented', (next) => {
		const instance = new ISO7064();

		expect(() => instance.checksum('foo')).to.throw(
			'Checksum method not implemented'
		);

		next();
	});
});
