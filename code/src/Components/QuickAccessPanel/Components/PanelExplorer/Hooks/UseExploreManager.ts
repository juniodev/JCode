import { useState, useEffect } from 'react'

export const useExploreManager = () => {
	
	const [expandeds, setExpanded] = useState<{
		key: string
		expanded: boolean
	}[]>([])
	
	const isExpanded = (key: string, type: 'directory' | 'file') => {
		if (type !== 'directory') return 
		const index = expandeds.findIndex(o => o.key === key)
		return index !== -1 ? expandeds[index].expanded : false
	}
	
	const setFolderExpand = (key: string, type: 'file' | 'directory') => {
		if (type !== 'directory') return
		const index = expandeds.findIndex(o => o.key === key)
		if (index === -1) {
			setExpanded(prev => {
				const state = [
					...expandeds,
					{
						key: key,
						expanded: true
					}
				]
				saveExploreState(state)
				return state
			}); return
		}
		const exploreState = expandeds.map(o => {
			if (o.key === key) {
				return {
					...o,
					expanded: !o.expanded
				}
			}
			return o
		})
		setExpanded(exploreState)
		saveExploreState(exploreState)
	}
	
	const saveExploreState = (state) => {
		localStorage.setItem('explore.state', JSON.stringify(state))
	}
	
	useEffect(() => {
		const state = localStorage.getItem('explore.state')
		if (state) {
			setExpanded(JSON.parse(state))
		}
	}, []);
  
	return {
		expandeds,
		isExpanded,
		setFolderExpand
	}
}