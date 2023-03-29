import React, { useState, useEffect } from 'react'
import { getNetwork, isAuthenticated } from '@babbage/sdk'
import Prompt from './components/Prompt'
import AppClientPrompt from './components/AppClientPrompt'
import UnsupportedBrowser from './components/UnsupportedBrowser'
import BravePrompt from './components/BravePrompt'
import Theme from './components/Theme'
import { browserName, isMobile } from 'react-device-detect'
import isBraveShieldsActive from './utils/isBraveShieldsActive'

const SUPPORTED_BROWSERS = ['Chrome', 'Chromium', 'Opera', 'Edge', 'Firefox']
const SUPPORTED_OS = ['iOS', 'Android', 'Windows Phonne', 'Windows', 'Mac OS', 'Linux']

const checkStatus = async () => {
  try {
    const authenticated = await isAuthenticated(undefined, false)
    if (!authenticated) {
      return {
        authenticated: false,
        supportedBrowser: true
      }
    }
  } catch (e) {
    let supportedBrowser = false
    if (SUPPORTED_BROWSERS.includes(browserName) && !isMobile) {
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
const checkNetwork = async (supportedMetaNet) => {
  // Check correct network is being used for this App
  const network = await getNetwork()
  if (network === 'test' && supportedMetaNet === 'mainnet') {
    // This App ONLY works with Mainnet - Mainline client
    return 'need-mainnet'
  } else if ( network === 'main' && supportedMetaNet === 'testnet') {
    // This App ONLY works with Testnet - Stageline client
    return 'need-testnet'
  }
  // This App can work with both networks (i.e. universal) - Either Mainline or Stageline client
  return ''
 }
const BabbageReactPrompt = ({
  children,
  appName = 'Example App',
  author = 'Example Author',
  authorUrl,
  appImages = [
    'https://projectbabbage.com/assets/images/babbage-screenshot.png',
    'https://projectbabbage.com/assets/images/authrite-spec.png'
  ],
  appIcon = 'https://projectbabbage.com/favicon.ico',
  description = 'This is an example app description. Provide a paragraph or two that describes your app, so that people know what they\'re getting when they want to check it out.',
  supportedMetaNet='universal', //default, or should be 'mainnet'/'testnet' -------------------------------------------
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
  const [networkStatus, setNetworkStatus] = useState('')
  const [open, setOpen] = useState(null)
  const [supportedBrowser, setSupportedBrowser] = useState(true)
  const [braveShieldsDetected, setBraveShieldsDetected] = useState(false)

  useEffect(() => {
    (async () => {
      let status = await checkStatus()
      while (status.authenticated === false) {
        setBraveShieldsDetected(isBraveShieldsActive())
        setOpen(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get Browser Status
        status = await checkStatus()
        if (status.authenticated === false) {
          // Only interested in supported browser's status, if not authenticated
          setSupportedBrowser(status.supportedBrowser)
        }
      }
      setNetworkStatus(await checkNetwork(supportedMetaNet))
      setOpen(false)
    })()
  }, [])

  Object.keys(nativeAppUrls).map((key, i) => {
    if (!SUPPORTED_OS.includes(key)) {
      const e = new Error("nativeAppUrls param key must be in ['iOS', 'Android', 'Windows Phonne', 'Windows', 'Mac OS', 'Linux']")
      e.code = 'ERR_INVALID_SUPPORTED_OS_PARAM'
      throw e
    }
  })
  if (supportedMetaNet !== 'universal' && supportedMetaNet !== 'testnet' && supportedMetaNet !== 'mainnet') {
    const e = new Error("supportedMetaNet param must be 'universal'/'testnet'/'mainnet'")
    e.code = 'ERR_INVALID_SUPPORTED_PARAM'
    throw e
  } 

  if (open === false) {
    if (networkStatus === 'need-mainnet') {
      // This App ONLY works with Mainnet - Mainline client
      if (isMobile) {
        return (
          <Theme>
            <AppClientPrompt
              open={true}
              author={author}
              authorUrl={authorUrl}
              appIcon={appIcon}
              appName={appName}
              supportedMetaNet={supportedMetaNet}
              url='https://projectbabbage.com/docs/dev-downloads'
              nativeAppUrls={nativeAppUrls}
              titlePreApp={'Your current Stageline MetaNet client does not work with this:'}
              titlePostApp={'App'}
              instructionPreApp={'Please download the Mainline client for the Operating System you wish to use with this:'}
              instructionPostApp={'App'}
            />
          </Theme>
        )
      } else {
        return (
          <Theme>
            <AppClientPrompt
              open={true}
              author={author}
              authorUrl={authorUrl}
              appIcon={appIcon}
              appName={appName}
              supportedMetaNet={supportedMetaNet}
              url='https://projectbabbage.com/docs/dev-downloads'
              titlePreApp={'Your current Stageline MetaNet client does not work with this:'}
              titlePostApp={'App'}
              instructionPreApp={'Please download the Mainline client for the Operating System you wish to use with this:'}
              instructionPostApp={'App'}
            />
          </Theme>
        )
      }
    } else if (networkStatus === 'need-testnet') {
      // This App ONLY works with Testnet - Stageline client
      if (isMobile) {
        return (
          <Theme>
            <AppClientPrompt
              open={true}
              author={author}
              authorUrl={authorUrl}
              appIcon={appIcon}
              appName={appName}
              supportedMetaNet={supportedMetaNet}
              url='https://projectbabbage.com/docs/dev-downloads'
              nativeAppUrls={nativeAppUrls}
              titlePreApp={'Your current Mainline MetaNet client does not work with this:'}
              titlePostApp={'App'}
              instructionPreApp={'Please download the Stageline client for the Operating System you wish to use with this:'}
              instructionPostApp={'App'}
            />
          </Theme>
        )
      } else {
        return (
          <Theme>
            <AppClientPrompt
              open={true}
              author={author}
              authorUrl={authorUrl}
              appIcon={appIcon}
              appName={appName}
              supportedMetaNet={supportedMetaNet}
              url='https://projectbabbage.com/docs/dev-downloads'
              titlePreApp={'Your current Mainline MetaNet client does not work with this:'}
              titlePostApp={'App'}
              instructionPreApp={'Please download the Stageline client for the Operating System you wish to use with this:'}
              instructionPostApp={'App'}
            />
          </Theme>
        )
      }
    } else {
      return children
    }
  } else if (open === true) {
    if ((window.navigator.brave || browserName === 'Brave') && braveShieldsDetected) {
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
      /*** TBD Shouldn't this check for supported network, as well? We should include the same functionality - AppClientPrompt component here?***/
      return (
        <Theme>
          <Prompt
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
    }
  } else {
    return null
  }
}

export default BabbageReactPrompt
