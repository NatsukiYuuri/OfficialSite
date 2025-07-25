import { defineConfig } from 'vite';
import path from 'path';
import glob from 'fast-glob';

// tsファイルをすべて取得
const inputFiles = Object.fromEntries(
  glob.sync('src/ts/**/*.ts').map(file => {
    // src/ts/foo/bar.ts → キーは foo/bar (拡張子なし)
    const relativePath = path.relative('src/ts', file).replace(/\.ts$/, '');
    return [relativePath, path.resolve(__dirname, file)];
  })
);

export default defineConfig({
  root: './docs', // index.html のある場所
  css: {
    preprocessorOptions: {
      stylus: {},
    },
  },
  build: {
    rollupOptions: {
      input: inputFiles,
      output: {
        entryFileNames: '[name].js',
        format: 'es', // <script>タグで使えるように
        inlineDynamicImports: false,  // これを追加
      },
      external: [], // 依存ライブラリを全て含める
    },
    outDir: 'assets/js',
    emptyOutDir: true,
    minify: true,
    lib: false, // ライブラリモードを使わない
  }
});