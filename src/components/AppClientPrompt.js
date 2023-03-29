import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import {
  Typography,
  Link,
  Dialog,
  DialogContent,
  useMediaQuery
} from '@mui/material'
import { Info } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { osName, isMobile } from 'react-device-detect'
import BabbageDesktopDownloadButton from './BabbDownloadButton'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles((theme) => ({
  top_area: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center'
  },
  app_icon: {
    width: '10em',
    margin: '0.5em',
    [theme.breakpoints.down('sm')]: {
      height: '2em',
      width: 'unset'
    }
  },
  right_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  bottom_right_container: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    width: '100%',
    marginTop: '2em',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginTop: '1em',
      gridRowGap: '1em'
    }
  },
  install_button: {
    height: '2.5em',
    width: 'fit-content',
    margin: 'auto 0px auto auto',
    textTransform: 'capitalize'
  },
  carousel: {
    margin: '2em 0em',
    '& .slide': {
      display: 'grid',
      placeItems: 'center'
    },
    '& .slider': {
      maxHeight: '25em'
    },
    '& image': {
      maxHeight: '25em'
    }
  },
  steps_grid: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gridRowGap: theme.spacing(2),
    gridColumnGap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      gridGap: theme.spacing(2),
      margin: theme.spacing(3)
    }
  },
  step_num: {
    fontWeight: 'bold !important',
    fontSize: '1.5em !important',
    color: theme.palette.secondary.main
  }
}))

const getNativeAppUrlsElements = (nativeAppUrls, supportedMetaNet) => {
  if (osName) {
    if (isMobile) {
      return (
        <>
        <div>
          <img style={{ left:'20px', padding: '5px 5px 10px 20px', width: '40px' }} src='https://projectbabbage.com/favicon.ico'/>
          <a href={nativeAppUrls[osName]}>{osName}:&nbsp;{nativeAppUrls[osName]}</a>
        </div>
        <br />
        </>
      )
    } else {
      return (
        <BabbageDesktopDownloadButton 
          supportedMetaNet={supportedMetaNet}
        />      
      )
    }
  }
  const nativeAppUrlsElements = Object.keys(nativeAppUrls).map((key, i) => {
    return (
      <>
      <div key={key}>
        <img style={{ left:'20px', padding: '5px 5px 10px 20px', width: '40px' }} src='https://projectbabbage.com/favicon.ico'/>
        <a href={nativeAppUrls[key]}>{key}:&nbsp;{nativeAppUrls[key]}</a>
      </div>
      <br key={i}/>
      </>
    )
  })
  return (<div>{nativeAppUrlsElements}</div>)
}

const AppClientPrompt = ({
  author,
  authorUrl,
  appIcon = 'https://projectbabbage.com/favicon.ico',
  appName,
  supportedMetaNet,
  url='https://projectbabbage.com/docs/dev-downloads',
  nativeAppUrls,
  titlePreApp='Your current MetaNet client does not work with this:',
  titlePostApp='App',
  instructionPreApp='Please download the correct client for the Operating System you wish to use with this:',
  instructionPostApp='App'
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Dialog
      open
      maxWidth='md'
      fullWidth
      scroll='body'
      fullScreen={isFullscreen}
    >
      <DialogContent>
      <div className={classes.top_area}>
          <img src={appIcon} className={classes.app_icon} />
          <div className={classes.right_container}>
            <div>
              <Typography style={{ fontWeight: 500 }} variant='h5'>
                {titlePreApp}<br />{appName}&nbsp;{titlePostApp}<br />
              </Typography>
              {authorUrl
                ? (
                  <Link
                    href={authorUrl}
                    style={{ cursor: 'pointer', marginRight: '1em' }}
                    target='_blank'
                  >
                    <Typography>{author}</Typography>
                  </Link>
                  )
                : (
                  <Typography color='textSecondary' className={classes.secondary}>
                    {author}
                  </Typography>
                  )}
            </div>
            <div className={classes.bottom_right_container}>
              <div>
                <Typography
                  style={{
                    fontSize: '0.9em',
                    fontWeight: '300'
                  }}
                >
                  <Info
                    color='secondary'
                    style={{
                      height: '0.75em',
                      marginBottom: '-0.15em'
                    }}
                  />
                  MetaNet Client connection disabled
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <Typography
          style={{
            marginBottom: '2.5em',
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}
          paragraph
        >
        {instructionPreApp}<br />{appName}&nbsp;{instructionPostApp}<br />
        </Typography>
        <Typography
          style={{
            marginBottom: '2.5em',
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}
          paragraph
        >
          <br />
          {getNativeAppUrlsElements(nativeAppUrls, supportedMetaNet)}
          <br />
          <br />
          or see our downloads page:
          <div style={{ display: 'flex', float: 'center', 'flexWrap': 'wrap', 'justifyContent': 'center' }}>
            <img style={{ float: 'center', padding: '15px 5px 10px 20px', width: '40px' }} src='https://projectbabbage.com/favicon.ico'/>
            <a href={url}>{url}</a>
          </div>
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default AppClientPrompt
