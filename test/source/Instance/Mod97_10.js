/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const { ISO7064, PureISO7064, Mod97_10 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Mod97_10', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(Mod97_10).to.be.instanceof(ISO7064);
			expect(Mod97_10).to.be.instanceof(PureISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 97-10
			specification | ISO 7064, MOD 97-10
			designation   | ${3}
			modulus       | ${97}
			radix         | ${10}
			indices       | ${Alphabet.from('0123456789')}
			alphabet      | ${Alphabet.from('0123456789')}
			double        | ${true}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(Mod97_10[property]).to.equal(value);

			next();
		});

		describe('normalizes', () => {
			each`
				input      | normal
				-----------|----------
				AB CD 001  | 001
				ZXY.123.57 | 12357
				ABCDEF1733 | 1733
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(Mod97_10.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input                      | checksum
				---------------------------|----------
				32142829123456987654321611 | 82
				1733                       | 40
				ABCDEF1733                 | 40
				538182357                  | 82
				001937967935               | 37
				352415823471               | 14
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(Mod97_10.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input        | computed
				-------------|----------
				1733         | 173340
				ABCDEF1733   | 173340
				abcdef1733   | 173340
				538182357    | 53818235782
				001937967935 | 00193796793537
				352415823471 | 35241582347114
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(Mod97_10.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input          | valid
				---------------|----------
				173340         | yes
				ABCDEF173340   | yes
				ABCDEF173313   | no
				abcdef173313   | no
				53818235782    | yes
				00193796793537 | yes
				35241582347114 | yes
				ABCDEF173341   | no   
				53818235781    | no  
				00193796793538 | no     
				35241582347115 | no     
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(Mod97_10.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
