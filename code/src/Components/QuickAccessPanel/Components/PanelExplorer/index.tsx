import styles from './explorer.module.css'

import {
	useEffect
} from 'react'

import {
	loadProject
} from './Hooks/LoadProject'

import ListExplorer from './Components/ListExplorer'

const PanelExplorer = () => {

	const {
		load,
		list
	} = loadProject()

	return <div className={styles.list}>
		{
			list && <ListExplorer list={list}/>
		}
	</div>
}

export default PanelExplorer