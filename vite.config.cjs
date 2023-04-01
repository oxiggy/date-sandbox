const { default:react } = require('@vitejs/plugin-react')
const { default:tsconfigPaths } = require('vite-tsconfig-paths')
const svgr = require('vite-plugin-svgr')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = {
    plugins: [react(), svgr(), tsconfigPaths()],
    root: 'src',
    publicDir: 'assets',
    envPrefix: 'PUBLIC_',
    manifest: true,
    build: {
        manifest: true,
        outDir: '../build',
    },
    server: {
        open: true,
        port: 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
    }
}
