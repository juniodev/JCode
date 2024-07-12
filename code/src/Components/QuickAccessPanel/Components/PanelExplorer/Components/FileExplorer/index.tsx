import styles from './explorer.module.css'
import { useState, useContext, useEffect } from 'react'

import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'

import { selectFileExplorer } from './SelectFileExplorer'

import ListExplorer from '../ListExplorer'

import { ExploreContext } from '../../Context/ExploreProvider'

interface Props {
	id: string
	path,
	type,
	directories
}

const FileExplorer = ({
	id,
	type,
	path,
	directories
}: Props) => {
	
	const {
		expandeds,
		isExpanded,
		setFolderExpand
	} = useContext(ExploreContext)
	
	const {
		selectIcon
	} = selectFileExplorer()
	
	return <>
		<div key={id} className={styles.ctn} onClick={() => {
			setFolderExpand(id, type)
		}} >
			<div className={styles.box}>
				{
					type === 'directory' && <MdOutlineExpandMore className={styles.icon} />
				}
				<img
					src={selectIcon(path, type)}
					onContextMenu={(e) => e.preventDefault()}
				/>
				<span>{path}</span>
			</div>
		</div>
		
		{
			isExpanded(id, type) && directories && <ListExplorer list={directories} marginLeft="8px" />
		}
	</>
}

export default FileExplorer