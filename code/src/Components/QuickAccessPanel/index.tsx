import styles from './panel.module.css'
import {
	ReactNode
} from 'react'

import ContainerPanel from './Components/ContainerPanel'
import PanelExplorer from './Components/PanelExplorer'

import {
	FaFolder
} from 'react-icons/fa6'

const QuickAccessPanel = () => {
	return <div className={styles.panel}>
		<div className={styles.options}>
			<FaFolder className={styles.icon} />
		</div>
		<div className={styles.divider} />
		<ContainerPanel open={true}>
			<PanelExplorer />
		</ContainerPanel>
	</div>
}

export default QuickAccessPanel