const ISO7064 = require('../Abstract/ISO7064.js');

/**
 * Pure checksum calculation implementation
 *
 * @class PureISO7064
 * @extends {ISO7064}
 */
class PureISO7064 extends ISO7064 {
	/**
	 * Creates an instance of PureISO7064
	 *
	 * @param {*} options
	 * @memberof PureISO7064
	 */
	constructor({ indices, alphabet, radix = 2, ...rest } = {}) {
		super({
			...rest,
			alphabet,
			indices: indices || (alphabet ? alphabet.slice(0, -1) : alphabet),
			radix
		});
	}

	/**
	 * Calculate the checksum for input
	 *
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof PureISO7064
	 */
	checksum(input) {
		const { modulus, radix, double, indices, alphabet } = this;
		const initial = alphabet.charAt(0).repeat(Number(double) + 1);
		const normal = this.normalize(input) + initial;
		const sum = Array.from(normal)
			.map((char) => indices.indexOf(char))
			.reduce((carry, pos) => (carry * radix + pos) % modulus, 0);
		const checksum = (modulus + 1 - (sum % modulus)) % modulus;

		return (double
			? [(checksum / radix) | 0, checksum % radix]
			: [checksum]
		)
			.map((index) => alphabet.charAt(index))
			.join('');
	}
}

module.exports = PureISO7064;
