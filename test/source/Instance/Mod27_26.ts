import * as test from 'tape';
import each from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, HybridISO7064, Mod27_26 } from '../../../source/main';

test('ISO7064/Mod27_26 - is an instance of (Hybrid)ISO7064', (t) => {
	t.true(Mod27_26 instanceof ISO7064);
	t.true(Mod27_26 instanceof HybridISO7064);

	t.end();
});

test('ISO7064/Mod27_26 - properties', (t) => {
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
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod27_26[property as keyof HybridISO7064], value, `has ${property} with value ${value}`);
	});

	t.end();
});

/*  Uses unit test samples from
 *  https://github.com/LiosK/cdigit/blob/master/test/mod27_26.js
 */

test('ISO7064/Mod27_26 - normalize', (t) => {
	each`
		input         | normal
		--------------|----------
		AB-CD-012-345 | ABCD
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod27_26.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod27_26 - checksum', (t) => {
	each`
		input                                | checksum
		-------------------------------------|----------
		JEJLMGJ                              | S
		MUFEMSTCATLIT                        | B
		VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBD | D
		OWNYDSZNWIBFVBRWRA                   | U
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod27_26.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod27_26 - generate', (t) => {
	each`
		input                                | computed
		-------------------------------------|----------
		JEJLMGJ                              | JEJLMGJS
		MUFEMSTCATLIT                        | MUFEMSTCATLITB
		VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBD | VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBDD
		OWNYDSZNWIBFVBRWRA                   | OWNYDSZNWIBFVBRWRAU
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod27_26.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test('ISO7064/Mod27_26 - validate', (t) => {
	each`
		input                                 | valid
		--------------------------------------|----------
		JEJLMGJS                              | yes
		JEJLMGJT                              | no
		IEJLMGJS                              | no
		MUFEMSTCATLITB                        | yes
		VAQKBDHZQDYVZIATTNETJULCDAVRMQIEKIBDD | yes
		OWNYDSZNWIBFVBRWRAU                   | yes
	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod27_26.validate(input), valid === 'yes', `${input} is valid: ${valid}`);
	});

	t.end();
});
