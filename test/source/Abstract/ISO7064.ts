import * as test from 'tape';
import each from 'template-literal-each';
import { ISO7064 } from '../../../main';

const instance = new ISO7064();

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
	test(`ISO7064 - has property ${property} with value ${value}`, (t) => {
		t.true(property in instance);
		t.equal(instance[property as keyof ISO7064], value);

		t.end();
	});
});

each`
	method
	-------
	normalize
	checksum
	validate
	generate
`((record) => {
	const { method } = record as any;
	test(`ISO7064 - has method ${method}`, (t) => {
		t.true(method in instance);
		t.equal(typeof instance[method as keyof ISO7064], 'function');

		t.end();
	});
});


test('ISO7064 - throws if the checksum method is not implemented', (t) => {
	const instance = new ISO7064();

	t.throws(() => instance.checksum('foo'), 'Checksum method not implemented');

	t.end();
});
