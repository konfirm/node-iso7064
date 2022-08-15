[![Tests](https://github.com/konfirm/node-iso7064/actions/workflows/test.yml/badge.svg)](https://github.com/konfirm/node-iso7064/actions/workflows/test.yml)
[![Release](https://github.com/konfirm/node-iso7064/actions/workflows/release.yml/badge.svg)](https://github.com/konfirm/node-iso7064/actions/workflows/release.yml)

# ISO 7064

An implementation of check digit calculating algorithms described in the [ISO/IEC 7064:2003](https://www.iso.org/standard/31531.html) specification. Check digits are primarily used to quickly detect eratic input and are not intended for cryptographical purposes.

# Installation

The ISO 7064 package is a scoped package, which means one needs to provide the scope (both in installation and use).

```
$ npm install --save @konfirm/iso7064
```

# Usage

The ISO 7064 package provides several extendable classes of which all modulus-algorithms are ready for immediate use.

As of version 2.1 the ISO 7064 provides Typescript types and ES Modules.

## Example

Using import (ES Modules, Typescript)

```js
import { Mod97_10 } from '@konfirm/iso7064';
```

Or the CommonJS `require`

```js
const { Mod97_10 } = require('@konfirm/iso7064');
```


## Available exports

| export                            | extends         | purpose                                      |
| --------------------------------- | --------------- | -------------------------------------------- |
| [`ISO7064`](#iso7064)             |                 | The common mechanics for all implementations |
| [`PureISO7064`](#pureiso7064)     | `ISO7064`       | Provide the pure modulus specification       |
| [`HybridISO7064`](#hybridiso7064) | `ISO7064`       | Provide the hybrid modulus specification     |
| [`Mod11_2`](#mod112)              | `PureISO7064`   | The MOD 11-2 implementation                  |
| [`Mod11_10`](#mod1110)            | `HybridISO7064` | The MOD 11,10 implementation                 |
| [`Mod27_26`](#mod2726)            | `HybridISO7064` | The MOD 27,26 implementation                 |
| [`Mod37_2`](#mod372)              | `PureISO7064`   | The MOD 37-2 implementation                  |
| [`Mod37_36`](#mod3736)            | `HybridISO7064` | The MOD 37,36 implementation                 |
| [`Mod97_10`](#mod9710)            | `PureISO7064`   | The MOD 97-10 implementation                 |
| [`Mod661_26`](#mod66126)          | `PureISO7064`   | The MOD 661-26 implementation                |
| [`Mod1271_36`](#mod127136)        | `PureISO7064`   | The MOD 1271-36 implementation               |


## Methods

All algorithm implementations have the same methods, please refer to their respective documentation for the details on the exact in- and outputs.

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized value used for checksum calculations                |
| checksum  | `string\|number` | `string`  | the single or double digit/character checksum                      |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

### Example using `import` (ES Modules, Typescript)

```js
import { Mod11_2, Mod11_10 } from '@konfirm/iso7064';

console.log(Mod11_2.checksum('079')); //  'X'
console.log(Mod11_2.generate('079')); //  '079X'
console.log(Mod11_2.validate('079X')); //  true

console.log(Mod11_10.checksum('079')); // '2'
console.log(Mod11_10.generate('079')); // '0792'
console.log(Mod11_10.validate('0792')); // true
```

### Example using `require` (CommonJS)

```js
const { Mod11_2, Mod11_10 } = require('@konfirm/iso7064');

console.log(Mod11_2.checksum('079')); //  'X'
console.log(Mod11_2.generate('079')); //  '079X'
console.log(Mod11_2.validate('079X')); //  true

console.log(Mod11_10.checksum('079')); // '2'
console.log(Mod11_10.generate('079')); // '0792'
console.log(Mod11_10.validate('0792')); // true
```

## Extending

The class architecture allows for easy implementation of your custom algorithm, it mostly consists of picking the right system (either pure or hybrid) and creating the appropriate configuration.

### Example

The specification for [International Standard Audiovisual Number (ISAN, ISO 15706-2:2007)](https://en.wikipedia.org/wiki/International_Standard_Audiovisual_Number) details the use of the `ISO 7064, MOD 17,16` algorithm, which in itself is not described in the ISO 7064 specification. The implementation however is simple to do.

The ISO 15706-2:2007 specification states it uses the hybrid system, with hexadecimal characters for the input and a single character checksum (from the same hexadecimal characters). This means the `HybridISO7064` should be used, and the `indices` (allowed input characters) and `alphabet` should be provided. As the `alphabet` is the same as the `indices` we can omit it.

This leads to the following code

```js
// const { HybridISO7064, Alphabet } = require('@konfirm/iso7064');
import { HybridISO7064, Alphabet } form '@konfirm/iso7064';

const Mod17_16 = new HybridISO7064({
	alphabet: Alphabet.from('0123456789ABCDEF')
});

console.log(Mod17_17.checksum('D98989898909898')); // 'B'
console.log(Mod17_17.generate('D98989898909898')); // 'D98989898909899B'
console.log(Mod17_17.validate('D98989898909898B')); // true
console.log(Mod17_17.validate('D98-989-898-909-898-B')); // true
```

**NOTE** Searching online for the contents of the ISO 15706-2:2007 specification may lead to a version of the specification which includes an error in the example output. The example number shown below the calculation steps is `D98989898909899` with the supposed outcome of `B` (which should be `9`), while the ISAN used used in the calculation steps table is `D98989898909898` (last digit being `8` instead of `9`).

There is an addendum available for the specification, [ISO 15706-1:2002/Amd 1:2008](https://www.iso.org/standard/39470.html), in which we assume the mistake was corrected (we haven't purchased the specification to verify).

# API

## ISO7064

This is the base class of the package, it contains all properties and methods used by both the Pure- and HybridISO7064 classes and extends (the Mod-algorithm extensions).

### Constructor

New instances (such as the prepared `Mod*` implementations) are configured using an options object, the table below describes the type, defaults, purpose and whether the values are inherited by the `factory` method

| option      | type                                                   | default         | factory inherits | purpose                                |
| ----------- | ------------------------------------------------------ | --------------- | ---------------- | -------------------------------------- |
| algorithm   | `string`                                               | `Custom`        | no               | the name of the algorithm              |
| designation | `number`                                               | `0`             | no               | the designation number                 |
| modulus     | `number`                                               | alphabet.length | yes              | the modules to use                     |
| indices     | [`Alphabet`](https://github.com/konfirm/node-alphabet) | alphabet        | yes              | the indices (allowed characters)       |
| alphabet    | [`Alphabet`](https://github.com/konfirm/node-alphabet) | `undefined`     | yes              | The characters to use for the checksum |
| radix       | `number`                                               | `undefined`     | yes              | the radix to use                       |
| double      | `boolean`                                              | `false`         | yes              | use a double digit checksum            |

### Properties

| property      | value                                                  | description                                                                                                                        |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| algorithm     | `Custom`                                               | the name of the algorithm                                                                                                          |
| specification | `ISO 7064, Custom`                                     | the full specification and algorithm name                                                                                          |
| designation   | `0`                                                    | the designated number in the ISO 7064 standard (0 is the described value for non-designations)                                     |
| modulus       | `undefined`                                            | the modulus of the algorithm                                                                                                       |
| indices       | [`Alphabet`](https://github.com/konfirm/node-alphabet) | the [Alphabet instance](https://github.com/konfirm/node-alphabet) with allowed input digits/characters (uses`alphabet` if ommited) |
| alphabet      | [`Alphabet`](https://github.com/konfirm/node-alphabet) | the [Alphabet instance](https://github.com/konfirm/node-alphabet) allowed checksum digits/characters                               |
| radix         | `undefined`                                            | The radix used by the algorithm (used by `PureISO7064` implementations)                                                            |
| double        | `false`                                                | does the checksum consist of two digits/characters instead of one                                                                  |

### Methods

| method    | input            | output         | description                                                                                                  |
| --------- | ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| normalize | `string\|number` | `string`       | if no `indices` where provided during construction, normalization will remove any non-alphanumeric character |
| checksum  | `string\|number` | `throws Error` | will throw an Error, implementation in an extend is required                                                 |
| validate  | `string\|number` | `boolean`      | validate the provided string (including checksum)                                                            |
| generate  | `string\|number` | `string`       | calculate and append the checksum to the (normalized) input                                                  |
| factory   | `object`         | `ISO7064`      | Create a new instance, override provided options, inherit the rest                                           |

## PureISO7064

This is the base class for all pure systems. A pure system uses a single modulus for every stage of the checksum calculation.

As only the pure systems require the `radix` property, this class implements its default value.

### Properties

The PureISO7064 class inherits all properties from ISO7064 and adds `radix`.

| property | value | description                     |
| -------- | ----- | ------------------------------- |
| radix    | `2`   | The radix used by the algorithm |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized value used for checksum calculations                |
| checksum  | `string\|number` | `string`  | the single or double digit/character checksum                      |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## HybridISO7064

This is the base class for all hybrid systems. The hybrid systems use two different modulus operations, one equal to the number of characters in the checksum characters (`indices`) and the greater then that.

### Properties

The Hybrid7064 class inherits all properties from ISO7064.

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized value used for checksum calculations                |
| checksum  | `string\|number` | `string`  | the single or double digit/character checksum                      |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 11-2

The ISO 7064, MOD 11-2 algorithm is used by several standards, including

-   [ORCID](https://en.wikipedia.org/wiki/ORCID)
-   [International Standard Name Identifier](https://en.wikipedia.org/wiki/International_Standard_Name_Identifier)
-   [Resident Identity Card](https://en.wikipedia.org/wiki/Resident_Identity_Card)

### Properties

| property      | type                                                 | value                |
| ------------- | ---------------------------------------------------- | -------------------- |
| algorithm     | string                                               | `MOD 11-2`           |
| specification | string                                               | `ISO 7064, MOD 11-2` |
| designation   | number                                               | `1`                  |
| modulus       | number                                               | `11`                 |
| radix         | number                                               | `2`                  |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789`         |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789X`        |
| double        | boolean                                              | `false`              |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized numeric value used for checksum calculations        |
| checksum  | `string\|number` | `string`  | the single digit or `X` character checksum                         |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 11,10

The ISO 7064, MOD 11,10 algorithm is used by several standards, including

-   [Personal identification number](<https://en.wikipedia.org/wiki/Personal_identification_number_(Croatia)>)

### Properties

| property      | type                                                 | value                 |
| ------------- | ---------------------------------------------------- | --------------------- |
| algorithm     | string                                               | `MOD 11,10`           |
| specification | string                                               | `ISO 7064, MOD 11,10` |
| designation   | number                                               | `6`                   |
| modulus       | number                                               | `10`                  |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789`          |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789`          |
| double        | boolean                                              | `false`               |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized numeric value used for checksum calculations        |
| checksum  | `string\|number` | `string`  | the single digit checksum                                          |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 27,26

### Properties

| property      | type                                                 | value                        |
| ------------- | ---------------------------------------------------- | ---------------------------- |
| algorithm     | string                                               | `MOD 27,26`                  |
| specification | string                                               | `ISO 7064, MOD 27,26`        |
| designation   | number                                               | `7`                          |
| modulus       | number                                               | `26`                         |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| double        | boolean                                              | `false`                      |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized alphabetic value used for checksum calculations     |
| checksum  | `string\|number` | `string`  | the single character alphabetic checksum                           |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 37-2

The ISO 7064, MOD 37-2 algorithm is used by several standards, including

-   [ISBT 128](https://en.wikipedia.org/wiki/ISBT_128)

### Properties

| property      | type                                                 | value                                   |
| ------------- | ---------------------------------------------------- | --------------------------------------- |
| algorithm     | string                                               | `MOD 37-2`                              |
| specification | string                                               | `ISO 7064, MOD 37-2`                    |
| designation   | number                                               | `2`                                     |
| modulus       | number                                               | `37`                                    |
| radix         | number                                               | `2`                                     |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`  |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*` |
| double        | boolean                                              | `false`                                 |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized alphanumeric value used for checksum calculations   |
| checksum  | `string\|number` | `string`  | the single character alphanumeric or `*` checksum                  |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 37,36

The ISO 7064, MOD 37,36 algorithm is used by several standards, including

-   [Global Release Identifier (GRid)](https://en.wikipedia.org/wiki/Global_Release_Identifier)

### Properties

| property      | type                                                 | value                                  |
| ------------- | ---------------------------------------------------- | -------------------------------------- |
| algorithm     | string                                               | `MOD 37,36`                            |
| specification | string                                               | `ISO 7064, MOD 37,36`                  |
| designation   | number                                               | `8`                                    |
| modulus       | number                                               | `36`                                   |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| double        | boolean                                              | `false`                                |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized alphanumeric value used for checksum calculations   |
| checksum  | `string\|number` | `string`  | the single character alphanumeric checksum                         |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 97-10

### Properties

| property      | type                                                 | value                 |
| ------------- | ---------------------------------------------------- | --------------------- |
| algorithm     | string                                               | `MOD 97-10`           |
| specification | string                                               | `ISO 7064, MOD 97-10` |
| designation   | number                                               | `3`                   |
| modulus       | number                                               | `97`                  |
| radix         | number                                               | `10`                  |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789`          |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789`          |
| double        | boolean                                              | `true`                |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized numeric value used for checksum calculations        |
| checksum  | `string\|number` | `string`  | the double digit checksum                                          |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 661-26

### Properties

| property      | type                                                 | value                        |
| ------------- | ---------------------------------------------------- | ---------------------------- |
| algorithm     | string                                               | `MOD 661-26`                 |
| specification | string                                               | `ISO 7064, MOD 661-26`       |
| designation   | number                                               | `4`                          |
| modulus       | number                                               | `661`                        |
| radix         | number                                               | `26`                         |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| double        | boolean                                              | `true`                       |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized alphabetic value used for checksum calculations     |
| checksum  | `string\|number` | `string`  | the double character alphabetic checksum                           |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

## MOD 1271-36

### Properties

| property      | type                                                 | value                                   |
| ------------- | ---------------------------------------------------- | --------------------------------------- |
| algorithm     | string                                               | `MOD 1271-36`                           |
| specification | string                                               | `ISO 7064, MOD 1271-36`                 |
| designation   | number                                               | `5`                                     |
| modulus       | number                                               | `1271`                                  |
| radix         | number                                               | `36`                                    |
| indices       | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`  |
| alphabet      | [Alphabet](https://github.com/konfirm/node-alphabet) | `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*` |
| double        | boolean                                              | `true`                                  |

### Methods

| method    | input            | output    | description                                                        |
| --------- | ---------------- | --------- | ------------------------------------------------------------------ |
| normalize | `string\|number` | `string`  | the normalized alphanumeric value used for checksum calculations   |
| checksum  | `string\|number` | `string`  | the double character alphanumeric checksum                         |
| validate  | `string\|number` | `boolean` | validate the provided string (including checksum)                  |
| generate  | `string\|number` | `string`  | calculate and append the checksum to the (normalized) input        |
| factory   | `object`         | `ISO7064` | Create a new instance, override provided options, inherit the rest |

# Credits

There a quite a few implementations of the ISO 7064 specification in various programming languages. From some we've taken the libery of using (parts of) the data samples for the unit tests.

-   [LiosK/cdigit JavaScript ](https://github.com/LiosK)
-   [danieltwagner/iso7064 Java](https://github.com/danieltwagner/iso7064)

# License

MIT License Copyright (c) 2019-2022 Rogier Spieker (Konfirm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
