const Alphabet = require('@konfirm/alphabet');
const HybridISO7064 = require('../Abstract/HybridISO7064.js');

/**
 * ISO 7064, MOD 37,36 Algorithm
 *
 * @class Mod37_36
 * @extends {HybridISO7064}
 */
class Mod37_36 extends HybridISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_36
	 */
	static get algorithm() {
		return 'MOD 37,36';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_36
	 */
	static get designation() {
		return 8;
	}

	/**
	 * Get the alphabet (allowed checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_36
	 */
	static get alphabet() {
		return Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	}
}

module.exports = Mod37_36;
