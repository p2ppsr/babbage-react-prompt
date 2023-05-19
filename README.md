Babbage React Prompt
====================

[![License](https://img.shields.io/badge/license-Open%20BSV-brightgreen)](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/LICENSE)

The Babbage React Prompt is a React component designed to simplify and streamline the onboarding process for users of your applications that require the Babbage MetaNet Client. It does this by ensuring that the MetaNet Client is running before rendering your application. If not, the user is greeted with an informative prompt that guides them through downloading and installing the correct MetaNet Client for their operating system.

Table of Contents
-----------------

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Props](#props)
-   [Caveats](#caveats)
-   [License](#license)

Features
--------

1.  **Onboarding Simplified**: The Babbage React Prompt removes the need for users to search for setup instructions for the MetaNet Client, which can be a hurdle to adoption. It ensures the client is installed and running before your application is loaded.
2.  **MetaNet Network Handling**: The component handles the different versions of your application that might exist on the MetaNet's mainnet and testnet networks, making it a powerful tool for alpha and beta testing.
3.  **Customization**: Customize the onboarding modal with your app's name, description, author, icon, and preview images.
4.  **Native App Support**: Specify links to your app's native versions on platforms like iOS and Android.

Installation
------------

To install Babbage React Prompt:

```sh
npm install @babbage/react-prompt
```

Usage
-----

Wrap your app (or the part of it that requires the Babbage SDK to work) with this component. Your app will only be rendered once the Babbage MetaNet Client is running. Here is an example:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import BabbagePrompt from '@babbage/react-prompt';
import App from './App';

ReactDOM.render(
  <BabbagePrompt
    appName='Your App'
    author='Your Name'
    authorUrl='https://yourwebsite.com'
    description='This is your app description.'
    appIcon='/icon.png'
    appImages={[
      '/image1.png',
      '/image2.jpg'
    ]}
    supportedMetaNet='mainnet'
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
    <App />
  </BabbagePrompt>,
  document.getElementById('root')
);
```

Props
-----

Refer to the table below for the various props that can be used with the Babbage React Prompt.

| Prop Name | Description |
| --- | --- |
| `children` | Your entire React app. When Babbage is running, your app will be allowed to render. Otherwise, the React Prompt will be shown. |
| `appName` | Sets the name of your app in the UI. |
| `appIcon` | A URL to an image to use as your app icon. |
| `description` | A paragraph that describes your app. |
| `author` | Shown below your app name. |
| `authorUrl` | If provided, the author text becomes a clickable link that navigates to the given URL. |
| `appImages` | An array of URLs to images that will be added to the app preview carousel. |
| `supportedMetaNet` | A string indicating which networks your app supports. Use `mainnet` for Mainnet support only, `testnet` for Testnet support only, and `universal` for both. Any other value will be treated as `mainnet` (the default). |
| `nativeAppUrls` | An object containing your native app URLs. The first level keys are: `iOS`, `Android`, `Windows Phone`, `Windows`, `Mac OS`. Each of these have a sub-object with keys `mainnet` and `testnet`. |

Caveats
-------

Please be aware that the Brave browser sometimes causes issues with desktop MetaNet Clients. If this occurs, the React Prompt is designed to instruct users on how to disable Brave Shields, which may impede your app's operation.

License
-------

The code in this repository is licensed under the [Open BSV License](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/LICENSE).