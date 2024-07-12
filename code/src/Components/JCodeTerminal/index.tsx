import styles from './term.module.scss'

import {
	useTerminal
} from './UseTerminal'

const JCodeTerminal = () => {

	const {
		refTerm
	} = useTerminal()

	return (
		<>
			<div className={styles.box}>
				<div
					className={styles.terminal}
					style={ {
						width: '100%',
						height: '380px'
					}}
					ref={refTerm}
					/>
				<button id='focus' style={ {
					height: '1px',
					width: '1px',
					position: 'absolute',
					left: '-9999px'
				}} />
			</div>
		</>
	)
}

export default JCodeTerminal