import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';
import liveReload from 'vite-plugin-live-reload';

function moveOutputPlugin() {
  return {
    name: 'move-output',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
      if (bundle['pages/index.html']) {
        bundle['pages/index.html'].fileName = 'index.html';
      }
    },
  };
}

function htmlPlugin(base) {
  const baseWithoutTrailingSlash = base.endsWith('/') ? base.slice(0, -1) : base;
  
  return {
    name: 'html-transform',
    transformIndexHtml(html, { filename }) {
      // 處理資源路徑，避免重複的基本路徑
      html = html.replace(
        new RegExp(`(src|href)="${baseWithoutTrailingSlash}/${baseWithoutTrailingSlash}/`, 'g'),
        `$1="${baseWithoutTrailingSlash}/`
      );
      
      // 處理內部頁面鏈接，包括相對路徑
      html = html.replace(/(href=")(?:\.\.\/pages\/|pages\/)(.*?\.html)/g, (match, p1, p2) => {
        const pageName = p2.replace('.html', '');
        return `${p1}${base}${pageName}`;
      });
      
      // 處理圖片路徑，移除 "../" 並直接指向 assets 目錄
      html = html.replace(/(src=")(\.\.\/assets\/.*?\.(png|jpg|jpeg|gif|svg))/g, (match, p1, p2) => {
        return `${p1}${base}assets/${p2.split('/').pop()}`;
      });
      
      return html;
    }
  }
}

export default defineConfig({
  base: '/web-layout-training-vite/',
  plugins: [
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    ViteEjsPlugin(),
    moveOutputPlugin(),
    htmlPlugin('/web-layout-training-vite/'),
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('pages/**/*.html')
          .map((file) => [
            path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: 'dist',
    assetsDir: 'assets',
  },
});