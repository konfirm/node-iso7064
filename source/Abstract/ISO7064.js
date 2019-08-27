const storage = new WeakMap();

/**
 * Implement the common ISO 7064 implementation mechanics
 *
 * @class ISO7064
 */
class ISO7064 {
	constructor(options = {}) {
		storage.set(this, options);
	}

	/**
	 * The algorithm name
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get algorithm() {
		const { algorithm } = storage.get(this);

		return algorithm || 'Custom';
	}

	/**
	 * The specification name
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get specification() {
		const { algorithm } = this;

		return `ISO 7064, ${algorithm}`;
	}

	/**
	 * The designation (always 0, except for the Modulus implementations)
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get designation() {
		const { designation } = storage.get(this);

		return designation || 0;
	}

	/**
	 * The alphabet of allowed characters and from which to obtain the indices
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get indices() {
		const { indices, alphabet } = storage.get(this);

		return indices || alphabet;
	}

	/**
	 * The checksum alphabet
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get alphabet() {
		const { alphabet } = storage.get(this);

		return alphabet;
	}

	/**
	 * The modulus
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get modulus() {
		const { modulus, alphabet } = storage.get(this);

		return modulus || (alphabet ? alphabet.length : undefined);
	}

	/**
	 * The radix
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get radix() {
		const { radix } = storage.get(this);

		return radix;
	}

	/**
	 * Does the checksum consist of double digits
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get double() {
		const { double } = storage.get(this);

		return double || false;
	}

	/**
	 * Normalize input, removing any character not allowed in the input
	 *
	 * @param {string} input
	 * @returns {string} normalized
	 * @memberof ISO7064
	 */
	normalize(input) {
		const { indices } = this;
		const purge = new RegExp(`[^${indices}]+`, 'g');

		return String(input)
			.toUpperCase()
			.replace(purge, '');
	}

	/**
	 * Calculate the checksum for input
	 *
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof ISO7064
	 */
	checksum(input) {
		throw new Error('Checksum method not implemented');
	}

	/**
	 * Validate the input
	 *
	 * @param {string} input
	 * @returns {boolean} valid
	 * @memberof ISO7064
	 */
	validate(input) {
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
	 * @param {string} input
	 * @returns {string} generated
	 * @memberof ISO7064
	 */
	generate(input) {
		const normal = this.normalize(input);

		return `${normal}${this.checksum(input)}`;
	}

	/**
	 * Create a new instance based on the current settings with optional overrides
	 *
	 * @param {object} options
	 * @returns
	 * @memberof ISO7064
	 */
	factory(options = {}) {
		const { constructor, indices, alphabet, modulus, radix, double } = this;

		return new constructor({
			indices,
			alphabet,
			modulus,
			radix,
			double,
			...options
		});
	}
}

module.exports = ISO7064;
