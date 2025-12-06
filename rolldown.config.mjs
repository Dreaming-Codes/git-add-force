import { defineConfig } from 'rolldown';

const production = process.argv.includes('--production') || process.env.NODE_ENV === 'production';

export default defineConfig({
	input: 'src/extension.ts',
	output: {
		file: 'dist/extension.js',
		format: 'cjs',
		sourcemap: !production,
	},
	platform: 'node',
	external: ['vscode'],
	minify: production,
});
