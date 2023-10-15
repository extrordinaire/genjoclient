import preact from '@preact/preset-vite'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [preact()],
    server: {
      port: Number(env.PORT),
    },
    resolve: {
      alias: {
        // Alias $components to the actual folder path
        '@src': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@server': path.resolve(__dirname, './src/server'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },
  }
})

