import * as test from 'tape';
import each from 'template-literal-each';
import { ISO7064, PureISO7064 } from '../../../main';

const instance = new PureISO7064();

test('ISO7064/Pure - is an instance of ISO7064', (t) => {
	t.true(PureISO7064.prototype instanceof ISO7064);
	t.true(instance instanceof ISO7064);

	t.end();
});

each`
	property      | value
	--------------|-------
	algorithm     | Custom
	specification | ISO 7064, Custom
	designation   | ${0}
	modulus       | ${undefined}
	radix         | ${2}
	indices       | ${undefined}
	alphabet      | ${undefined}
	double        | ${false}
`((record) => {
	const { property, value } = record as any;
	test(`ISO7064/Pure - has property ${property} with value ${value}`, (t) => {
		t.true(property in instance);
		t.equal(instance[property as keyof PureISO7064], value);

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
	test(`ISO7064/Pure - has method ${method}`, (t) => {
		t.equal(typeof instance[method as keyof PureISO7064], 'function');

		t.end();
	});
})
