import styles from './panel.module.css'
import PanelExplorer from './Components/PanelExplorer'

const QuickAccessPanel = () => {
	return <div className={styles.panel}>
		<PanelExplorer />
	</div>
}

export default QuickAccessPanel