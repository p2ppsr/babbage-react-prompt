# @babbage/react-prompt

Onboards users to the Babbage MetaNet Client before loading your app. You can give Urls for your:

1. Browser app
  - Mainnet and/or Testnet
2. Native app
  - Mainnet and/or Testnet
  
This allows your user to choose the most appropriate version of your app for their current needs. 

## Usage

Wrap your app (or the part of it that requires the Babbage SDK to work) with this component. The child components will only render once Babbage Desktop is running.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import BabbagePrompt from '@babbage/react-prompt'
import App from './App'

ReactDOM.render(
  <BabbagePrompt
    appName='Your App'
    author='Your Name'
    authorUrl='https://yourwebsite.com'
    description='The app description can go here,\nand can contain multiple lines'
    appIcon='/icon.png'
    appImages=[
      '/image1.png',
      '/image2.jpg'
    ]
    supportedMetaNet='mainnet' // 'universal' is the default (app works on both Mainnet & Testnet) or value can be just 'mainnet' or 'testnet'
    browserAppUrl={{
      mainnet: 'https://yourBrowserMainnetlink.com',
      testnet: 'https://yourBrowserTestnetlink.com'
    }}
    nativeAppUrls= {{
      iOS: {
        mainnet: 'https://youriOSappMainnetlink.com',
        testnet: 'https://youriOSappTestnetlink.com'
      },
      Android: {
        mainnet: 'https://yourAndroidappMainnetlink.com',
        testnet: 'https://yourAndroidappTestnetlink.com'
      }
    }}
  >
    <App>
  </BabbagePrompt>,
  document.getElementById('root')
)
```

Your app will only be rendered once the user has installed the Babbage MetaNet Client. Otherwise, they will see a modal with instructions on how to get it set up.

## Props

Various props can be used to control the component:

Prop Name           | Description
--------------------|------------------------------------------
`children`          | This is your entire React app. When Babbage is running, your app will be allowed to render. Otherwise, the React Prompt will be shown.
`appName`           | Sets the name of the app in the UI.
`appIcon`           | A URL to an image to use as your app icon.
`description`       | A paragraph that describes your app. If it contains the `\n` character, it will be split and a "Learn More" link will be shown.
`author`            | Shown below your app name.
`authorUrl`         | If provided, the author text becomes a clickable link that navigates to the given URL.
`appImages`         | An array of strings, each containing a relative or absolute URL to an image that will be added to the app preview carousel.
`supportedMetaNet`  | A string that indicates which networks your App supports. 'universal' (default value) means both Mainnet and Testnet are supported, while a value of 'testnet' means you only support Testnet (i.e. Stageline) and a value of 'mainnet' means you  only support Mainnet (i.e. Mainline).
`browserAppUrl`     | If provided, an object that contains your browser App URLs. The keys are of the form: `mainnet` and `testnet`.
`nativeAppUrls`     | If provided, an object that contains your native App URLs. The first level keys are of the form: `iOS`, `Android`, `Windows Phone`, `Windows`, `Mac OS`. These have a sub-object with keys of the form: `mainnet` and `testnet`
## License

The code in this repository is licensed under the Open BSV License.
