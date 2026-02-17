import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects.html'),
                sessions: resolve(__dirname, 'sessions.html'),
                masseter: resolve(__dirname, 'projects/masseter.html'),
                geniusIq: resolve(__dirname, 'projects/genius-iq.html'),
                joinourday: resolve(__dirname, 'projects/joinourday.html'),
                spatialExperiments: resolve(__dirname, 'projects/spatial-experiments.html'),
            },
        },
    },
})
