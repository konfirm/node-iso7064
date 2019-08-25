const Alphabet = require('@konfirm/alphabet');
const PureISO7064 = require('../Abstract/PureISO7064.js');

/**
 * ISO 7064, MOD 661-26 Algorithm
 *
 * @class Mod661_26
 * @extends {PureISO7064}
 */
class Mod661_26 extends PureISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get algorithm() {
		return 'MOD 661-26';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get specification() {
		return 'ISO 7064, MOD 661-26';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get designation() {
		return 4;
	}

	/**
	 * Get the modulus
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get modulus() {
		return 661;
	}

	/**
	 * Get the radix
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get radix() {
		return 26;
	}

	/**
	 * Get the alphabet (allowed checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get alphabet() {
		return Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	}

	/**
	 * Does the checksum consist of two characters
	 *
	 * @readonly
	 * @static
	 * @memberof Mod661_26
	 */
	static get double() {
		return true;
	}
}

module.exports = Mod661_26;
