import * as test from 'tape';
import { each } from 'template-literal-each';
import { ISO7064 } from '../../../source/main';

class Wrapper extends ISO7064 { }

const instance = new Wrapper();

test('ISO7064 - properties', (t) => {
	each`
		property      | value
		--------------|-------
		algorithm     | Custom
		specification | ISO 7064, Custom
		designation   | ${0}
		modulus       | ${undefined}
		radix         | ${undefined}
		indices       | ${undefined}
		alphabet      | ${undefined}
		double        | ${false}
	`((record) => {
		const { property, value } = record as any;

		t.true(property in instance, `property ${property} exists`);
		t.equal(instance[property as keyof ISO7064], value, `property ${property} is ${JSON.stringify(value)}`);

		t.throws(() => (instance as any)[property] = value, new RegExp(`TypeError: Cannot set property ${property}`));
	});

	t.end();
});

test('ISO7064 - method', (t) => {
	each`
		method
		-------
		normalize
		checksum
		validate
		generate
	`((record) => {
		const { method } = record as any;

		t.equal(typeof instance[method as keyof ISO7064], 'function', `has method ${method}`);
	});

	t.end();
});

test('ISO7064 - factory', (t) => {
	const iso7064 = new Wrapper();
	const instance = iso7064.factory();

	t.true(instance.indices === iso7064.indices, 'inherits indices');
	t.true(instance.alphabet === iso7064.alphabet, 'inherits alphabet');
	t.true(instance.modulus === iso7064.modulus, 'inherits modulus');
	t.true(instance.radix === iso7064.radix, 'inherits radix');
	t.true(instance.double === iso7064.double, 'inherits double');

	t.end();
});

test('ISO7064 - throws if the checksum method is not implemented', (t) => {
	const instance = new Wrapper();

	t.throws(() => instance.checksum('foo'), 'Checksum method not implemented');

	t.end();
});

test('ISO7064 - normalization fails if there are no indices', (t) => {
	const instance = new Wrapper();

	each`
		input              | normal
		-------------------|----------
		0000-0002-1825-009 | 000000021825009
		0000-0002-9079-593 | 000000029079593
		ABCD747633         | ABCD747633
		ef.gh-1234         | EFGH1234
		418.12.925         | 41812925
		17780-4390         | 177804390
		82-00-10-7028943   | 8200107028943
		98-25-46           | 982546
	`((record) => {
		const { input, normal } = record as any;

		t.equal(instance.normalize(input), normal, `input ${input} is normalized into ${normal}`);
	});

	t.end();
});
