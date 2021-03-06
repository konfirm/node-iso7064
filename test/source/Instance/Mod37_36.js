/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const { ISO7064, HybridISO7064, Mod37_36 } = require('../../../main.js');

describe('ISO7064', () => {
	describe('Mod37_36', () => {
		it('is an instance of (Hybrid)ISO7064', (next) => {
			expect(Mod37_36).to.be.instanceof(ISO7064);
			expect(Mod37_36).to.be.instanceof(HybridISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 37,36
			specification | ISO 7064, MOD 37,36
			designation   | ${8}
			modulus       | ${36}
			radix         | ${undefined}
			indices       | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			alphabet      | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
			double        | ${false}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(Mod37_36[property]).to.equal(value);

			next();
		});

		/*  Uses unit test samples from:
		 *  https://github.com/LiosK/cdigit/blob/master/test/mod37_36.js
		 */

		describe('normalizes', () => {
			each`
				input                           | normal
				--------------------------------|----------
				A1-2425G-ABC1234002             | A12425GABC1234002
				RA BD                           | RABD
				X.0.H                           | X0H
				B7-Q3-SF-tush2q-N7BI-XBPM-NZ-AM | B7Q3SFTUSH2QN7BIXBPMNZAM
				T/BR                            | TBR
				EF.WW03 2G2+TI                  | EFWW032G2TI
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(Mod37_36.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input                                           | checksum
				------------------------------------------------|----------
				A12425GABC1234002                               | M
				RABD                                            | A
				X0H                                             | X
				B7Q3SFTUSH2QN7BIXBPMNZAM                        | I
				UFSYYJO9FCID766EJYAEINTG43UZDD84MT6ZUDH08OM4N1K | N
				ROYL38YZ9TDGPNB5MT40CEWGURAOKF07XEYTV3M         | 6
				TBR                                             | 1
				EFWW032G2TI                                     | U
				9                                               | J
				B3739U6CR                                       | K
				H0DJFUS8HHGZNEE9H6ZWW                           | O
				C8AWF5G0CE8U9VTKSPPS2JAP09ZFEGFEAV              | L
				OW                                              | N
				TRO                                             | D
				1M                                              | Q
				FLFOWRIBFCNWNMNFVKAJVS7REUS2L                   | 2
				7LI6P5WTF2JHU                                   | U
				KUHNOF8OA1NXCW                                  | A
				KV0MFQXMAL4W5ICNH                               | P
				MM61BF7H6C2O86NNMW8ZY8V                         | 8
				WP8Z0                                           | 9
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(Mod37_36.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input                                           | computed
				------------------------------------------------|----------
				RABD                                            | RABDA
				X0H                                             | X0HX
				B7Q3SFTUSH2QN7BIXBPMNZAM                        | B7Q3SFTUSH2QN7BIXBPMNZAMI
				UFSYYJO9FCID766EJYAEINTG43UZDD84MT6ZUDH08OM4N1K | UFSYYJO9FCID766EJYAEINTG43UZDD84MT6ZUDH08OM4N1KN
				ROYL38YZ9TDGPNB5MT40CEWGURAOKF07XEYTV3M         | ROYL38YZ9TDGPNB5MT40CEWGURAOKF07XEYTV3M6
				TBR                                             | TBR1
				EFWW032G2TI                                     | EFWW032G2TIU
				9                                               | 9J
				B3739U6CR                                       | B3739U6CRK
				H0DJFUS8HHGZNEE9H6ZWW                           | H0DJFUS8HHGZNEE9H6ZWWO
				C8AWF5G0CE8U9VTKSPPS2JAP09ZFEGFEAV              | C8AWF5G0CE8U9VTKSPPS2JAP09ZFEGFEAVL
				OW                                              | OWN
				TRO                                             | TROD
				1M                                              | 1MQ
				FLFOWRIBFCNWNMNFVKAJVS7REUS2L                   | FLFOWRIBFCNWNMNFVKAJVS7REUS2L2
				7LI6P5WTF2JHU                                   | 7LI6P5WTF2JHUU
				KUHNOF8OA1NXCW                                  | KUHNOF8OA1NXCWA
				KV0MFQXMAL4W5ICNH                               | KV0MFQXMAL4W5ICNHP
				MM61BF7H6C2O86NNMW8ZY8V                         | MM61BF7H6C2O86NNMW8ZY8V8
				WP8Z0                                           | WP8Z09
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(Mod37_36.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input                                            | valid
				-------------------------------------------------|----------
				RABDA                                            | yes
				X0HX                                             | yes
				B7Q3SFTUSH2QN7BIXBPMNZAMI                        | yes
				ra bda                                           | yes
				x.0.h.x                                          | yes
				b7q3-sftu-sh2q-n7bi-xbpm-nza-mi                  | yes
				UFSYYJO9FCID766EJYAEINTG43UZDD84MT6ZUDH08OM4N1KN | yes
				ROYL38YZ9TDGPNB5MT40CEWGURAOKF07XEYTV3M6         | yes
				TBR1                                             | yes
				EFWW032G2TIU                                     | yes
				9J                                               | yes
				B3739U6CRK                                       | yes
				H0DJFUS8HHGZNEE9H6ZWWO                           | yes
				C8AWF5G0CE8U9VTKSPPS2JAP09ZFEGFEAVL              | yes
				OWN                                              | yes
				TROD                                             | yes
				1MQ                                              | yes
				FLFOWRIBFCNWNMNFVKAJVS7REUS2L2                   | yes
				7LI6P5WTF2JHUU                                   | yes
				KUHNOF8OA1NXCWA                                  | yes
				KV0MFQXMAL4W5ICNHP                               | yes
				MM61BF7H6C2O86NNMW8ZY8V8                         | yes
				WP8Z09                                           | yes
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(Mod37_36.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
