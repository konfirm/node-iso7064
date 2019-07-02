const HybridISO7064 = require('../Abstract/HybridISO7064.js');

/**
 * ISO 7064, MOD 11,10 Algorithm
 *
 * @class Mod11_10
 * @extends {HybridISO7064}
 */
class Mod11_10 extends HybridISO7064 {
	/**
	 * Get the algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_10
	 */
	static get algorithm() {
		return 'MOD 11,10';
	}

	/**
	 * Get the specification name
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_10
	 */
	static get specification() {
		return 'ISO 7064, MOD 11,10';
	}

	/**
	 * Get the designation
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_10
	 */
	static get designation() {
		return 6;
	}

	/**
	 * Get the indices (allowed input characters)
	 *
	 * @readonly
	 * @static
	 * @memberof Mod11_10
	 */
	static get indices() {
		return '0123456789';
	}
}

module.exports = Mod11_10;
