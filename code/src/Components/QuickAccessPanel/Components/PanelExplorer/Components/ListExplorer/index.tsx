import FileExplorer from '../FileExplorer/'
//import { v4 as uuid } from 'uuid'
interface Props {
	list: any
	marginLeft?: string
}

const ListExplorer = ({
	list,
	marginLeft
}: Props) => {
	return <>
		{
			list.map((v, i) => {
				return <div style={{
					marginLeft: marginLeft
				}} key={v.path}>
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