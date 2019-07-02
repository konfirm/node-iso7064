/* global source, describe, it, each, expect */

const ModSubject = source('Entity/Mod37_2');
const ISO7064 = source('Abstract/ISO7064');
const PureISO7064 = source('Abstract/PureISO7064');

describe('ISO7064', () => {
	describe('Mod37_2', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(ModSubject.prototype).to.be.instanceof(ISO7064);
			expect(ModSubject.prototype).to.be.instanceof(PureISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 37-2
			specification | ISO 7064, MOD 37-2
			designation   | ${2}
			modulus       | ${37}
			radix         | ${2}
			indices       | 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
			alphabet      | 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*
			double        | ${false}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(ModSubject[property]).to.equal(value);

			next();
		});

		/*  Uses unit test samples from:
		 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod1271_36Test.java
		 */

		describe('normalizes', () => {
			each`
				input           | normal
				----------------|----------
				A9999 15 000001 | A999915000001
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(ModSubject.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input         | checksum
				--------------|----------
				G123489654321 | Y
				A999915000001 | M
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(ModSubject.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input         | computed
				--------------|----------
				G123489654321 | G123489654321Y
				A999915000001 | A999915000001M
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(ModSubject.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input          | valid
				---------------|----------
				G123489654321Y | yes
				A999915000001M | yes
				G123489654322Y | no
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(ModSubject.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
