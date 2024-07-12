const PluginDefaultTheme = {
	colors: {
		backgroundColor: '#282A36',
		secondaryColor: '#20232A',
		textColor: '#FFF',
		iconColor: '#FFF'
	},
	icons: {
		folder: {
			default: 'icons/folder.svg',
			folders: {
				'src': 'icons/folder_src.svg',
				'test': 'icons/folder_test.svg',
				'dist': 'icons/folder_dist.svg',
				'core': 'icons/folder_core.svg',
				'public': 'icons/folder_public.svg',
				'asset': 'icons/folder_asset.svg',
				'plugin': 'icons/folder_plugin.svg',
				'component': 'icons/folder_component.svg',
				'context': 'icons/folder_context.svg',
				'util': 'icons/folder_utils.svg',
				'controller': 'icons/folder_controller.svg',
				'route': 'icons/folder_route.svg',
				'node_modules': 'icons/folder_node.svg'
			}
		},
		especificFiles: {
			'.env.local': 'icons/env.svg',
			'.eslintrc.cjs': 'icons/eslint.svg',
			'.gitignore': 'icons/git.svg',
			'yarn.lock': 'icons/yarn.svg',
			'tsconfig.json': 'icons/tsconfig.svg',
			'routing': 'icons/routing.svg',
			'tsconfig.app.json': 'icons/tsconfig.svg',
			'tsconfig.node.json': 'icons/tsconfig.svg',
			'package.json': 'icons/nodejs.svg',
			'.nvmrc': 'icons/nodejs.svg',
		},
		file: {
			default: 'icons/file.svg',
			extensions: {
				'js': 'icons/js.svg',
				'ts': 'icons/typescript.svg',
				'html': 'icons/html.svg',
				'css': 'icons/css.svg',
				'md': 'icons/readme.svg',
				'json': 'icons/json.svg',
				'svg': 'icons/svg.svg',
				'tsx': 'icons/react.svg',
				'scss': 'icons/sass.svg'
			}
		}
	},
	onPluginInitialize(app) {
		app.setThemeIcons(this.icons)
		app.setThemeColors(this.colors)
	}
}

export default PluginDefaultTheme