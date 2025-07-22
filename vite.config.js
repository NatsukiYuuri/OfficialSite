// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: './docs',               // index.html がある場所
  base: '/OfficialSite/',       // 追加：開発・本番で共通のベースパス
  build: {
    outDir: './docs/OfficialSite/', // 出力先を指定（相対パス注意）
    emptyOutDir: true,
  },
});