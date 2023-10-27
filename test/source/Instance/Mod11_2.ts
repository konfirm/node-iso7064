import * as test from 'tape';
import { each } from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, PureISO7064, Mod11_2 } from '../../../source/main';

test('ISO7064/Mod11_2 - is an instance of (Pure)ISO7064', (t) => {
	t.true(Mod11_2 instanceof ISO7064);
	t.true(Mod11_2 instanceof PureISO7064);

	t.end();
});

test('ISO7064/Mod11_2 - properties', (t) => {
	each`
		property      | value
		--------------|-------
		algorithm     | MOD 11-2
		specification | ISO 7064, MOD 11-2
		designation   | ${1}
		modulus       | ${11}
		radix         | ${2}
		indices       | ${Alphabet.from('0123456789')}
		alphabet      | ${Alphabet.from('0123456789X')}
		double        | ${false}
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod11_2[property as keyof typeof Mod11_2], value, `has property ${property} with value ${value}`);

		t.throws(() => (Mod11_2 as any)[property] = value, new RegExp(`TypeError: Cannot set property ${property}`));
	});

	t.end();
});

/*  Uses unit test samples from:
 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod11_2Test.java
 *  https://github.com/LiosK/cdigit/blob/master/test/mod11_2.js
 */

test('ISO7064/Mod11_2 - normalize', (t) => {
	each`
		input              | normal
		-------------------|----------
		0000-0002-1825-009 | 000000021825009
		0000-0002-9079-593 | 000000029079593
		ABCD747633         | 747633
		418.12.925         | 41812925
		17780-4390         | 177804390
		82-00-10-7028943   | 8200107028943
		98-25-46           | 982546
	`((record) => {
		const { input, normal } = record as any;

		t.equal(Mod11_2.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod11_2 - checksum', (t) => {
	each`
		input           | checksum
		----------------|----------
		000000021825009 | 7
		000000029079593 | X
		079             | X
		0794            | 0
		001175717748247 | 6
		747633          | 6
		734404529805608 | 0
		41812925        | 9
		986596515101003 | X
		177804390       | 4
		899952          | 6
		8200107028943   | 6
		6583491086272   | 6
		118344415502    | 1
		982546          | 4
		000194585       | 9
		82703512512057  | X
		4338            | 6
		007763161148    | 8
		790830359455    | 0
		4731722270      | 0
		000088486619034 | 0
	`((record) => {
		const { input, checksum } = record as any;
		t.equal(Mod11_2.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod11_2 - generate', (t) => {
	each`
	input           | computed
	----------------|----------
	000000021825009 | 0000000218250097
	000000029079593 | 000000029079593X
	079             | 079X
	0794            | 07940
	001175717748247 | 0011757177482476
	747633          | 7476336
	734404529805608 | 7344045298056080
	41812925        | 418129259
	986596515101003 | 986596515101003X
	177804390       | 1778043904
	899952          | 8999526
	8200107028943   | 82001070289436
	6583491086272   | 65834910862726
	118344415502    | 1183444155021
	982546          | 9825464
	000194585       | 0001945859
	82703512512057  | 82703512512057X
	4338            | 43386
	007763161148    | 0077631611488
	790830359455    | 7908303594550
	4731722270      | 47317222700
	000088486619034 | 0000884866190340
`((record) => {
		const { input, computed } = record as any;
		t.equal(Mod11_2.generate(input), computed, `input "${input}" generates "${computed}"`);
	});

	t.end();
});

test('ISO7064/Mod11_2 - validates ${input} is valid: ${valid}', (t) => {
	each`
		input            | valid
		-----------------|-------
		0000000218250097 | yes
		000000029079593X | yes
		079X             | yes
		07940            | yes
		0011757177482476 | yes
		7476336          | yes
		7344045298056080 | yes
		418129259        | yes
		986596515101003X | yes
		1778043904       | yes
		8999526          | yes
		82001070289436   | yes
		65834910862726   | yes
		1183444155021    | yes
		9825464          | yes
		0001945859       | yes
		82703512512057X  | yes
		43386            | yes
		0077631611488    | yes
		7908303594550    | yes
		47317222700      | yes
		0000884866190340 | yes
		A                | no
		1                | no
		08940            | no
		089X             | no
	`((record) => {
		const { input, valid } = record as any;
		t.equal(Mod11_2.validate(input), valid === 'yes', `${input} is valid: ${valid}`);
	});

	t.end();
});

test('ISO7064/Mod11_2 - factory derived instance', (t) => {
	const alphabet = Alphabet.from('0123456789XYZ');
	const custom = Mod11_2.factory({ alphabet });

	t.equal(custom.algorithm, 'Custom', 'algorithm is "Custom"');
	t.equal(custom.specification, 'ISO 7064, Custom', 'specification is "ISO 7064, Custom"');
	t.equal(custom.designation, 0, 'desgnation is 0');

	t.equal(custom.modulus, Mod11_2.modulus, 'property modulus is inherited');
	t.equal(custom.radix, Mod11_2.radix, 'property radix is inherited');
	t.equal(custom.double, Mod11_2.double, 'property double is inherited');

	t.equal(custom.indices, Mod11_2.indices, 'property indices is inherited');
	t.notEqual(custom.alphabet, Mod11_2.alphabet, 'property alphabet is not inherited');
	t.equal(custom.alphabet, alphabet, 'property alphabet is the given one');

	t.end();
});
