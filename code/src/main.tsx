import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import QuickAccessPanel from './Components/QuickAccessPanel'
import JCodePluginProvider from './Context/PluginProvider'
import JCodeHomeEditor from './Pages/Home'
import HeaderBar from './Components/HeaderBar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  	<JCodePluginProvider>
  		<main>
  			<QuickAccessPanel />
  		</main>
  	</JCodePluginProvider>
  </React.StrictMode>
)
