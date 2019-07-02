/**
 * Implement the common ISO 7064 implementation mechanics
 *
 * @class ISO7064
 */
class ISO7064 {
	/**
	 * The algorithm name
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get algorithm() {}

	/**
	 * The specification name
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get specification() {}

	/**
	 * The designation (always 0, except for the Modulus implementations)
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get designation() {
		return 0;
	}

	/**
	 * The alphabet of allowed characters and from which to obtain the indices
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get indices() {}

	/**
	 * The checksum alphabet
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get alphabet() {
		return this.indices;
	}

	/**
	 * The modulus
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get modulus() {}

	/**
	 * Does the checksum consist of double digits
	 *
	 * @readonly
	 * @static
	 * @memberof ISO7064
	 */
	static get double() {
		return false;
	}

	/**
	 * Normalize input, removing any character not allowed in the input
	 *
	 * @static
	 * @param {string} input
	 * @returns {string} normalized
	 * @memberof ISO7064
	 */
	static normalize(input) {
		const { indices } = this;
		const purge = new RegExp(`[^${indices}]+`, 'g');

		return String(input)
			.toUpperCase()
			.replace(purge, '');
	}

	/**
	 * Calculate the checksum for input
	 *
	 * @static
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof ISO7064
	 */
	static checksum(input) {}

	/**
	 * Validate the input
	 *
	 * @static
	 * @param {string} input
	 * @returns {boolean} valid
	 * @memberof ISO7064
	 */
	static validate(input) {
		const { indices, alphabet, double } = this;
		const pattern = new RegExp(
			`([${indices}]+)([${alphabet}]{${Number(double) + 1}})`
		);
		const match = this.normalize(input).match(pattern);

		if (match) {
			const [, num, cc] = match;

			return this.checksum(num) === cc;
		}

		return false;
	}

	/**
	 * Generate the normalized output including the checksum
	 *
	 * @static
	 * @param {string} input
	 * @returns {string} generated
	 * @memberof ISO7064
	 */
	static generate(input) {
		const normal = this.normalize(input);

		return `${normal}${this.checksum(input)}`;
	}
}

module.exports = ISO7064;
