import React, { useState, useRef, useEffect } from 'react'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import {
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
import OpenInNew from '@mui/icons-material/OpenInNew'

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'none !important'
  }
}), {
  name: 'BabbDownloadButton'
})
const options = [
  {
    buttonText: 'Install (macOS)',
    downloadFilename: 'Babbage Desktop.dmg',
    downloadURL: {
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.dmg',
      mainnet: '/desktop/res/MetaNet%20Client.dmg'
    }
  },
  {
    buttonText:
      'Install (Windows)',
    downloadFilename: 'Babbage Desktop.exe',
    downloadURL: {
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.exe',
      mainnet: '/desktop/res/MetaNet%20Client.exe'
    }
  },
  {
    buttonText:
      'Install (Linux AppImage)',
    downloadFilename: 'Babbage Desktop.AppImage',
    downloadURL: {
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.AppImage',
      mainnet: '/desktop/res/MetaNet%20Client.AppImage'
    }
  },
  {
    buttonText:
      'Install (Linux snap)',
    downloadFilename: 'Babbage Desktop.snap',
    downloadURL: {
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.snap',
      mainnet: '/desktop/res/MetaNet%20Client.snap'
    }
  },
  {
    buttonText: {
      testnet: '',
      mainnet: '',
      universal: 'Stageline & Devline'
    }
  }
]

export default function SplitButton ({
  supportedMetaNet='universal',
  googlePlayLink,
  appStoreLink 
}) {
  const supportedMetaNetDownload = supportedMetaNet === 'universal'?'mainnet':supportedMetaNet
  const [menuOpen, setMenuOpen] = useState(false)
  const [downloadURL, setDownloadURL] = useState('/desktop/res/Babbage%20Desktop.exe')
  const anchorRef = useRef(null)
  const [selectedOS, setSelectedOS] = useState(1)
  const [downloading, setDownloading] = useState(false)
  const classes = useStyles()
  const [downloadFilename, setDownloadFilename] = useState(
    'Babbage Desktop.exe'
  )
  const [disabled, setDisabled] = useState(false)
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = `https://projectbabbage.com${downloadURL[supportedMetaNetDownload]}`
    a.download = downloadFilename
    a.click()
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
    }, 3500)
  }

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen)
  }
  useEffect(() => {
    // Thanks to https://stackoverflow.com/a/38241481 for this
    const platform = window.navigator.platform
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
    let selection
    if (macosPlatforms.indexOf(platform) !== -1) {
      selection = 0
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      selection = 1
    } else if (/Linux/.test(platform)) {
      selection = 2
    } else {
      setDisabled(true)
      return
    }
    setSelectedOS(selection)
    setDownloadURL(options[selection].downloadURL)
    setDownloadFilename(options[selection].downloadFilename)
  }, [])
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setMenuOpen(false)
  }
  if (disabled) {
    return (
      <Typography>
        Available for Mac, Windows & Linux
      </Typography>
    )
  }
  return (
    <>
      <ButtonGroup
        className={classes.buttonStyle}
        size='small'
        color='primary'
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
        disabled={downloading}
      >
        <Button
          className={classes.button}
          onClick={handleDownload}
        >
          {downloading ? 'Downloading...' : options[selectedOS].buttonText}
        </Button>
        <Button
          size='small'
          aria-controls={menuOpen ? 'split-button-menu' : undefined}
          aria-expanded={menuOpen ? 'true' : undefined}
          aria-label='select desktop build to install'
          aria-haspopup='menu'
          color='secondary'
          onClick={handleToggle}
        >
          <KeyboardArrowDownOutlined />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedOS}
                      onClick={(event) => {
                        if (index === 4) {
                          window.open(
                            'https://projectbabbage.com/docs/dev-downloads',
                            '_blank'
                          )
                        } else {
                          setDownloadURL(option.downloadURL)
                          setDownloadFilename(option.downloadFilename)
                          setSelectedOS(index)
                        }
                        setMenuOpen(false)
                      }}
                    >
                      {index === 4 && option.buttonText[supportedMetaNet]}
                      {index === 4 && option.buttonText[supportedMetaNet] !== '' && <OpenInNew />}
                      {index !== 4 && option.buttonText}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}