/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const { ISO7064, PureISO7064, Mod1271_36 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Mod1271_36', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(Mod1271_36).to.be.instanceof(ISO7064);
			expect(Mod1271_36).to.be.instanceof(PureISO7064);

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
			indices       | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			alphabet      | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*')}
			double        | ${true}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(Mod1271_36[property]).to.equal(value);

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
				expect(Mod1271_36.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input | checksum
				------|----------
				ISO79 | 3W
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(Mod1271_36.checksum(input)).to.equal(checksum);

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
				expect(Mod1271_36.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input   | valid
				--------|----------
				ISO793W | yes
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(Mod1271_36.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
