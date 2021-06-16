import { Alphabet } from '@konfirm/alphabet';
import { ISO7064 } from './Abstract/ISO7064';
import { PureISO7064 } from './ValueObject/PureISO7064';
import { HybridISO7064 } from './ValueObject/HybridISO7064';

const alphabet = {
	num: Alphabet.from('0123456789'),
	numX: Alphabet.from('0123456789X'),
	alpha: Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	alphanum: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	alphanumA: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*')
};

export { Alphabet, ISO7064, PureISO7064, HybridISO7064 };
export const Mod11_2 = new PureISO7064({
	algorithm: 'MOD 11-2',
	designation: 1,
	alphabet: alphabet.numX
});
export const Mod37_2 = new PureISO7064({
	algorithm: 'MOD 37-2',
	designation: 2,
	alphabet: alphabet.alphanumA
});
export const Mod97_10 = new PureISO7064({
	algorithm: 'MOD 97-10',
	designation: 3,
	modulus: 97,
	radix: 10,
	alphabet: alphabet.num,
	indices: alphabet.num,
	double: true
});
export const Mod661_26 = new PureISO7064({
	algorithm: 'MOD 661-26',
	designation: 4,
	modulus: 661,
	radix: 26,
	alphabet: alphabet.alpha,
	indices: alphabet.alpha,
	double: true
});
export const Mod1271_36 = new PureISO7064({
	algorithm: 'MOD 1271-36',
	designation: 5,
	modulus: 1271,
	radix: 36,
	alphabet: alphabet.alphanumA,
	double: true
});
export const Mod11_10 = new HybridISO7064({
	algorithm: 'MOD 11,10',
	designation: 6,
	alphabet: alphabet.num
});
export const Mod27_26 = new HybridISO7064({
	algorithm: 'MOD 27,26',
	designation: 7,
	alphabet: alphabet.alpha
});
export const Mod37_36 = new HybridISO7064({
	algorithm: 'MOD 37,36',
	designation: 8,
	alphabet: alphabet.alphanum
});
