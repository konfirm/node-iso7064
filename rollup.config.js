import typescript from '@rollup/plugin-typescript';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import declaration from 'rollup-plugin-dts'
import { main, module, types } from './package.json';

const defaults = {
	name: 'Checksum',
	sourcemap: true,
};

function configure(...args) {
	return args.reduce((carry, options) => {
		const basic = { ...defaults, ...options };
		const min = {
			...basic,
			file: basic.file.replace(/(\.[a-z]+)$/, '.min$1'),
			plugins: [terser({ format: { comments: false } })],
		};

		return carry.concat(basic, min);
	}, []);
}

export default [
	{
		input: 'source/main.ts',
		output: configure(
			{ file: main, format: 'cjs' },
			{ file: module, format: 'es' },
		),
		plugins: [resolve({ exportConditions: ['node'] }), common(), typescript(), common()],
	},
	{
		input: 'temp/main.d.ts',
		output: { file: types, format: 'es' },
		plugins: [declaration()],
	}
];
