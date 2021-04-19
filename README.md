# @babbage/react-prompt

Onboards users to Babbage Desktop before loading your app

## Usage

Wrap your app (or the part of it that requires the Babbage SDK to work) with this component. The child components will only render once Babbage Desktop is running.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import BabbagePrompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <BabbagePrompt appName='Your App'>
    <App>
  </BabbagePrompt>,
  document.getElementById('root')
)
```

Your app will only be rendered once the user has installed Babbage Desktop. Otherwise, they will see a modal with instructions on how to get it set up.

## License

The code in this repository is licensed under the Open BSV License.
