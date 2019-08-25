/* global source, describe, it, each, expect */

const Alphabet = require('@konfirm/alphabet');
const ModSubject = source('Entity/Mod11_2');
const ISO7064 = source('Abstract/ISO7064');
const PureISO7064 = source('Abstract/PureISO7064');

describe('ISO7064', () => {
	describe('Mod11_2', () => {
		it('is an instance of (Pure)ISO7064', (next) => {
			expect(ModSubject.prototype).to.be.instanceof(ISO7064);
			expect(ModSubject.prototype).to.be.instanceof(PureISO7064);

			next();
		});

		each`
			property      | value
			--------------|-------
			algorithm     | MOD 11-2
			specification | ISO 7064, MOD 11-2
			designation   | ${1}
			modulus       | ${11}
			radix         | ${2}
			indices       | ${Alphabet.from('0123456789')}
			alphabet      | ${Alphabet.from('0123456789X')}
			double        | ${false}
		`('has $property with value $value', ({ property, value }, next) => {
			expect(ModSubject[property]).to.equal(value);

			next();
		});

		/*  Uses unit test samples from:
		 *  https://github.com/danieltwagner/iso7064/blob/master/src/test/java/com/github/danieltwagner/iso7064/Mod11_2Test.java
		 *  https://github.com/LiosK/cdigit/blob/master/test/mod11_2.js
		 */

		describe('normalizes', () => {
			each`
				input              | normal
				-------------------|----------
				0000-0002-1825-009 | 000000021825009
				0000-0002-9079-593 | 000000029079593
				ABCD747633         | 747633
				418.12.925         | 41812925
				17780-4390         | 177804390
				82-00-10-7028943   | 8200107028943
				98-25-46           | 982546
			`('input $input is normalized into $normal', ({ input, normal }, next) => {
				expect(ModSubject.normalize(input)).to.equal(normal);

				next();
			});
		});

		describe('checksum', () => {
			each`
				input           | checksum
				----------------|----------
				000000021825009 | 7
				000000029079593 | X
				079             | X
				0794            | 0
				001175717748247 | 6
				747633          | 6
				734404529805608 | 0
				41812925        | 9
				986596515101003 | X
				177804390       | 4
				899952          | 6
				8200107028943   | 6
				6583491086272   | 6
				118344415502    | 1
				982546          | 4
				000194585       | 9
				82703512512057  | X
				4338            | 6
				007763161148    | 8
				790830359455    | 0
				4731722270      | 0
				000088486619034 | 0
			`('input $input has checksum $checksum', ({ input, checksum }, next) => {
				expect(ModSubject.checksum(input)).to.equal(checksum);

				next();
			});
		});

		describe('generate', () => {
			each`
				input           | computed
				----------------|----------
				000000021825009 | 0000000218250097
				000000029079593 | 000000029079593X
				079             | 079X
				0794            | 07940
				001175717748247 | 0011757177482476
				747633          | 7476336         
				734404529805608 | 7344045298056080
				41812925        | 418129259       
				986596515101003 | 986596515101003X
				177804390       | 1778043904      
				899952          | 8999526         
				8200107028943   | 82001070289436  
				6583491086272   | 65834910862726  
				118344415502    | 1183444155021   
				982546          | 9825464         
				000194585       | 0001945859      
				82703512512057  | 82703512512057X 
				4338            | 43386           
				007763161148    | 0077631611488   
				790830359455    | 7908303594550   
				4731722270      | 47317222700     
				000088486619034 | 0000884866190340
			`('generates $computed for $input', ({ input, computed }, next) => {
				expect(ModSubject.generate(input)).to.equal(computed);

				next();
			});
		});

		describe('validate', () => {
			each`
				input            | valid
				-----------------|-------
				0000000218250097 | yes
				000000029079593X | yes
				079X             | yes
				07940            | yes
				0011757177482476 | yes
				7476336          | yes
				7344045298056080 | yes
				418129259        | yes
				986596515101003X | yes
				1778043904       | yes
				8999526          | yes
				82001070289436   | yes
				65834910862726   | yes
				1183444155021    | yes
				9825464          | yes
				0001945859       | yes
				82703512512057X  | yes
				43386            | yes
				0077631611488    | yes
				7908303594550    | yes
				47317222700      | yes
				0000884866190340 | yes
				A                | no
				1                | no
				08940            | no
				089X             | no
			`('validates $input is valid: $valid', ({ input, valid }, next) => {
				expect(ModSubject.validate(input)).to.equal(valid === 'yes');

				next();
			});
		});
	});
});
