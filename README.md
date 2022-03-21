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
  <BabbagePrompt
    customPrompt
    appName='Your App'
    author='Your Name'
    authorUrl='https://yourwebsite.com'
    description='The app description can go here,\nand can contain multiple lines'
    appIcon='/icon.png'
    appImages=[
      '/image1.png',
      '/image2.jpg'
    ]
  >
    <App>
  </BabbagePrompt>,
  document.getElementById('root')
)
```

Your app will only be rendered once the user has installed Babbage Desktop. Otherwise, they will see a modal with instructions on how to get it set up.

## Props

Various props can be used to control the component:

Prop Name      | Description
---------------|------------------------------------------
`children`     | This is your entire React app. When Babbage is running, your app will be allowed to render. Otherwise, the React Prompt will be shown.
`customPrompt` | Can be `false` (the default) or `true`. When false, only uses the `appName` prop and shows a basic UI. When `true`, uses all props to show a more advanced UI with an app description and preview screenshots.
`appName`      | Sets the name of the app in the UI.
`appIcon`      | A URL to an image to use as your app icon.
`description`  | A paragraph that describes your app. If it contains the `\n` character, it will be split and a "Learn More" link will be shown.
`author`       | Shown below your app name.
`authorUrl`    | If provided, the author text becomes a clickable link that navigates to the given URL.
`appImages`    | An array of strings, each containing a relative or absolute URL to an image that will be added to the app preview carousel.

## License

The code in this repository is licensed under the Open BSV License.
