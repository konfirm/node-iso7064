const Alphabet = require('@konfirm/alphabet');
const PureISO7064 = require('../Abstract/PureISO7064.js');

/**
 * ISO 7064, MOD 11-2 Algorithm
 *
 * @class Mod11_2
 * @extends {PureISO7064}
 */
class Mod11_2 extends PureISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get algorithm() {
		return 'MOD 11-2';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get specification() {
		return 'ISO 7064, MOD 11-2';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get designation() {
		return 1;
	}

	/**
	 * Get the modulus
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get modulus() {
		return 11;
	}

	/**
	 * Get the radix
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get radix() {
		return 2;
	}

	/**
	 * Get the indices (allowed input characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get indices() {
		return this.alphabet.slice(0, -1);
	}

	/**
	 * Get the alphabet (allowed checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_2
	 */
	static get alphabet() {
		return Alphabet.from('0123456789X');
	}
}

module.exports = Mod11_2;
