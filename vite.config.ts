import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      {
        name: 'root-logo-handler',
        buildStart() {
          const rootLogo = path.resolve(__dirname, 'logo.jpeg');
          const publicDir = path.resolve(__dirname, 'public');
          const publicLogo = path.resolve(publicDir, 'logo.jpeg');
          if (fs.existsSync(rootLogo)) {
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            fs.copyFileSync(rootLogo, publicLogo);
          }
        },
        closeBundle() {
          const rootLogo = path.resolve(__dirname, 'logo.jpeg');
          const distLogo = path.resolve(__dirname, 'dist/logo.jpeg');
          if (fs.existsSync(rootLogo) && fs.existsSync(path.resolve(__dirname, 'dist'))) {
            fs.copyFileSync(rootLogo, distLogo);
          }
        }
      }
    ],
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