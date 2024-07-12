import { useState, useEffect } from 'react'

import { api } from '../../../../../Core/Api'

export const loadProject = () => {
	
	const [list, setList] = useState()
	const [loading, setLoading] = useState<boolean>(false)
	
	useEffect(() => {
		load()
	}, [])
	
	const load = async () => {
		try {
			
			const { data } = await api.get('/list/folders')
			
			setList(data)
			
		} catch (error) {
			setTimeout(function() {
				console.log(error)
			}, 10000);
		}
	}
	
	return {
		loading,
		list,
		load
	}
}