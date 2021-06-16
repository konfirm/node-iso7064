import type { ISO7064Options } from '../Abstract/ISO7064';
import { ISO7064 } from '../Abstract/ISO7064';

/**
 * Pure checksum calculation implementation
 *
 * @class PureISO7064
 * @extends {ISO7064}
 */
export class PureISO7064 extends ISO7064 {
	/**
	 * Creates an instance of PureISO7064
	 *
	 * @param {*} options
	 * @memberof PureISO7064
	 */
	constructor(options: Partial<ISO7064Options> = {}) {
		const { alphabet, radix = 2, indices = alphabet?.slice(0, -1), ...rest } = options;

		super({ alphabet, indices, radix, ...rest });
	}

	/**
	 * Calculate the checksum for input
	 *
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof PureISO7064
	 */
	checksum(input: string): string {
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
