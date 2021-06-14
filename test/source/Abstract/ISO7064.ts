import * as test from 'tape';
import each from 'template-literal-each';
import { ISO7064 } from '../../../source/main';

const instance = new ISO7064();

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
	});

	t.end();
});

test(`ISO7064 - method`, (t) => {
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
	const iso7064 = new ISO7064();
	const instance = iso7064.factory();

	t.true(instance.indices === iso7064.indices, 'inherits indices');
	t.true(instance.alphabet === iso7064.alphabet, 'inherits alphabet');
	t.true(instance.modulus === iso7064.modulus, 'inherits modulus');
	t.true(instance.radix === iso7064.radix, 'inherits radix');
	t.true(instance.double === iso7064.double, 'inherits double');

	t.end();
});

test('ISO7064 - throws if the checksum method is not implemented', (t) => {
	const instance = new ISO7064();

	t.throws(() => instance.checksum('foo'), 'Checksum method not implemented');

	t.end();
});
