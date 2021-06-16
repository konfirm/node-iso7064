import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, PureISO7064, Mod37_2 } from '../../../source/main';

test('ISO7064/Mod37_2 - is an instance of (Pure)ISO7064', (t) => {
	t.true(Mod37_2 instanceof ISO7064, 'Mod37_2 extends ISO7064');
	t.true(Mod37_2 instanceof PureISO7064, 'Mod37_2 extends PureISO7064');

	t.end();
});

test('ISO7064/Mod37_2 - properties', (t) => {
	each`
	property      | value
	--------------|-------
	algorithm     | MOD 37-2
	specification | ISO 7064, MOD 37-2
	designation   | ${2}
	modulus       | ${37}
	radix         | ${2}
	indices       | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
	alphabet      | ${Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*')}
	double        | ${false}
`((record) => {
		const { property, value } = record as any;

		t.equal(Mod37_2[property as keyof PureISO7064], value, `has ${property} with value ${value}`);

		t.throws(() => (Mod37_2 as any)[property] = value, new RegExp(`TypeError: Cannot set property ${property}`));
	});

	t.end();
});

/*  Uses unit test samples from:
 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod1271_36Test.java
 */

test('ISO7064/Mod37_2 - normalize', (t) => {
	each`
		input           | normal
		----------------|----------
		A9999 15 000001 | A999915000001
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod37_2.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod37_2 - checksum', (t) => {
	each`
		input         | checksum
		--------------|----------
		G123489654321 | Y
		A999915000001 | M
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod37_2.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod37_2 - generate', (t) => {
	each`
		input         | computed
		--------------|----------
		G123489654321 | G123489654321Y
		A999915000001 | A999915000001M
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod37_2.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test('ISO7064/Mod37_2 - validate', (t) => {
	each`
		input          | valid
		---------------|----------
		G123489654321Y | yes
		A999915000001M | yes
		G123489654322Y | no
	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod37_2.validate(input), valid === 'yes', `validates ${input} is valid: ${valid}`);
	});

	t.end();
});
