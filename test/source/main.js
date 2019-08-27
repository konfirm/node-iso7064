/* global source, describe, it, each, expect */

const main = require('../../main.js');

describe('ISO7064', () => {
	it('exports', (next) => {
		expect('ISO7064' in main).to.be.true();
		expect('PureISO7064' in main).to.be.true();
		expect('HybridISO7064' in main).to.be.true();
		expect('Mod11_2' in main).to.be.true();
		expect('Mod11_10' in main).to.be.true();
		expect('Mod27_26' in main).to.be.true();
		expect('Mod37_2' in main).to.be.true();
		expect('Mod37_36' in main).to.be.true();
		expect('Mod97_10' in main).to.be.true();
		expect('Mod661_26' in main).to.be.true();
		expect('Mod1271_36' in main).to.be.true();

		next();
	});

	describe('inheritance', () => {
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

		describe('PureISO7064', () => {
			it('PureISO7064 is a ISO7064', (next) => {
				expect(PureISO7064.prototype).to.be.instanceof(ISO7064);

				next();
			});

			it('Mod11_2 is a PureISO7064', (next) => {
				expect(Mod11_2).to.be.instanceof(ISO7064);
				expect(Mod11_2).to.be.instanceof(PureISO7064);

				next();
			});

			it('Mod37_2 is a PureISO7064', (next) => {
				expect(Mod37_2).to.be.instanceof(ISO7064);
				expect(Mod37_2).to.be.instanceof(PureISO7064);

				next();
			});

			it('Mod97_10 is a PureISO7064', (next) => {
				expect(Mod97_10).to.be.instanceof(ISO7064);
				expect(Mod97_10).to.be.instanceof(PureISO7064);

				next();
			});

			it('Mod661_26 is a PureISO7064', (next) => {
				expect(Mod661_26).to.be.instanceof(ISO7064);
				expect(Mod661_26).to.be.instanceof(PureISO7064);

				next();
			});

			it('Mod1271_36 is a PureISO7064', (next) => {
				expect(Mod1271_36).to.be.instanceof(ISO7064);
				expect(Mod1271_36).to.be.instanceof(PureISO7064);

				next();
			});
		});

		describe('HybridISO7064', () => {
			it('HybridISO7064 is a ISO7064', (next) => {
				expect(HybridISO7064.prototype).to.be.instanceof(ISO7064);

				next();
			});

			it('Mod11_10 is a HybridISO7064', (next) => {
				expect(Mod11_10).to.be.instanceof(ISO7064);
				expect(Mod11_10).to.be.instanceof(HybridISO7064);

				next();
			});

			it('Mod27_26 is a HybridISO7064', (next) => {
				expect(Mod27_26).to.be.instanceof(ISO7064);
				expect(Mod27_26).to.be.instanceof(HybridISO7064);

				next();
			});

			it('Mod37_36 is a HybridISO7064', (next) => {
				expect(Mod37_36).to.be.instanceof(ISO7064);
				expect(Mod37_36).to.be.instanceof(HybridISO7064);

				next();
			});
		});
	});
});
