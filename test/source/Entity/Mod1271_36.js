/* global source, describe, it, each, expect */

const ModSubject = source('Entity/Mod1271_36');
const ISO7064 = source('Abstract/ISO7064');
const PureISO7064 = source('Abstract/PureISO7064');

describe('ISO7064', () => {
	describe('Mod1271_36', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(ModSubject.prototype).to.be.instanceof(ISO7064);
			expect(ModSubject.prototype).to.be.instanceof(PureISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 1271-36
			specification | ISO 7064, MOD 1271-36
			designation   | ${5}
			modulus       | ${1271}
			radix         | ${36}
			indices       | 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ
			alphabet      | 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*
			double        | ${true}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(ModSubject[property]).to.equal(value);

			next();
		});

		/*  Uses unit test samples from:
		 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod1271_36Test.java
		 */

		describe('normalizes', () => {
			each`
				input      | normal
				-----------|----------
				AB CD 001  | ABCD001
				ZXY.123.57 | ZXY12357
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(ModSubject.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input | checksum
				------|----------
				ISO79 | 3W
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(ModSubject.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input | computed
				------|----------
				ISO79 | ISO793W
				iso79 | ISO793W
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(ModSubject.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input   | valid
				--------|----------
				ISO793W | yes
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(ModSubject.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
