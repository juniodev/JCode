import styles from './explorer.module.css'

import {
	useEffect
} from 'react'

import {
	loadProject
} from './Hooks/LoadProject'

import ExploreProvider from './Context/ExploreProvider'

import ListExplorer from './Components/ListExplorer'

const PanelExplorer = () => {

	const {
		load,
		list
	} = loadProject()
	
	return <>
		<ExploreProvider>
			 <div className={styles.list}>
				{
					list && <ListExplorer list={list}/>
				}
			</div>
		</ExploreProvider>
	</>
}

export default PanelExplorer