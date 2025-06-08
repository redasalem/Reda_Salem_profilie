import { defineConfig } from 'vite'
import path from 'path'
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  // Base URL for GitHub Pages
  base: '/Reda_Salem_profilie/',

  // Build Configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimize chunks
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
    
  },

  // Plugins
  plugins: [
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 30, // زيادة جودة الصور قليلاً
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false // تغيير لتجنب مشاكل SVG
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],

  // Resolve Aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  // Development Server
  server: {
    port: 3000,
    open: true,
    cors: true
  }
})