import React from 'react'
import ReactDOM from 'react-dom'
import BabbagePrompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <BabbagePrompt appName='Example App'>
    <App />
  </BabbagePrompt>,
  document.getElementById('root')
)
