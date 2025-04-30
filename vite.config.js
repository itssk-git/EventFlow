import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

const ASSET_URL = process.env.VITE_APP_URL || '';

export default defineConfig({
    base: `${ASSET_URL}`,
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react()
    ],
});
