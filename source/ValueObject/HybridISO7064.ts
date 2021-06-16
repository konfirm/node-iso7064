import type { ISO7064Options } from '../Abstract/ISO7064';
import { ISO7064 } from '../Abstract/ISO7064';

/**
 * Hybrid checksum calculation implementation
 *
 * @class HybridISO7064
 * @extends {ISO7064}
 */
export class HybridISO7064 extends ISO7064 {
	/**
	 * Calculate the checksum for input
	 *
	 * @param {string} input
	 * @returns {string} checksum
	 * @memberof HybridISO7064
	 */
	checksum(input: string): string {
		const { modulus: mod, indices, alphabet } = this;
		const sum =
			Array.from(this.normalize(input))
				.map((char) => indices.indexOf(char))
				.reduce((carry, pos) => (((carry % (mod + 1)) + pos) % mod || mod) * 2, mod) % (mod + 1);

		return alphabet.charAt((mod + 1 - sum) % mod);
	}
}
