import styles from './list.module.scss'

import FileExplorer from '../FileExplorer/'

interface Props {
	marginChildrenMarginLeft?: string
	style: Record<string, any>
	list: any
	marginLeft?: string
}

const ListExplorer = ({ list, marginChildrenMarginLeft, ...props }: any) => {
	
	
	if (!list) return <></>
	return <>
		{
			list.map((v, i) => {
				return <div 
					{...props} 
					className={styles.list} 
					key={v.path}
					style={{
						marginLeft: marginChildrenMarginLeft
					}}
				>
					<FileExplorer 
						id={v.full_path}
						type={v.type} 
						path={v.path}
						directories={v.directories}
					/>
				</div>
			})
		}
	</>
}

export default ListExplorer