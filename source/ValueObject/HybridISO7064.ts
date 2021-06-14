const ISO7064 = require('../Abstract/ISO7064.js');

/**
 * Hybrid checksum calculation implementation
 *
 * @class HybridISO7064
 * @extends {ISO7064}
 */
class HybridISO7064 extends ISO7064 {
	/**
	 * Calculate the checksum for input
	 *
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof HybridISO7064
	 */
	checksum(input) {
		const { modulus: mod, indices, alphabet } = this;
		const sum =
			Array.from(this.normalize(input))
				.map((char) => indices.indexOf(char))
				.reduce(
					(carry, pos) =>
						(((carry % (mod + 1)) + pos) % mod || mod) * 2,
					mod
				) %
			(mod + 1);

		return alphabet.charAt((mod + 1 - sum) % mod);
	}
}

module.exports = HybridISO7064;
