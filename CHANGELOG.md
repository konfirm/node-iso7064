# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
### Added
### Changed
### Removed

## [2.1.1] - 2022-08-15

### Fixed

- Normalization using the ISO7064 Abstract class is now able to normalize remove all non-alphanumeric characters if no indices are set

### Changed

- Updated dependencies
- Added support for running scripts on both Windows and *NIX-like systems
- Moved from Travis to GitHub Actions

## [2.1.0] - 2021-06-16

Ported ISO7064 to Typescript

### Added

- Typescript types
- ES Module compatibility


## [2.0.1] - 2020-09-06

### Changed

- Updated dependencies


## [2.0.0] - 2019-08-27

### Changed

- Switched to instances instead of a fully static approach
- Alphabet is now exported


## [1.0.2] - 2019-08-26

### Changed

- Updated dependency @konfirm/alphabet
- Updated default specification


## [1.0.1] - 2019-07-15

### Changed

- Updated dependencies (CVE-2019-10744 on lodash < 4.17.13 (sub) dev dependency)


## [1.0.0] - 2019-07-02

Initial release

[unreleased]: https://github.com/konfirm/node-iso7064/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/konfirm/node-iso7064/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/konfirm/node-iso7064/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/konfirm/node-iso7064/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/konfirm/node-iso7064/compare/v1.0.2...v2.0.0
[1.0.2]: https://github.com/konfirm/node-iso7064/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/konfirm/node-iso7064/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/konfirm/node-iso7064/releases/tag/v1.0.0
