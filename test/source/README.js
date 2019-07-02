/* global source, describe, it, expect */

const { HybridISO7064 } = require('../../main.js');

describe('README.md', () => {
	describe('Mod17_16 example', () => {
		class Mod17_16 extends HybridISO7064 {
			static get indices() {
				return '0123456789ABCDEF';
			}
		}

		it('Mod17_16.checksum', (next) => {
			expect(Mod17_16.checksum('D98989898909898')).to.equal('B');
			expect(Mod17_16.checksum('D98989898909899')).to.equal('9');

			next();
		});

		it('Mod17_16.generate', (next) => {
			expect(Mod17_16.generate('D98989898909898')).to.equal(
				'D98989898909898B'
			);
			expect(Mod17_16.generate('D98989898909899')).to.equal(
				'D989898989098999'
			);

			next();
		});

		it('Mod17_16.validate', (next) => {
			expect(Mod17_16.validate('D98989898909898B')).to.equal(true);
			expect(Mod17_16.validate('D98989898909899B')).to.equal(false);
			expect(Mod17_16.validate('D989898989098999')).to.equal(true);

			next();
		});

		it('Mod17_16.validate', (next) => {
			expect(Mod17_16.validate('D98-989-898-909-898-B')).to.equal(true);

			next();
		});

		expect();
	});
});
