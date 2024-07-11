import { useContext } from 'react'
import { PluginContext } from '../../../../Context/PluginProvider'

export const selectFileExplorer = () => {
	
	const { icons } = useContext(PluginContext)
	
	const selectIcon = (name, type) => {
		if (type === 'directory') {
			return `http://localhost:3001/${icons.folder.folders[name] ?? icons.folder.folders[name.slice(0, -1)] ?? icons.folder.default}`
		}
		const ext = name.split('.').pop()
		return `http://localhost:3001/${icons.especificFiles[name] ?? icons.file.extensions[ext] ?? icons.file.default}`
	}
	
	return {
		selectIcon
	}
}