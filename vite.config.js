import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects.html'),
                sessions: resolve(__dirname, 'sessions.html'),
                agentSkills: resolve(__dirname, 'agent-skills.html'),
                masseter: resolve(__dirname, 'projects/masseter.html'),
                geniusIq: resolve(__dirname, 'projects/genius-iq.html'),
                joinourday: resolve(__dirname, 'projects/joinourday.html'),
                spatialExperiments: resolve(__dirname, 'projects/spatial-experiments.html'),
                metka: resolve(__dirname, 'projects/metka.html'),
                prayerbook: resolve(__dirname, 'projects/prayerbook.html'),
            },
        },
    },
})
