import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      // Allow Heroku subdomains and your custom domains, or set to true to allow any host
      allowedHosts: [
        'phonixiafund-1c7dbdac42f6.herokuapp.com',
        'phonixia.fund',
        'www.phonixia.fund',
        'phonixia.online',
        'www.phonixia.online',
        '.herokuapp.com',
      ],
    },
  };
});