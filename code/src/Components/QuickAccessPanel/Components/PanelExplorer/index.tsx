import styles from './explore.module.scss'

import {
	useEffect,
	useState
} from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiFillFolderAdd, AiFillFileAdd } from 'react-icons/ai'

import {
	loadProject
} from './Hooks/UseLoadProject'

import ExploreProvider from './Context/ExploreProvider'

import ListExplorer from './Components/ListExplorer'

const PanelExplorer = () => {

	const {
		load,
		list
	} = loadProject()
	
	const [hidden, setHidden] = useState<boolean>(false)
	
	return <>
		<ExploreProvider>
			 <div className={styles.ctn}>
			 	
			 	<div className={styles.explore} onClick={() => setHidden(!hidden)}>
			 		<div>
				 		<MdKeyboardArrowDown className={styles.icon} />
				 		<span>EXPLORER</span>
			 		</div>
			 		
			 		<div>
			 			<AiFillFolderAdd className={styles.icon1}/>
			 			<AiFillFileAdd className={styles.icon2}/>
			 		</div>
			 	</div>
				
				<ListExplorer 
					list={list}
					style={{
						maxHeight: hidden ? '0px' : '2000px'
					}}
				/>
			</div>
		</ExploreProvider>
	</>
}

export default PanelExplorer