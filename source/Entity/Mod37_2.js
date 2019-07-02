const PureISO7064 = require('../Abstract/PureISO7064.js');

/**
 * ISO 7064, MOD 37-2 Algorithm
 *
 * @class Mod37_2
 * @extends {PureISO7064}
 */
class Mod37_2 extends PureISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get algorithm() {
		return 'MOD 37-2';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get specification() {
		return 'ISO 7064, MOD 37-2';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get designation() {
		return 2;
	}

	/**
	 * Get the modulud
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get modulus() {
		return 37;
	}

	/**
	 * Get the radix
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get radix() {
		return 2;
	}

	/**
	 * Get the indices (allowed input characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get indices() {
		return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}

	/**
	 * Get the alphabet (allowed checksum characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod37_2
	 */
	static get alphabet() {
		return `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*`;
	}
}

module.exports = Mod37_2;
