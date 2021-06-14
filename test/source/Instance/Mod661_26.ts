/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const { ISO7064, PureISO7064, Mod661_26 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Mod661_26', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(Mod661_26).to.be.instanceof(ISO7064);
			expect(Mod661_26).to.be.instanceof(PureISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 661-26
			specification | ISO 7064, MOD 661-26
			designation   | ${4}
			modulus       | ${661}
			radix         | ${26}
			indices       | ${Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			alphabet      | ${Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			double        | ${true}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(Mod661_26[property]).to.equal(value);

			next();
		});

		describe('normalizes', () => {
			each`
				input      | normal
				-----------|----------
				AB CD 001  | ABCD
				ZXY.123.57 | ZXY
				ABCDEF1733 | ABCDEF
				ab cd 001  | ABCD
				zxy.123.57 | ZXY
				abcdef1733 | ABCDEF
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(Mod661_26.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input                  | checksum
				-----------------------|----------
				XKFSHTWWCOMYYASPSYTHJW | CJ
				xkfshtwwcomyyaspsythjw | CJ
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(Mod661_26.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input                  | computed
				-----------------------|----------
				XKFSHTWWCOMYYASPSYTHJW | XKFSHTWWCOMYYASPSYTHJWCJ
				xkfshtwwcomyyaspsythjw | XKFSHTWWCOMYYASPSYTHJWCJ
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(Mod661_26.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input                    | valid
				-------------------------|----------
				XKFSHTWWCOMYYASPSYTHJWCJ | yes
				XKFSHTWWCOMYYASPSYTHJWCI | no
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(Mod661_26.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
