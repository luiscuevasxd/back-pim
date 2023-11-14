import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  outDir: 'build',
  minify: false,
  sourcemap: true,
  splitting: false,
  clean: true,
  bundle: false
});
