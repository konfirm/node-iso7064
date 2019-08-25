const Alphabet = require('@konfirm/alphabet');
const HybridISO7064 = require('../Abstract/HybridISO7064.js');

/**
 * ISO 7064, MOD 27,26 Algorithm
 *
 * @class Mod27_26
 * @extends {HybridISO7064}
 */
class Mod27_26 extends HybridISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod27_26
	 */
	static get algorithm() {
		return 'MOD 27,26';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod27_26
	 */
	static get specification() {
		return 'ISO 7064, MOD 27,26';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod27_26
	 */
	static get designation() {
		return 7;
	}

	/**
	 * Get the alphabet (allowed checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod27_26
	 */
	static get alphabet() {
		return Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	}
}

module.exports = Mod27_26;
