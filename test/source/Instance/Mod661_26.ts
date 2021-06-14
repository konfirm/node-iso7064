import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, PureISO7064, Mod661_26 } from '../../../source/main';

test('ISO7064/Mod661_26 - is an instance of (Pure)ISO7064', (t) => {
	t.true(Mod661_26 instanceof ISO7064, 'Mod661_26 extends ISO7064');
	t.true(Mod661_26 instanceof PureISO7064, 'Mod661_26 extends PureISO7064');

	t.end();
});

test('ISO7064/Mod661_26 - properties', (t) => {
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
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod661_26[property as keyof PureISO7064], value, `has ${property} with value ${value}`);
	});

	t.end();
});


test('ISO7064/Mod661_26 - normalize', (t) => {
	each`
		input      | normal
		-----------|----------
		AB CD 001  | ABCD
		ZXY.123.57 | ZXY
		ABCDEF1733 | ABCDEF
		ab cd 001  | ABCD
		zxy.123.57 | ZXY
		abcdef1733 | ABCDEF
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod661_26.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod661_26 - checksum', (t) => {
	each`
		input                  | checksum
		-----------------------|----------
		XKFSHTWWCOMYYASPSYTHJW | CJ
		xkfshtwwcomyyaspsythjw | CJ
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod661_26.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod661_26 - generate', (t) => {
	each`
		input                  | computed
		-----------------------|----------
		XKFSHTWWCOMYYASPSYTHJW | XKFSHTWWCOMYYASPSYTHJWCJ
		xkfshtwwcomyyaspsythjw | XKFSHTWWCOMYYASPSYTHJWCJ
	`((record) => {
		const { input, computed } = record as any;
		t.equal(Mod661_26.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test('ISO7064/Mod661_26 - validate', (t) => {
	each`
	input                    | valid
	-------------------------|----------
	XKFSHTWWCOMYYASPSYTHJWCJ | yes
	XKFSHTWWCOMYYASPSYTHJWCI | no
`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod661_26.validate(input), valid === 'yes', `validates ${input} is valid: ${valid}`);
	});

	t.end();
});
