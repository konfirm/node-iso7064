const Alphabet = require('@konfirm/alphabet');
const ISO7064 = require('./source/Abstract/ISO7064.js');
const PureISO7064 = require('./source/ValueObject/PureISO7064.js');
const HybridISO7064 = require('./source/ValueObject/HybridISO7064.js');

const alphabet = {
	num: Alphabet.from('0123456789'),
	numX: Alphabet.from('0123456789X'),
	alpha: Alphabet.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	alphanum: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
	alphanumA: Alphabet.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*')
};

module.exports = {
	ISO7064,
	PureISO7064,
	HybridISO7064,
	Mod11_2: new PureISO7064({
		algorithm: 'MOD 11-2',
		designation: 1,
		alphabet: alphabet.numX
	}),
	Mod37_2: new PureISO7064({
		algorithm: 'MOD 37-2',
		designation: 2,
		alphabet: alphabet.alphanumA
	}),
	Mod97_10: new PureISO7064({
		algorithm: 'MOD 97-10',
		designation: 3,
		modulus: 97,
		radix: 10,
		alphabet: alphabet.num,
		indices: alphabet.num,
		double: true
	}),
	Mod661_26: new PureISO7064({
		algorithm: 'MOD 661-26',
		designation: 4,
		modulus: 661,
		radix: 26,
		alphabet: alphabet.alpha,
		indices: alphabet.alpha,
		double: true
	}),
	Mod1271_36: new PureISO7064({
		algorithm: 'MOD 1271-36',
		designation: 5,
		modulus: 1271,
		radix: 36,
		alphabet: alphabet.alphanumA,
		double: true
	}),
	Mod11_10: new HybridISO7064({
		algorithm: 'MOD 11,10',
		designation: 6,
		alphabet: alphabet.num
	}),
	Mod27_26: new HybridISO7064({
		algorithm: 'MOD 27,26',
		designation: 7,
		alphabet: alphabet.alpha
	}),
	Mod37_36: new HybridISO7064({
		algorithm: 'MOD 37,36',
		designation: 8,
		alphabet: alphabet.alphanum
	})
};
