import styles from './explorer.module.css'

import { selectIcon } from './SelectFileExplorer'

interface Props {
	key,
	path
}

const FileExplorer = ({
	key,
	path
}: Props) => {
	
	const {
		loadFileFolderIcon
	} = useSelectIcons()
	
	return <>
		<div key={key} className={styles.card}>
			<img
				src={loadFileFolderIcon(path, type)}
				onContextMenu={(e) => e.preventDefault()}
			/>
			<span>{path}</span>
		</div>
	</>
}

export default FileExplorer