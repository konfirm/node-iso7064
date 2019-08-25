/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const ModSubject = source('Entity/Mod27_26');
const ISO7064 = source('Abstract/ISO7064');
const HybridISO7064 = source('Abstract/HybridISO7064');

describe('ISO7064', () => {
	describe('Mod27_26', () => {
		it('is an instance of (Hybrid)ISO7064', (next) => {
			expect(ModSubject.prototype).to.be.instanceof(ISO7064);
			expect(ModSubject.prototype).to.be.instanceof(HybridISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 27,26
			specification | ISO 7064, MOD 27,26
			designation   | ${7}
			modulus       | ${26}
			radix         | ${undefined}
			indices       | ${Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			alphabet      | ${Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			double        | ${false}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(ModSubject[property]).to.equal(value);

			next();
		});

		/*  Uses unit test samples from
		 *  https://github.com/LiosK/cdigit/blob/master/test/mod27_26.js
		 */

		describe('normalizes', () => {
			each`
				input         | normal
				--------------|----------
				AB-CD-012-345 | ABCD
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(ModSubject.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input                                | checksum
				-------------------------------------|----------
				JEJLMGJ                              | S
				MUFEMSTCATLIT                        | B
				VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBD | D
				OWNYDSZNWIBFVBRWRA                   | U
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(ModSubject.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input                                | computed
				-------------------------------------|----------
				JEJLMGJ                              | JEJLMGJS
				MUFEMSTCATLIT                        | MUFEMSTCATLITB
				VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBD | VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBDD
				OWNYDSZNWIBFVBRWRA                   | OWNYDSZNWIBFVBRWRAU
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(ModSubject.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input                                 | valid
				--------------------------------------|----------
				JEJLMGJS                              | yes
				JEJLMGJT                              | no
				IEJLMGJS                              | no
				MUFEMSTCATLITB                        | yes
				VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBDD | yes
				OWNYDSZNWIBFVBRWRAU                   | yes
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(ModSubject.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
