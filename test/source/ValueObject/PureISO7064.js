/* global source, describe, it, each, expect */

const { ISO7064, PureISO7064 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Pure', () => {
		const instance = new PureISO7064();

		it('is an instance of ISO7064', (next) => {
			expect(PureISO7064.prototype).to.be.instanceof(ISO7064);
			expect(instance).to.be.instanceof(ISO7064);

			next();
		});

		each`
			property      | available | value
			--------------|-----------|-------
			algorithm     | yes       | Custom
			specification | yes       | ISO 7064, Custom
			designation   | yes       | ${0}
			modulus       | yes       | ${undefined}
			radix         | yes       | ${2}
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
			expect(instance[method]).to.be.function();

			next();
		});
	});
});
