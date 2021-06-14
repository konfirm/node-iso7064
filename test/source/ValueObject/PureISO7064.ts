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
	property      | available | value
	--------------|-----------|-------
	algorithm     | yes       | Custom
	specification | yes       | ISO 7064, Custom
	designation   | yes       | ${0}
	modulus       | yes       | ${undefined}
	radix         | yes       | ${2}
	indices       | yes       | ${undefined}
	alphabet      | yes       | ${undefined}
	double        | yes       | ${false}
`((record) => {
	const { property, available, value } = record as any;
	test(`has ${property} available ${available} with value ${value}`, (t) => {
		t.equal(property in instance, available === 'yes');
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
	test(`has method ${method}`, (t) => {
		t.equal(typeof instance[method as keyof PureISO7064], 'function');

		t.end();
	});
})
