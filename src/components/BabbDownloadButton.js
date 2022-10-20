import React, { useState, useRef, useEffect } from 'react'
import { KeyboardArrowDownOutlined } from '@material-ui/icons'
import license from './license'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  buttonStyle: {

  },
  pre: {
    wordWrap: 'break-word',
    fontFamily: 'Times New Roman',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    overflowX: 'auto',
    overflowY: 'scroll',
    whiteSpace: 'pre-wrap',
    maxHeight: '30em'
  }
}), {
  name: 'BabbDownloadButton'
})
const options = [
  {
    buttonText: 'Download for Mac',
    downloadFilename: 'Babbage Desktop.dmg',
    downloadURL: '/desktop/res/Babbage%20Desktop.dmg'
  },
  {
    buttonText:
      'Download for Windows',
    downloadFilename: 'Babbage Desktop.exe',
    downloadURL: '/desktop/res/Babbage%20Desktop.exe'
  },
  {
    buttonText:
      'Download for Linux (snap)',
    downloadFilename: 'Babbage Desktop.snap',
    downloadURL: '/desktop/res/Babbage%20Desktop.snap'
  },
  {
    buttonText:
      'Download for Linux (AppImage)',
    downloadFilename: 'Babbage Desktop.AppImage',
    downloadURL: '/desktop/res/Babbage%20Desktop.AppImage'
  },
  {
    buttonText:
      'Babbage Mobile (coming soon)'
  }
]

export default function SplitButton () {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [downloadURL, setDownloadURL] = useState('/desktop/res/Babbage%20Desktop.exe')
  const anchorRef = useRef(null)
  const [selectedOS, setSelectedOS] = useState(1)
  const classes = useStyles()
  const [downloadFilename, setDownloadFilename] = useState(
    'Babbage Desktop.exe'
  )
  const [disabled, setDisabled] = useState(false)
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = `${downloadURL}`
    a.download = downloadFilename
    a.click()
    setDialogOpen(false)
  }
  const handleClick = () => {
    console.info(`You clicked ${options[selectedOS]}`)
    setDialogOpen(true)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
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

    setOpen(false)
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
      <ButtonGroup className={classes.buttonStyle} size='small' color='secondary' variant='contained' ref={anchorRef} aria-label='split button'>
        <Button onClick={handleClick}>{options[selectedOS].buttonText}</Button>
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <KeyboardArrowDownOutlined />
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle>Babbage Desktop License Agreement</DialogTitle>
          <pre className={classes.pre}>
            {license}
          </pre>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>I Disagree</Button>
            <Button onClick={handleDownload}>I Agree</Button>
          </DialogActions>
        </Dialog>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
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
                      disabled={index === 4}
                      selected={index === selectedOS}
                      onClick={(event) => {
                        setDownloadURL(option.downloadURL)
                        setDownloadFilename(option.downloadFilename)
                        setSelectedOS(index)
                        setOpen(false)
                      }}
                    >
                      {option.buttonText}
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
