import React, { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { Carousel } from 'react-responsive-carousel'
import {
  Typography,
  Button,
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

const Prompt = ({
  appName,
  author,
  authorUrl,
  appImages = [],
  appIcon = 'https://projectbabbage.com/favicon.ico',
  description
}) => {
  const needsLearnMore = description.includes('\n')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const transformedDescription = showFullDescription ? description : description.split('\n')[0]
  const classes = useStyles()
  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={true}
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
                    This app requires Babbage Desktop
                  </Typography>
                </div>
                <BabbageDesktopDownloadButton/>
              </div>
            </div>
        </div>
        <Carousel
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          className={classes.carousel}
          emulateTouch
        >
          {appImages.map((url, i) => (
            <div key={i}>
              <img src={url} />
            </div>
          ))}
        </Carousel>
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
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? 'Less' : 'Learn More'}
            </Link>
          )}
        </Typography>
        <div className={classes.steps_grid}>
          <Typography className={classes.step_num}>1.</Typography>
          <Typography>
            Install or launch Babbage Desktop
          </Typography>
          <Typography className={classes.step_num}>2.</Typography>
          <Typography>
            Create your account
          </Typography>
          <Typography className={classes.step_num}>3.</Typography>
          <Typography>
            Start enjoying {appName}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <div style={{ width: '100%' }}>
          <LinearProgress color='secondary' />
          <center>
            <Typography color='textSecondary' paragraph>
              <i>
                Waiting for MetaNet identity provider...
              </i>
            </Typography>
          </center>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Prompt
