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
                airpongMotion: resolve(__dirname, 'projects/airpong-motion.html'),
                speakNewYork: resolve(__dirname, 'projects/speak-new-york.html'),
                spatialExperiments: resolve(__dirname, 'projects/spatial-experiments.html'),
                metka: resolve(__dirname, 'projects/metka.html'),
                prayerbook: resolve(__dirname, 'projects/prayerbook.html'),
                hopsa: resolve(__dirname, 'projects/hopsa.html'),
                globalTapPrivacy: resolve(__dirname, 'global-tap/privacy.html'),
                globalTapTerms: resolve(__dirname, 'global-tap/terms.html'),
                globalTapSupport: resolve(__dirname, 'global-tap/support.html'),
                airpongMotionPrivacy: resolve(__dirname, 'airpong-motion/privacy.html'),
                airpongMotionTerms: resolve(__dirname, 'airpong-motion/terms.html'),
                airpongMotionSupport: resolve(__dirname, 'airpong-motion/support.html'),
                speakNewYorkPrivacy: resolve(__dirname, 'speak-new-york/privacy.html'),
                speakNewYorkTerms: resolve(__dirname, 'speak-new-york/terms.html'),
                speakNewYorkSupport: resolve(__dirname, 'speak-new-york/support.html'),
                twinglyphIndex: resolve(__dirname, 'twinglyph/index.html'),
                twinglyphPrivacy: resolve(__dirname, 'twinglyph/privacy.html'),
                twinglyphSupport: resolve(__dirname, 'twinglyph/support.html'),
                twinglyphTerms: resolve(__dirname, 'twinglyph/terms.html'),
                hopsaPrivacy: resolve(__dirname, 'hopsa/privacy.html'),
                hopsaTerms: resolve(__dirname, 'hopsa/terms.html'),
                hopsaSupport: resolve(__dirname, 'hopsa/support.html'),
                hopsaPolishPrivacy: resolve(__dirname, 'hopsa/pl/privacy.html'),
                hopsaPolishTerms: resolve(__dirname, 'hopsa/pl/terms.html'),
                hopsaPolishSupport: resolve(__dirname, 'hopsa/pl/support.html'),
            },
        },
    },
})
