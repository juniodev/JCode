import {
	defineConfig
} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig( {
	define: {
    'process.env': {
      HOME: process.env.HOME
    }
  },
	server: {
		host: '127.0.0.1',
		port: 3000,
		fs: {
      allow: [
      '..'
      ],
    },
	},
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: any) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	}
})