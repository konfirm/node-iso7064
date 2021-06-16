import type { Alphabet } from '@konfirm/alphabet';

export type ISO7064Options = {
	algorithm: string;
	designation: number;
	radix: number;
	modulus: number;
	double: boolean;
	indices: Alphabet;
	alphabet: Alphabet;
};

const storage: WeakMap<ISO7064, Partial<ISO7064Options>> = new WeakMap();

/**
 * Implement the common ISO 7064 implementation mechanics
 *
 * @class ISO7064
 */
export abstract class ISO7064 {
	constructor(options: Partial<ISO7064Options> = {}) {
		storage.set(this, options);
	}

	/**
	 * The algorithm name
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get algorithm(): string {
		const { algorithm } = storage.get(this) as ISO7064Options;

		return algorithm || 'Custom';
	}

	/**
	 * The specification name
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get specification(): string {
		const { algorithm } = this;

		return `ISO 7064, ${algorithm}`;
	}

	/**
	 * The designation (always 0, except for the Modulus implementations)
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get designation(): number {
		const { designation } = storage.get(this) as ISO7064Options;

		return designation || 0;
	}

	/**
	 * The alphabet of allowed characters and from which to obtain the indices
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get indices(): Alphabet {
		const { indices, alphabet } = storage.get(this) as ISO7064Options;

		return indices || alphabet;
	}

	/**
	 * The checksum alphabet
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get alphabet(): Alphabet {
		const { alphabet } = storage.get(this) as ISO7064Options;

		return alphabet;
	}

	/**
	 * The modulus
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get modulus(): number {
		const { modulus, alphabet } = storage.get(this) as ISO7064Options;

		return modulus || (alphabet && alphabet.length);
	}

	/**
	 * The radix
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get radix(): number {
		const { radix } = storage.get(this) as ISO7064Options;

		return radix;
	}

	/**
	 * Does the checksum consist of double digits
	 *
	 * @readonly
	 * @memberof ISO7064
	 */
	get double(): boolean {
		const { double } = storage.get(this) as ISO7064Options;

		return double || false;
	}

	/**
	 * Normalize input, removing any character not allowed in the input
	 *
	 * @param {string} input
	 * @returns {string} normalized
	 * @memberof ISO7064
	 */
	normalize(input: string): string {
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
	checksum(input: string): string {
		throw new Error('Checksum method not implemented');
	}

	/**
	 * Validate the input
	 *
	 * @param {string} input
	 * @returns {boolean} valid
	 * @memberof ISO7064
	 */
	validate(input: string): boolean {
		const { indices, alphabet, double } = this;
		const pattern = new RegExp(`([${indices}]+)([${alphabet}]{${Number(double) + 1}})`);
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
	generate(input: string) {
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
		const { indices, alphabet, modulus, radix, double } = this;
		const { constructor: Ctor } = Object.getPrototypeOf(this);

		return new Ctor({
			indices,
			alphabet,
			modulus,
			radix,
			double,
			...options
		});
	}
}
