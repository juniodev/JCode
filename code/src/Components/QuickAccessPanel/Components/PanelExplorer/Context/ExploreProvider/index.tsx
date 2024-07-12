import {
	createContext,
	useState,
	type ReactNode
} from 'react'

import { useExploreManager } from '../../Hooks/UseExploreManager'

interface Context {
	expandeds
	isExpanded
	setFolderExpand
}

export const ExploreContext = createContext<Context | undefined>(undefined)

const ExploreProvider = ({
	children
}: {
	children: ReactNode
}) => {

	const {
		expandeds,
		isExpanded,
		setFolderExpand
	} = useExploreManager()
	
	return <ExploreContext.Provider value={ {
		expandeds,
		isExpanded,
		setFolderExpand
	}}>
		{children}
	</ExploreContext.Provider>
}

export default ExploreProvider