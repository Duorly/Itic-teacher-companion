export default defineAppConfig({
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    ui: {
        colors: {
            primary: 'pink',      // #d23a8c - Rose vif
            secondary: 'sky',     // #a7d7ee - Bleu clair
            success: 'purple',    // #7f4494 - Violet
            info: 'blue',         // #1387c9 - Bleu moyen
            warning: 'pink',      // Utilise pink-700 (#b63e8f)
            error: 'cyan',        // #276bb1 - Bleu profond
            neutral: 'slate'
        }
    }
})
