import {
	createContext,
	useState,
	useEffect,
	type ReactNode
} from 'react'

import JCodePluginManager from '../../Core/JCodePluginManager'

import DefaultPluginTheme from '../../../../plugins/themes/default'

interface Context {
	loading: boolean
	icons: any
}

export const PluginContext = createContext < Context | undefined > (undefined)

const JCodePluginProvider = ({
	children
}: {
	children: ReactNode
}) => {

	const [loading, setLoading] = useState <boolean>(true)
	const [icons, setIcons] = useState()

	useEffect(() => {
		const manager = new JCodePluginManager()
		manager.loadPlugin(DefaultPluginTheme)
		setIcons(manager.icons)
	}, [])


	return <PluginContext.Provider value={ { loading, icons }}>
		{children}
	</PluginContext.Provider>
}

export default JCodePluginProvider