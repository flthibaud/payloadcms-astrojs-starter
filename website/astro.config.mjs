// @ts-check
import { defineConfig } from 'astro/config'
import { loadEnv } from 'payload/node'
import tailwindcss from "@tailwindcss/vite";
import node from '@astrojs/node'

loadEnv()

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()]
  }
})
