import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Carousel } from 'react-responsive-carousel'
import {
  Typography,
  Link,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
  LinearProgress
} from '@mui/material'
import { Info } from '@mui/icons-material'
import BabbageDesktopDownloadButton from './BabbDownloadButton'
import { useTheme } from '@mui/material/styles'
import { osName, isMobile } from 'react-device-detect'
import { isSupportedOS } from '../utils/general'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles((theme) => ({
  orStyle: {
    fontSize: '1.4em', 
    fontWeight: '600'
  },
  native_column_left: {
    float: 'left',
    width: '5%'
  },
  native_column_right: {
    float: 'left',
    width: '95%'
  },
  native_row: {
    content: '',
    display: 'table',
    clear: 'both'
  },
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

const Prompt = ({
  appName,
  author,
  authorUrl,
  appImages = [],
  appIcon = 'https://projectbabbage.com/favicon.ico',
  description,
  authenticated,
  supportedMetaNet,
  browserAppUrl,
  nativeAppUrls
}) => {
  const HIGHTLIGHT_COLOR = 'pink'
  const needsLearnMore = description.includes('\n')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const transformedDescription = showFullDescription ? description : description.split('\n')[0]
  const classes = useStyles()
  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [onHoverMetaNetLink, setOnHoverMetaNetLink] = useState(false)
  const [onHoverBrowserLink, setOnHoverBrowserLink] = useState(false)
  const [onHoverNativeLink, setOnHoverNativeLink] = useState(false)
  const browserHighlightStyle = onHoverBrowserLink === true
    ? {backgroundColor: HIGHTLIGHT_COLOR}
    : {}
  const nativeHighlightStyle = onHoverNativeLink === true
    ? {backgroundColor: HIGHTLIGHT_COLOR}
    : {}
  const supportedMetaNetAppDownload = supportedMetaNet === 'mainnet'
    ? 'testnet'
    : 'mainnet'
  const type = (<i>{
    supportedMetaNetAppDownload === 'universal'
      ? 'Mainline & Stageline' 
      : supportedMetaNetAppDownload === 'mainnet'
        ? 'Mainline' 
        : 'Stageline'
    }</i>)
  const metanetInstruction = (
    supportedMetaNet === 'universal'
      ? 'a MetaNet Client (either Mainline or Stageline version)'
      : supportedMetaNet === 'mainnet'
        ? ' the MetaNet Client'
        : ' the MetaNet Stageline Client'
  )
  const browserInstruction = (
    supportedMetaNet === 'mainnet'
      ? 'Download the Stageline version of this app'
      : 'Download the Mainline version of this app'
  )
  const nativeInstruction = (
    supportedMetaNet === 'mainnet'
      ? `Install the ${osName} Stageline version of this app`
      : `Install the ${osName} Mainline version of this app`
  )

  if (appIcon === 'https://projectbabbage.com/favicon.ico') {
    appIcon = supportedMetaNet === 'universal' 
      || supportedMetaNet === 'mainnet'
        ? 'https://projectbabbage.com/favicon.ico'
        : 'https://projectbabbage.com/stagelineLogo.svg'
  }
  const browserInstructions = () => {
    if (browserAppUrl[supportedMetaNetAppDownload]  === undefined) {
      return null
    }
    return (
      <>
      <br />
      <span className={classes.orStyle}>OR</span>
      <br />
      <div className={classes.steps_grid}>
        <Typography className={classes.step_num}>1.</Typography>
        <Typography
            onMouseEnter={() => setOnHoverBrowserLink(true)}
            onMouseLeave={()=> setOnHoverBrowserLink(false)}          
        >
          {browserInstruction}
        </Typography>
        <Typography className={classes.step_num}>2.</Typography>
        <Typography>
          Start enjoying {appName}
        </Typography>
      </div>
      </>   
    )    
  }
  const nativeInstructions = () => {
    if (nativeAppUrls[osName] === undefined 
      || nativeAppUrls[osName][supportedMetaNetAppDownload] === undefined) {
      return null   
    }    
    return (
      <>
      <br />
      <span className={classes.orStyle}>OR</span>
      <br />
      <div className={classes.steps_grid}>
        <Typography className={classes.step_num}>1.</Typography>
        <Typography
          onMouseEnter={() => setOnHoverNativeLink(true)}
          onMouseLeave={()=> setOnHoverNativeLink(false)}          
        >
          {nativeInstruction}
        </Typography>
        <Typography className={classes.step_num}>2.</Typography>
        <Typography>
          Start enjoying {appName}
        </Typography>
      </div>
      </>   
    )    
  }  
  const browserAndNativeOptions = () => {
    if (supportedMetaNet !== 'universal' 
      && authenticated === true) {
      if (browserAppUrl[supportedMetaNetAppDownload]  === undefined) {
        return null
      }
      if (isMobile === true 
        && (nativeAppUrls[osName] === undefined 
        || nativeAppUrls[osName][supportedMetaNetAppDownload] === undefined)){
        return null   
      }
      return (
        <>
        <div>
          <span className={classes.orStyle}>OR</span>
          <br />
          <div>
            <div className={classes.native_column_left}>
              <Info
                color='secondary'
                style={{
                  height: '0.7em',
                  marginBottom: '-0.15em'
                }}
              />
            </div>
            <div className={classes.native_column_right}>
              Switch to a {type} version of this app to use with your current MetaNet Client
              <br />
              <span style={browserHighlightStyle}>
                Browser link:&nbsp;
                <a href={browserAppUrl[supportedMetaNetAppDownload]}>
                  {browserAppUrl[supportedMetaNetAppDownload]}
                </a>
              </span>
            </div>
          </div>
          {isMobile === true
            ? <>
              <span className={classes.orStyle}>OR</span>
              <br />
              <div>
                <div className={classes.native_column_left}>
                  <Info
                    color='secondary'
                    style={{
                      height: '0.7em',
                      marginBottom: '-0.15em'
                    }}
                  />
                </div>
                <div className={classes.native_column_right}>
                  Install a native {type} version of this app to use with your current MetaNet client
                  <br /> 
                  <span style={nativeHighlightStyle}>
                    {osName}:&nbsp;
                    <a href={nativeAppUrls[osName][supportedMetaNetAppDownload]}>
                      {nativeAppUrls[osName][supportedMetaNetAppDownload]}
                    </a>
                  </span>
                </div>
              </div>
              </>
            : null
          }
         </div>
        <br />
        </>
      )
    }
    return null
  }
  const carousel = (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      className={classes.carousel}
      emulateTouch
    >
      {appImages.map((url, i) => (
        <div key={i}>
          <img src={
            url[
              supportedMetaNet === 'universal'
                ? 'mainnet'
                : supportedMetaNet
            ]
          } />
        </div>
      ))}
    </Carousel>
  )
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
              <Typography style={{ fontWeight: 500 }} variant='h4'>
                {appName}
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
                  )
              }
            </div>
            <div className={classes.bottom_right_container}>
              <div>
                <Typography>
                  <Info
                    color='secondary'
                    style={{
                      height: '0.7em',
                      marginBottom: '-0.15em'
                    }}
                  />
                  <span>
                    This app requires {metanetInstruction}
                  </span>
                  {browserAndNativeOptions()}
                </Typography>
              </div>
              <BabbageDesktopDownloadButton 
                supportedMetaNet={supportedMetaNet}
                onHoverMetaNetLink={onHoverMetaNetLink}
              /> 
            </div>
          </div>
        </div>
        { // Need to check for undefined as there is a delay in authentication and carousel will be initially flash displayed
          authenticated !== undefined 
            && authenticated === false
              ? carousel
              : <br />
        }
        <Typography
          style={{
            marginBottom: '2em',
            whiteSpace: 'pre-line'
          }}
          paragraph
        >
          {transformedDescription}
          <br />
          {needsLearnMore && (
            <Link
              style={{
                cursor: 'pointer'
              }}
              onClick={() => setShowFullDescription(showFullDescription === false)}
            >
              {showFullDescription ? 'Less' : 'Learn More'}
            </Link>
          )}
        </Typography>
        <div className={classes.steps_grid}>
          <Typography className={classes.step_num}>1.</Typography>
          <Typography
            onMouseEnter={() => setOnHoverMetaNetLink(true)}
            onMouseLeave={()=> setOnHoverMetaNetLink(false)}          
          >
            Install or launch {metanetInstruction}
          </Typography>
          <Typography className={classes.step_num}>2.</Typography>
          <Typography>
            Create your account 
            {authenticated === true && supportedMetaNet !== 'universal'
              ? " (if you don't already have one)"
              : ''
            }
          </Typography>
          <Typography className={classes.step_num}>3.</Typography>
          <Typography>
            Start enjoying {appName}
          </Typography>
        </div>
        {authenticated === true 
          && supportedMetaNet !== 'universal' 
          && isSupportedOS(osName) === true 
          && browserInstructions()
        }
        {authenticated === true 
          && supportedMetaNet !== 'universal' 
          && isMobile === true 
          && isSupportedOS(osName) === true 
          && nativeInstructions()
        }
      </DialogContent>
      <DialogActions>
        <div style={{ width: '100%' }}>
          <LinearProgress color='secondary' />
          <center>
            <Typography color='textSecondary' paragraph>
              <i>
                {authenticated === true && supportedMetaNet !== 'universal'
                  ? 'Waiting ...'
                  : 'Waiting for MetaNet identity provider...'
                }
              </i>
            </Typography>
          </center>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Prompt
