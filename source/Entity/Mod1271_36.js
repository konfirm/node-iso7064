const PureISO7064 = require('../Abstract/PureISO7064.js');

/**
 * ISO 7064, MOD 1271-36 Algorithm
 *
 * @class Mod1271_36
 * @extends {PureISO7064}
 */
class Mod1271_36 extends PureISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get algorithm() {
		return 'MOD 1271-36';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get specification() {
		return 'ISO 7064, MOD 1271-36';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get designation() {
		return 5;
	}

	/**
	 * Get the modulus
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get modulus() {
		return 1271;
	}

	/**
	 * Get the radix
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get radix() {
		return 36;
	}

	/**
	 * Get the indices (allowed input characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get indices() {
		return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}

	/**
	 * Get the alphabet (checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get alphabet() {
		return `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*`;
	}

	/**
	 * Does the checksum consist of two characters
	 *
	 * @readonly
	 * @static
	 * @memberof Mod1271_36
	 */
	static get double() {
		return true;
	}
}

module.exports = Mod1271_36;
