import * as test from 'tape';
import { each } from 'template-literal-each';
import { ISO7064, HybridISO7064 } from '../../../source/main';

const instance = new HybridISO7064();

test('ISO7064/Hybrid - is an instance of ISO7064', (t) => {
	t.true(HybridISO7064.prototype instanceof ISO7064, `HybridISO7064 extends ISO7064`);
	t.true(instance instanceof ISO7064, 'is an instance of ISO7064');

	t.end();
});

test('ISO7064/Hybrid - properties', (t) => {
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
		t.equal(instance[property as keyof HybridISO7064], value, `property ${property} is ${JSON.stringify(value)}`);

		t.throws(() => (instance as any)[property] = value, new RegExp(`TypeError: Cannot set property ${property}`));
	});

	t.end();
});

test('ISO7064/Hybrid - methods', (t) => {
	each`
		method
		-------
		normalize
		checksum
		validate
		generate
	`((record) => {
		const { method } = record as any;

		t.equal(typeof instance[method as keyof HybridISO7064], 'function', `has method ${method}`);
	});

	t.end();
})
