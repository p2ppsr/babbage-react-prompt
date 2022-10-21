import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '@babbage/sdk'
import Prompt from './components/Prompt'
import Theme from './components/Theme'

const checkStatus = async () => {
  try {
    const authenticated = await isAuthenticated(undefined, false)
    if (!authenticated) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
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

  useEffect(() => {
    (async () => {
      while ((await checkStatus()) === false) {
        setOpen(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      setOpen(false)
    })()
  }, [])

  if (open === false) {
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
