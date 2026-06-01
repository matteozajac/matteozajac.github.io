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
                globalTap: resolve(__dirname, 'projects/global-tap.html'),
                speakNewYork: resolve(__dirname, 'projects/speak-new-york.html'),
                spatialExperiments: resolve(__dirname, 'projects/spatial-experiments.html'),
                metka: resolve(__dirname, 'projects/metka.html'),
                prayerbook: resolve(__dirname, 'projects/prayerbook.html'),
                globalTapPrivacy: resolve(__dirname, 'global-tap/privacy.html'),
                globalTapTerms: resolve(__dirname, 'global-tap/terms.html'),
                globalTapSupport: resolve(__dirname, 'global-tap/support.html'),
                speakNewYorkPrivacy: resolve(__dirname, 'speak-new-york/privacy.html'),
                speakNewYorkTerms: resolve(__dirname, 'speak-new-york/terms.html'),
                speakNewYorkSupport: resolve(__dirname, 'speak-new-york/support.html'),
            },
        },
    },
})
