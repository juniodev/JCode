import styles from './ctn.module.css'

import { ReactNode } from 'react'

interface Props {
	open: boolean
	children: ReactNode
}

const ContainerPanel = ({ children, open }: Props) => {
	return <div 
		style={{
			maxWidth: open ? '250px' : '0px'
		}} 
		className={styles.ctn}>
		{children}
	</div>
}

export default ContainerPanel