/* global source, describe, it, each, expect */

const ISO7064 = source('Abstract/ISO7064');

describe('ISO7064', () => {
	each`
		property      | available | value
		--------------|-----------|-------
		algorithm     | yes       | ${undefined}
		specification | yes       | ${undefined}
		designation   | yes       | ${0}
		modulus       | yes       | ${undefined}
		radix         | no        | ${undefined}
		indices       | yes       | ${undefined}
		alphabet      | yes       | ${undefined}
		double        | yes       | ${false}
	`(
		'has $property available $available with value $value',
		({ property, available, value }, next) => {
			expect(property in ISO7064).to.equal(available === 'yes');
			expect(ISO7064[property]).to.equal(value);

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
		expect(method in ISO7064).to.be.true();
		expect(ISO7064[method]).to.be.function();

		next();
	});
});
