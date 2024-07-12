import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'


import store from './store'
import { increment, decrement} from './counter'

import { useSelector, useDispatch } from 'react-redux'


import JCodeTerminal from './Components/JCodeTerminal'

import QuickAccessPanel from './Components/QuickAccessPanel'
import JCodePluginProvider from './Context/PluginProvider'
import JCodeHomeEditor from './Pages/Home'
import HeaderBar from './Components/HeaderBar'


ReactDOM.createRoot(document.getElementById('root')!).render(
  	<Provider store={store}>
	  	<JCodePluginProvider>
	  		<main>
	  			<JCodeTerminal />
	  			<QuickAccessPanel />
	  		</main>
	  	</JCodePluginProvider>
  	</Provider>
)
