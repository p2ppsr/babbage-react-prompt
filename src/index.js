import React, { useState, useEffect } from 'react'
import { getNetwork, isAuthenticated } from '@babbage/sdk'
import Prompt from './components/Prompt'
import UnsupportedBrowser from './components/UnsupportedBrowser'
import BravePrompt from './components/BravePrompt'
import Theme from './components/Theme'
import { browserName, isMobile } from 'react-device-detect'
import isBraveShieldsActive from './utils/isBraveShieldsActive'
import { SUPPORTED_OS } from './utils/general'

const SUPPORTED_BROWSERS = ['Chrome', 'Chromium', 'Opera', 'Edge', 'Firefox']
const checkStatus = async () => {
  try {
    const authenticated = await isAuthenticated(undefined, false)
    if (authenticated === false) {
      return {
        authenticated: false,
        supportedBrowser: true
      }
    }
  } catch (e) {
    let supportedBrowser = false
    if (SUPPORTED_BROWSERS.includes(browserName) && isMobile === false) {
      // Babbage MetaNet Client is not active
      supportedBrowser = true
    }
    return {
      authenticated: false,
      supportedBrowser
    }
  }
  return {
    authenticated: true,
    supportedBrowser: true
  }
}
const checkRequiredNetwork = async (supportedMetaNet) => {
  // Check correct network is being used for this App
  const network = await getNetwork()
  if (network === 'test' && supportedMetaNet === 'mainnet') {
    // This App ONLY works with Mainnet - Mainline client
    return 'mainnet'
  } else if ( network === 'main' && supportedMetaNet === 'testnet') {
    // This App ONLY works with Testnet - Stageline client
    return 'testnet'
  }
  // This App can work with both networks (i.e. universal) - Either Mainline or Stageline client
  return 'default'
 }
const BabbageReactPrompt = ({
  children,
  appName = 'Example App',
  author = 'Example Author',
  authorUrl,
  appImages = [
    {
      mainnet: 'https://projectbabbage.com/assets/images/babbage-screenshot.png',
      testnet: 'https://projectbabbage.com/assets/images/babbage-screenshot.png'
    },
    {
      mainnet: 'https://projectbabbage.com/assets/images/authrite-spec.png',
      testnet: 'https://projectbabbage.com/assets/images/authrite-spec.png'
    }
  ],
  appIcon = {
    mainnet: 'https://projectbabbage.com/favicon.ico',
    testnet: 'https://projectbabbage.com/favicon.ico'
  },
  description = 'This is an example app description. Provide a paragraph or two that describes your app, so that people know what they\'re getting when they want to check it out.',
  supportedMetaNet = 'universal',//default, or should be 'mainnet'/'testnet'
  browserAppUrl='...', 
  // osName from react-device-detect offers the following: iOS, Android, Windows Phone, Windows, Mac OS, Linux
  nativeAppUrls= {
    iOS: '...',
    Android: '...',
    //'Windows Phone': '...',
    //Windows: '...',
    //'Mac OS': '...',
    //Linux: '...'
  }
}) => {
  const [authenticated, setAuthenticated] = useState(undefined) // Crucial: Set to undefined while we wait for authentication to return
  const [open, setOpen] = useState(null)
  const [supportedBrowser, setSupportedBrowser] = useState(true)
  const [braveShieldsDetected, setBraveShieldsDetected] = useState(false)

  useEffect(() => {
    (async () => {
      let status = await checkStatus()
      let requiredNetwork = 'default'
      if (status.authenticated === true) {
        requiredNetwork = await checkRequiredNetwork(supportedMetaNet)
      }
      while (status.authenticated === false 
        || requiredNetwork !== 'default') {
        setBraveShieldsDetected(isBraveShieldsActive())
        setOpen(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get Browser Status
        status = await checkStatus()
        if (status.authenticated === false 
          && authenticated !== undefined) {
          // Only interested in supported browser's status, if not authenticated
          setSupportedBrowser(status.supportedBrowser)
        } else {
          requiredNetwork = await checkRequiredNetwork(supportedMetaNet)
        }
        setAuthenticated(status.authenticated)
      }
      setOpen(false)
    })()
  }, [])

  Object.keys(nativeAppUrls).map((key, i) => {
    if (SUPPORTED_OS.includes(key) === false) {
      const e = new Error("nativeAppUrls param key must be in ['iOS', 'Android', 'Windows Phone', 'Windows', 'Mac OS', 'Linux']")
      e.code = 'ERR_INVALID_SUPPORTED_OS_PARAM'
      throw e
    }
  })
  if (supportedMetaNet !== 'universal' 
    && supportedMetaNet !== 'testnet'
    && supportedMetaNet !== 'mainnet') {
    const e = new Error("supportedMetaNet param must be 'universal'/'testnet'/'mainnet'")
    e.code = 'ERR_INVALID_SUPPORTED_PARAM'
    throw e
  }
  if (open === false) {
    return children
  }
  if (open === true) {
    if ((window.navigator.brave !== undefined 
      || browserName === 'Brave') 
      && braveShieldsDetected === true) {
      return (
        <Theme>
          <BravePrompt
            open={open}
            author={author}
            authorUrl={authorUrl}
            appIcon={appIcon}
          />
        </Theme>)
    } else if (supportedBrowser === false) {
      return (
        <Theme>
          <UnsupportedBrowser
            open={open}
            appName={appName}
            author={author}
            authorUrl={authorUrl}
            appImages={appImages}
            appIcon={appIcon}
            description={description}
          />
        </Theme>
      )
    } else {
      return (
        <Theme>
          <Prompt
            open={open}
            authenticated={authenticated}
            appName={appName}
            author={author}
            authorUrl={authorUrl}
            appImages={appImages}
            appIcon={appIcon}
            description={description}
            supportedMetaNet={supportedMetaNet}
            browserAppUrl={browserAppUrl}
            nativeAppUrls={nativeAppUrls}
          />
        </Theme>
      )
    }
  } else {
    return null
  }
}

export default BabbageReactPrompt
