import styles from './explorer.module.css'
import { useState } from 'react'

import { selectFileExplorer } from './SelectFileExplorer'

import ListExplorer from '../ListExplorer'

interface Props {
	key,
	path
}

const FileExplorer = ({
	key,
	type,
	path,
	directories
}: Props) => {
	
	const [expand, setExpand] = useState<boolean>(false)
	
	const {
		selectIcon
	} = selectFileExplorer()
	
	const handleExpandList = () => {
		if (type === 'directory') {
			setExpand(!expand)
		}
	}
	
	return <>
		<div key={key} className={styles.ctn} onClick={handleExpandList}>
			<img
				src={selectIcon(path, type)}
				onContextMenu={(e) => e.preventDefault()}
			/>
			<span>{path}</span>
		</div>
		{
			expand && directories && <ListExplorer list={directories} marginLeft="15px" />
		}
	</>
}

export default FileExplorer