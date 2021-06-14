import * as test from 'tape';
import * as main from '../../main';

test('ISO7064 - exports', (t) => {
	t.true('Alphabet' in main);
	t.true('ISO7064' in main);
	t.true('PureISO7064' in main);
	t.true('HybridISO7064' in main);
	t.true('Mod11_2' in main);
	t.true('Mod11_10' in main);
	t.true('Mod27_26' in main);
	t.true('Mod37_2' in main);
	t.true('Mod37_36' in main);
	t.true('Mod97_10' in main);
	t.true('Mod661_26' in main);
	t.true('Mod1271_36' in main);

	t.end();
});

const {
	ISO7064,
	PureISO7064,
	HybridISO7064,
	Mod11_2,
	Mod11_10,
	Mod27_26,
	Mod37_2,
	Mod37_36,
	Mod97_10,
	Mod661_26,
	Mod1271_36
} = main;

test('ISO7064/inheritance - PureISO7064 is a ISO7064', (t) => {
	t.true(PureISO7064.prototype instanceof ISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod11_2 is a PureISO7064', (t) => {
	t.true(Mod11_2 instanceof ISO7064);
	t.true(Mod11_2 instanceof PureISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod37_2 is a PureISO7064', (t) => {
	t.true(Mod37_2 instanceof ISO7064);
	t.true(Mod37_2 instanceof PureISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod97_10 is a PureISO7064', (t) => {
	t.true(Mod97_10 instanceof ISO7064);
	t.true(Mod97_10 instanceof PureISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod661_26 is a PureISO7064', (t) => {
	t.true(Mod661_26 instanceof ISO7064);
	t.true(Mod661_26 instanceof PureISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod1271_36 is a PureISO7064', (t) => {
	t.true(Mod1271_36 instanceof ISO7064);
	t.true(Mod1271_36 instanceof PureISO7064);

	t.end();
});

test('ISO7064/inheritance - HybridISO7064 is a ISO7064', (t) => {
	t.true(HybridISO7064.prototype instanceof ISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod11_10 is a HybridISO7064', (t) => {
	t.true(Mod11_10 instanceof ISO7064);
	t.true(Mod11_10 instanceof HybridISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod27_26 is a HybridISO7064', (t) => {
	t.true(Mod27_26 instanceof ISO7064);
	t.true(Mod27_26 instanceof HybridISO7064);

	t.end();
});

test('ISO7064/inheritance - Mod37_36 is a HybridISO7064', (t) => {
	t.true(Mod37_36 instanceof ISO7064);
	t.true(Mod37_36 instanceof HybridISO7064);

	t.end();
});
