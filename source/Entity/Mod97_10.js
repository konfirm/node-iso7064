const PureISO7064 = require('../Abstract/PureISO7064.js');

/**
 * ISO 7064, MOD 97-10 Algorithm
 *
 * @class Mod97_10
 * @extends {PureISO7064}
 */
class Mod97_10 extends PureISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get algorithm() {
		return 'MOD 97-10';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get specification() {
		return 'ISO 7064, MOD 97-10';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get designation() {
		return 3;
	}

	/**
	 * Get the modulus
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get modulus() {
		return 97;
	}

	/**
	 * Get the radix
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get radix() {
		return 10;
	}

	/**
	 * Get the indices (allowed input characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get indices() {
		return '0123456789';
	}

	/**
	 * Does the checksum consist of two characters
	 *
	 * @readonly
	 * @static
	 * @memberof Mod97_10
	 */
	static get double() {
		return true;
	}
}

module.exports = Mod97_10;
