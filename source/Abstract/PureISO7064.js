const ISO7064 = require('./ISO7064.js');

/**
 * Pure checksum calculation implementation
 *
 * @class PureISO7064
 * @extends {ISO7064}
 */
class PureISO7064 extends ISO7064 {
	/**
	 * The radix
	 *
	 * @readonly
	 * @static
	 * @memberof PureISO7064
	 */
	static get radix() {}

	/**
	 * Calculate the checksum for input
	 *
	 * @static
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof PureISO7064
	 */
	static checksum(input) {
		const { modulus, radix, double, indices, alphabet } = this;
		const normal =
			this.normalize(input) + alphabet[0].repeat(Number(double) + 1);
		const sum = Array.from(normal)
			.map((char) => indices.indexOf(char))
			.reduce((carry, pos) => (carry * radix + pos) % modulus, 0);
		const checksum = (modulus + 1 - (sum % modulus)) % modulus;

		return (double
			? [(checksum / radix) | 0, checksum % radix]
			: [checksum]
		)
			.map((index) => alphabet[index])
			.join('');
	}
}

module.exports = PureISO7064;
