import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, PureISO7064, Mod1271_36 } from '../../../source/main';

test('ISO7064/Mod1271_36 - is an instance of (Pure)ISO7064', (t) => {
	t.true(Mod1271_36 instanceof ISO7064, 'Mod1271_36 extends ISO7064');
	t.true(Mod1271_36 instanceof PureISO7064, 'Mod1271_36 extends PureISO7064');

	t.end()
});

test('ISO7064/Mod1271_36 - properties', (t) => {
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
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod1271_36[property as keyof PureISO7064], value, `has ${property} with value ${value}`);
	});

	t.end()
});

/*  Uses unit test samples from:
 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod1271_36Test.java
 */

test('ISO7064/Mod1271_36 - normalize', (t) => {
	each`
		input      | normal
		-----------|----------
		AB CD 001  | ABCD001
		ZXY.123.57 | ZXY12357
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod1271_36.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end()
});

test('ISO7064/Mod1271_36 - checksum', (t) => {
	each`
		input | checksum
		------|----------
		ISO79 | 3W
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod1271_36.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end()
});

test('ISO7064/Mod1271_36 - generate', (t) => {
	each`
		input | computed
		------|----------
		ISO79 | ISO793W
		iso79 | ISO793W
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod1271_36.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end()
});

test('ISO7064/Mod1271_36 - validate', (t) => {
	each`
		input   | valid
		--------|----------
		ISO793W | yes
	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod1271_36.validate(input), valid === 'yes', `${input} is valid: ${valid}`);
	});

	t.end()
});
