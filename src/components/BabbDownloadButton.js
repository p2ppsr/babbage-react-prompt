import React, { useState, useRef, useEffect } from 'react'
import { Info, Download, KeyboardArrowDownOutlined } from '@mui/icons-material'
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
import { osName } from 'react-device-detect'

const useStyles = makeStyles(theme => ({
  iconStyle: {
    paddingRight: '3px', 
    position: 'relative', 
    top: '0px', 
    width: '1.0em'
  },
  button: {
    textTransform: 'none !important'
  }
}), {
  name: 'BabbDownloadButton'
})
const HIGHTLIGHT_COLOR = 'pink'
const options = [
  {
    buttonText: 'Install (MacOS)',
    downloadFilename: {
      mainnet: 'MetaNet Stageline.dmg',
      testnet: 'MetaNet Client.dmg'
    },
    downloadURL: {
      mainnet: '/desktop/res/MetaNet%20Client.dmg',
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.dmg'
    }
  },
  {
    buttonText:
      'Install (Windows)',
    downloadFilename: {
      mainnet: 'MetaNet Client.exe',
      testnet: 'MetaNet Stageline.exe'
    },
    downloadURL: {
      mainnet: '/desktop/res/MetaNet%20Client.exe',
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.exe'
    }
  },
  {
    buttonText:
      'Install (iOS)',
    downloadFilename: {
      mainnet: 'MetaNet Client.snap',
      testnet: 'MetaNet Stageline.snap'
    },
    downloadURL: {
      mainnet: '...',
      testnet: '...'
    },
    instructions: {
      mainnet: '...instructions...',
      testnet: '...instructions...'
    }
  },
  {
    buttonText:
      'Install (Android)',
    downloadFilename: {
      mainnet: 'MetaNet Client.snap',
      testnet: 'MetaNet Stageline.snap'
    },
    downloadURL: {
      mainnet: '...',
      testnet: '...'
    },
    instructions: {
      mainnet: '...instructions...',
      testnet: '...instructions...'
    }
  },
  {
    buttonText:
      'Install (Windows Phone)',
    downloadFilename: {
      mainnet: 'MetaNet Client.snap',
      testnet: 'MetaNet Stageline.snap'
    },
    downloadURL: {
      mainnet: '...',
      testnet: '...'
    },
    instructions: {
      mainnet: '...instructions...',
      testnet: '...instructions...'
    }
  },
  {
    buttonText:
      'Install (Linux AppImage)',
    downloadFilename: {
      mainnet: 'MetaNet Client.AppImage',
      testnet: 'MetaNet Stageline.AppImage'
    },
    downloadURL: {
      mainnet: '/desktop/res/MetaNet%20Client.AppImage',
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.AppImage'
    },
    instructions: {
      mainnet: 'chmod +x <file>\nyou may need FUSE installed',
      testnet: 'chmod +x <file>\nyou may need FUSE installed'
    }
  },
  {
    buttonText:
      'Install (Linux snap)',
    downloadFilename: {
      mainnet: 'MetaNet Client.snap',
      testnet: 'MetaNet Stageline.snap'
    },
    downloadURL: {
      mainnet: '/desktop/res/MetaNet%20Client.snap',
      testnet: '/desktop/res/stageline/MetaNet%20Stageline.snap'
    },
    instructions: {
      mainnet: 'snap install --devmode <file>\nsnap run babbagedesktop',
      testnet: 'snap install --devmode <file>\nsnap run babbagestageline'
    }
  }
]
// Identical to osName from react-device-detect
const osNames = {
  'Mac OS': 0,
  Windows: 1,
  iOS: 2,
  Android: 3,
  'Windows Phone' : 4,
  Linux: 5
}
export default function SplitButton ({
  supportedMetaNet='universal',
  onHoverMetaNetLink = false,
  googlePlayLink,
  appStoreLink 
}) {
  const metanetHighlightStyle = onHoverMetaNetLink === true
    ? {backgroundColor: HIGHTLIGHT_COLOR, paddingTop: '1.0em', paddingLeft: '1.0em',paddingRight: '1.0em',paddingBottom: '-1.0em'}
    : {paddingLeft: '1.0em'}
  const [supportedMetaNetAppDownload, setSupportedMetaNetAppDownload] = useState(
    supportedMetaNet === 'universal'
    ? 'mainnet'
    : supportedMetaNet    
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [downloadURL, setDownloadURL] = useState(
    options[1].downloadURL[supportedMetaNetAppDownload]
  )
  const anchorRef = useRef(null)
  const [selectedOS, setSelectedOS] = useState(1)
  const [downloading, setDownloading] = useState(false)
  const [OSInstructions, setOSInstructions] = useState('')
  const [selected, setSelected] = useState(false)
  const classes = useStyles()
  const [downloadFilename, setDownloadFilename] = useState(
    options[1].downloadFilename[supportedMetaNetAppDownload]
  )
  const [disabled, setDisabled] = useState(false)
  const [onHoverSmallButton, setOnHoverSmallButton] = useState(false)
  const [onHoverLargeButton, setOnHoverLargeButton] = useState(false)

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = `https://projectbabbage.com${downloadURL}`
    a.download = downloadFilename
    a.click()
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
    }, 3500)
  }

  const handleToggle = () => {
    // 5 = Linux
    if (selectedOS === 5 || supportedMetaNet === 'universal') {
      setMenuOpen((prevOpen) => !prevOpen)
    }
  }
  useEffect(() => {
    let selection = osNames[osName]
    // Graceful return if any selection is not recognised
    if (selection === undefined || options[selection] === undefined) {
      setDisabled(true)
      return
    }
    setSelectedOS(selection)
    setDownloadURL(options[selection].downloadURL[supportedMetaNetAppDownload])
    setDownloadFilename(options[selection].downloadFilename[supportedMetaNetAppDownload])
    // Check if there are OS instructions and if so, set them
    if (options[selection].instructions !== undefined) {
      setOSInstructions(options[selection].instructions[supportedMetaNetAppDownload])
    }
  }, [])
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setMenuOpen(false)
  }
  if (disabled) {
    return (
      <Typography style={metanetHighlightStyle}>
        Available for Mac, Windows & Linux
      </Typography>
    )
  }
  const instruction = visible => {
    return (
      <>
      <br />
      <br />
      <div style={{visibility: visible}}>
        {options[selectedOS].instructions !== undefined
          ? <Info
              color='secondary'
              style={{
                height: '0.8em',
                marginBottom: '-0.15em'
              }}
            />
          : null
        }
        <Typography style={{
          float: 'right', 
          fontSize: '0.8em',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          whiteSpace: '-moz-pre-wrap', /* Firefox */    
          whiteSpace: '-pre-wrap',     /* Opera <7 */   
          whiteSpace: '-o-pre-wrap',   /* Opera 7 */    
          whiteSpace: 'break-word',      /* IE */
          whiteSpace: 'pre-wrap',
        }}>
          {OSInstructions}
        </Typography>
      </div>
      </>
    )
  }

  return (
      <div>
      <img className={classes.iconStyle} src={supportedMetaNetAppDownload + '-icon.png'}/>
      <ButtonGroup
        className={classes.buttonStyle}
        size='small'
        color='primary'
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
        disabled={downloading}
      >
        <Button style={metanetHighlightStyle}
          className={classes.button}
          onClick={handleDownload}
          onMouseEnter={() => setOnHoverLargeButton(true)}
          onMouseLeave={()=> setOnHoverLargeButton(false)}
        >
          {downloading === true ? 'Downloading...' : options[selectedOS].buttonText}
        </Button>
        <Button
          size='small'
          aria-controls={menuOpen === true ? 'split-button-menu' : undefined}
          aria-expanded={menuOpen === true ? 'true' : undefined}
          aria-label='select desktop build to install'
          aria-haspopup='menu'
          color='secondary'
          onClick={handleToggle}
          onMouseEnter={() => setOnHoverSmallButton(true)}
          onMouseLeave={()=> setOnHoverSmallButton(false)}          
        >
        {selected === true || (selectedOS < 5 && supportedMetaNet !== 'universal') // 5 = Linux
          ? <Download onClick={handleDownload} /> 
          : onHoverSmallButton === true
            ? <KeyboardArrowDownOutlined />
            : <Download /> 
        }
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
                  {options.map((option, index) => {
                    if ((index > 4 && selectedOS > 4) || (supportedMetaNet === 'universal' && index === selectedOS)) {
                      return (
                        <MenuItem
                          key={index}
                          selected={() => {
                            const selected = index === selectedOS
                            setSelected(selected)
                            return selected
                          }}
                          onClick={() => {
                            let type = supportedMetaNetAppDownload
                            if (supportedMetaNet === 'universal') {
                              type = 'mainnet'
                              setSupportedMetaNetAppDownload(type)
                            }
                            setDownloadURL(option.downloadURL[type])
                            setDownloadFilename(option.downloadFilename[type])
                            if (option.instructions !== undefined) {
                              setOSInstructions(option.instructions[type])
                            }
                            setSelectedOS(index)
                            setMenuOpen(false)
                          }}
                        >
                          {supportedMetaNet === 'universal' 
                            && option.buttonText.replace('(', 'Mainline (') 
                          }
                          {supportedMetaNet !== 'universal' 
                            && option.buttonText
                          }
                        </MenuItem>
                      )
                    }
                  })}
                  {supportedMetaNet === 'universal'
                    ? options.map((option, index) => {
                      if ((index > 4 && selectedOS > 4) 
                        || index === selectedOS) {
                        return (
                          <MenuItem
                            key={index}
                            selected={() => {
                              const selected = index === selectedOS
                              setSelected(selected)
                              return selected
                            }}
                            onClick={e => {
                              setSupportedMetaNetAppDownload('testnet')
                              setDownloadURL(option.downloadURL['testnet'])
                              setDownloadFilename(option.downloadFilename['testnet'])
                              if (option.instructions !== undefined) {
                                setOSInstructions(option.instructions['testnet'])
                              }
                              setSelectedOS(index)
                              setMenuOpen(false)
                            }}
                          >  
                            {option.buttonText.replace('(', 'Stageline (')}
                          </MenuItem>
                        )
                      }
                    })
                    : null
                  }
                  </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {onHoverLargeButton === true
        ? instruction('visible') 
        : instruction('hidden') // Needed to keep all fields stationary
      }
    </div>
  )
}
