import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, PureISO7064, Mod97_10 } from '../../../main';

test('ISO7064/Mod97_10 - is an instance of (Pure)ISO7064', (t) => {
	t.true(Mod97_10 instanceof ISO7064, 'Mod97_10 extends ISO7064');
	t.true(Mod97_10 instanceof PureISO7064, 'Mod97_10 extends PureISO7064');

	t.end();
});

test('ISO7064/Mod97_10 - properties', (t) => {
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
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod97_10[property as keyof PureISO7064], value, `has ${property} with value ${value}`);
	});

	t.end();
});

test('ISO7064/Mod97_10 - normalize', (t) => {
	each`
		input      | normal
		-----------|----------
		AB CD 001  | 001
		ZXY.123.57 | 12357
		ABCDEF1733 | 1733
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod97_10.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod97_10 - checksum', (t) => {
	each`
		input                      | checksum
		---------------------------|----------
		32142829123456987654321611 | 82
		1733                       | 40
		ABCDEF1733                 | 40
		538182357                  | 82
		001937967935               | 37
		352415823471               | 14
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod97_10.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod97_10 - generate', (t) => {
	each`
		input        | computed
		-------------|----------
		1733         | 173340
		ABCDEF1733   | 173340
		abcdef1733   | 173340
		538182357    | 53818235782
		001937967935 | 00193796793537
		352415823471 | 35241582347114
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod97_10.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test(`ISO7064/Mod97_10 - validate`, (t) => {
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
	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod97_10.validate(input), valid === 'yes', `validates ${input} is valid: ${valid}`);
	});

	t.end();
});
