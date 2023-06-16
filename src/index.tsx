import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from 'store/store'
import { WebsocketProvider, socket } from 'contexts/WebsocketContext'

import App from './App'

import './index.css'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <WebsocketProvider value={socket}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WebsocketProvider>
  </Provider>
)
