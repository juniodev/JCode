interface Colors {
	primaryColor: string
	textColor: string
	iconColor: string
}

interface Icons {
	folder: {
		default: string
			folders: Record < string,
			string >
		}
	file: {
		default: string
			extensions: Record < string,
			string >
		}
}

interface EditorInstance {
		setThemeColors: (colors: Colors) => void
		setThemeIcons: (icons: Icons) => void
	}

interface PluginInstance {
		icons: Icons
		colors: Colors
		onPluginInitialize: (editor: EditorInstance) => void
	}

class JCodePluginManager {
	
		public icons: Icons
	
		private plugins: PluginInstance[] = []
		private initialized: boolean = false
		

		constructor() {
			this.plugins = []
		}

		public loadPlugin(plugin: PluginInstance) {
			if (!plugin.onPluginInitialize) {
				throw Error('Nao foi possivel inicializar o plugin')
			}
			plugin.onPluginInitialize(this)
			this.plugins.push(plugin)
		}

		setThemeIcons(icons: Icons) {
			this.icons = icons;
		}
		setThemeColors(colors: Colors) {
			
			const style = document.documentElement.style
			
			Object.assign(document.documentElement.style, {
				'background-color': colors.backgroundColor
			})
			const metaThemeColor = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]')
			if (metaThemeColor) {
				metaThemeColor.setAttribute('content', colors.secondaryColor)
			}
			
			style.setProperty('--text-color', colors.textColor)
		}

}

export default JCodePluginManager