/* global source, describe, it, each, expect */

const { ISO7064, HybridISO7064, Mod11_2 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Hybrid', () => {
		const instance = new HybridISO7064();

		it('is an instance of ISO7064', (next) => {
			expect(HybridISO7064.prototype).to.be.instanceof(ISO7064);
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
			expect(instance[method]).to.be.function();

			next();
		});
	});
});
