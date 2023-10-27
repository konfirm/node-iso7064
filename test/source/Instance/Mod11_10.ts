import * as test from 'tape';
import { each } from 'template-literal-each';
import { Alphabet } from '@konfirm/alphabet';
import { ISO7064, HybridISO7064, Mod11_10 } from '../../../source/main';

test('ISO7064/Mod11_10 - is an instance of (Hybrid)ISO7064', (t) => {
	t.true(Mod11_10 instanceof ISO7064, 'Mod11_10 extends ISO7064');
	t.true(Mod11_10 instanceof HybridISO7064, 'Mod11_10 extends HybridISO7064');

	t.end();
});

test('ISO7064/Mod11_10 - properties', (t) => {
	each`
		property      | value
		--------------|-------
		algorithm     | MOD 11,10
		specification | ISO 7064, MOD 11,10
		designation   | ${6}
		modulus       | ${10}
		radix         | ${undefined}
		indices       | ${Alphabet.from('0123456789')}
		alphabet      | ${Alphabet.from('0123456789')}
		double        | ${false}
	`((record) => {
		const { property, value } = record as any;

		t.equal(Mod11_10[property as keyof HybridISO7064], value, `has property ${property} with value ${value}`);

		t.throws(() => (Mod11_10 as any)[property] = value, new RegExp(`TypeError: Cannot set property ${property}`));
	});

	t.end();
});

/*  Uses unit test samples from
 *  https://github.com/LiosK/cdigit/blob/master/test/mod11_10.js
 */

test('ISO7064/Mod11_10 - normalize', (t) => {
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

		t.equal(Mod11_10.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});

test('ISO7064/Mod11_10 - checksum', (t) => {
	each`
		input                                            | checksum
		-------------------------------------------------|----------
		079                                              | 2
		0794                                             | 5
		6511224300430482                                 | 7
		53266878780357001264776215687313785128868        | 4
		003                                              | 2
		7846306445607555258161616166                     | 2
		861543053353545631188671371628487317133258177413 | 0
		4555773880                                       | 8
		05320162033                                      | 8
		71065204127183146616272676714658212652753        | 4
		4716                                             | 6
		68058451423857734108017363773364282850032        | 1
		4674678664653                                    | 1
		42328026                                         | 0
		500300224343584662684600506004225567445126724117 | 5
		65428072048156805364127530485864402163255        | 9
		308655184386                                     | 3
		4317754156343048540758528678637685134            | 4
		4600034236774                                    | 1
		1385812104511745558672550524138724810            | 9
		1563104756864506624875436082452546036618466424   | 6
		71660618558507745431171460                       | 5
		3676012560274058125725682603573122447174631135   | 4
		853                                              | 7
	`((record) => {
		const { input, checksum } = record as any;

		t.equal(Mod11_10.checksum(input), checksum, `input ${input} has checksum ${checksum}`);
	});

	t.end();
});

test('ISO7064/Mod11_10 - generate', (t) => {
	each`
		input                                            | computed
		-------------------------------------------------|----------
		0794                                             | 07945
		6511224300430482                                 | 65112243004304827
		53266878780357001264776215687313785128868        | 532668787803570012647762156873137851288684
		003                                              | 0032
		7846306445607555258161616166                     | 78463064456075552581616161662
		861543053353545631188671371628487317133258177413 | 8615430533535456311886713716284873171332581774130
		4555773880                                       | 45557738808
		05320162033                                      | 053201620338
		71065204127183146616272676714658212652753        | 710652041271831466162726767146582126527534
		4716                                             | 47166
		68058451423857734108017363773364282850032        | 680584514238577341080173637733642828500321
		4674678664653                                    | 46746786646531
		42328026                                         | 423280260
		500300224343584662684600506004225567445126724117 | 5003002243435846626846005060042255674451267241175
		65428072048156805364127530485864402163255        | 654280720481568053641275304858644021632559
		308655184386                                     | 3086551843863
		4317754156343048540758528678637685134            | 43177541563430485407585286786376851344
		4600034236774                                    | 46000342367741
		1385812104511745558672550524138724810            | 13858121045117455586725505241387248109
		1563104756864506624875436082452546036618466424   | 15631047568645066248754360824525460366184664246
		71660618558507745431171460                       | 716606185585077454311714605
		3676012560274058125725682603573122447174631135   | 36760125602740581257256826035731224471746311354
		853                                              | 8537
	`((record) => {
		const { input, computed } = record as any;

		t.equal(Mod11_10.generate(input), computed, `generates ${computed} for ${input}`);
	});

	t.end();
});

test('ISO7064/Mod11_10 - validate', (t) => {
	each`
		input                                             | valid
		--------------------------------------------------|----------
		07945                                             | yes
		17945                                             | no
		07944                                             | no
		65112243004304827                                 | yes
		532668787803570012647762156873137851288684        | yes
		0032                                              | yes
		78463064456075552581616161662                     | yes
		8615430533535456311886713716284873171332581774130 | yes
		45557738808                                       | yes
		053201620338                                      | yes
		710652041271831466162726767146582126527534        | yes
		47166                                             | yes
		680584514238577341080173637733642828500321        | yes
		46746786646531                                    | yes
		423280260                                         | yes
		5003002243435846626846005060042255674451267241175 | yes
		654280720481568053641275304858644021632559        | yes
		3086551843863                                     | yes
		43177541563430485407585286786376851344            | yes
		46000342367741                                    | yes
		13858121045117455586725505241387248109            | yes
		15631047568645066248754360824525460366184664246   | yes
		716606185585077454311714605                       | yes
		36760125602740581257256826035731224471746311354   | yes
		8537                                              | yes

	`((record) => {
		const { input, valid } = record as any;

		t.equal(Mod11_10.validate(input), valid === 'yes', `${input} is valid: ${valid}`);
	});

	t.end();
});

test('ISO7064/Mod11_10 - factory new instance', (t) => {
	const indices = Alphabet.from('012345');
	const custom = Mod11_10.factory({ indices });

	t.equal(custom.algorithm, 'Custom', 'algorithm is "Custom"');
	t.equal(custom.specification, 'ISO 7064, Custom', 'specification is "ISO 7064, Custom"');
	t.equal(custom.designation, 0, 'designation is 0');

	t.equal(custom.modulus, Mod11_10.modulus, 'modulus is inherited');
	t.equal(custom.radix, Mod11_10.radix, 'radix is inherited');
	t.equal(custom.double, Mod11_10.double, 'double is inherited');

	t.notEqual(custom.indices, Mod11_10.indices, 'indices is not inherited');
	t.equal(custom.indices, indices, 'indices is the given one');
	t.equal(custom.alphabet, Mod11_10.alphabet, 'alphabet is inherited');

	t.end();
});
