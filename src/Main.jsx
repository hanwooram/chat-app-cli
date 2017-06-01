import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ChatApp from './ChatApp.jsx'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(ChatApp)

if (module.hot) {
  console.log('module.hot: ', module.hot);
  module.hot.accept('./ChatApp.jsx', () => { render(ChatApp) })
}
