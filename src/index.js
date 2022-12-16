import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '@babbage/sdk'
import Prompt from './components/Prompt'
import UnsupportedBrowser from './components/UnsupportedBrowser'
import BravePrompt from './components/BravePrompt'
import Theme from './components/Theme'

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
    if (e.message === 'Failed to fetch') {
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
  description = 'This is an example app description. Provide a paragraph or two that describes your app, so that people know what they\'re getting when they want to check it out.'
}) => {
  const [open, setOpen] = useState(null)
  const [supportedBrowser, setSupportedBrowser] = useState(true)

  useEffect(() => {
    (async () => {
      let status = await checkStatus()
      while (status.authenticated === false) {
        setOpen(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get Browser Status
        status = await checkStatus()
        setSupportedBrowser(status.supportedBrowser)
      }
      setOpen(false)
    })()
  }, [])

  if (window.navigator.brave && supportedBrowser === false) {
    return (
      <Theme>
        <BravePrompt
          open={open}
          appName={appName}
          author={author}
          authorUrl={authorUrl}
          appImages={appImages}
          appIcon={appIcon}
          description={description}
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
  } else if (open === false && supportedBrowser) {
    return children
  } else if (open === true) {
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
  } else {
    return null
  }
}

export default BabbageReactPrompt
