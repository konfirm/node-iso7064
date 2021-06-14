import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, HybridISO7064, Mod37_36 } from '../../../main';

test('ISO7064/Mod37_36 - is an instance of (Hybrid)ISO7064', (t) => {
	t.true(Mod37_36 instanceof ISO7064, 'Mod37_36 extends ISO7064');
	t.true(Mod37_36 instanceof HybridISO7064, 'Mod37_36 extends HybridISO7064');

	t.end();
});

test('ISO7064/Mod37_36 - properties', (t) => {
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
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod37_36[property as keyof HybridISO7064], value, `has ${property} with value ${value}`);
	});

	t.end();
});

/*  Uses unit test samples from:
 *  https://github.com/LiosK/cdigit/blob/master/test/mod37_36.js
 */

test(`ISO7064/Mod37_36 - normalize`, (t) => {
	each`
		input                           | normal
		--------------------------------|----------
		A1-2425G-ABC1234002             | A12425GABC1234002
		RA BD                           | RABD
		X.0.H                           | X0H
		B7-Q3-SF-tush2q-N7BI-XBPM-NZ-AM | B7Q3SFTUSH2QN7BIXBPMNZAM
		T/BR                            | TBR
		EF.WW03 2G2+TI                  | EFWW032G2TI
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod37_36.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod37_36 - checksum', (t) => {
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
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod37_36.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod37_36 - generate', (t) => {
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
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod37_36.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test('ISO7064/Mod37_36 - validate', (t) => {
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
	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod37_36.validate(input), valid === 'yes', `${input} is valid: ${valid}`);
	});

	t.end();
});
