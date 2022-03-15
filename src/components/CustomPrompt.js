import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import { Typography, Button, Link } from '@material-ui/core'
import { Info } from '@material-ui/icons'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles((theme) => ({
  top_area: {
    display: 'flex',
    flexDirection: 'row'
  },
  app_icon: {
    width: '10em',
    [theme.breakpoints.down('xs')]: {
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
    gridTemplateColumns: '3fr 2fr',
    marginTop: 'auto',
    [theme.breakpoints.down('xs')]: {
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
  }
}))

const CustomPrompt = ({
  appName,
  appLinks = [],
  appImages = [],
  appIcon,
  description,
  learnMoreUrl
}) => {
  const needsLearnMore = description.includes('\n')

  const classes = useStyles()
  const [showFullDescription, setShowFullDescription] = useState(false)

  const transformedDescription = showFullDescription ? description : description.split('\n')[0]

  return (
    <div>
      <div className={classes.top_area}>
        <img src={appIcon} className={classes.app_icon} />
        <div className={classes.right_container}>
          <div>
            <Typography style={{ fontWeight: 500 }} variant='h4'>
              {appName}
            </Typography>
            {appLinks.map((link, i) => link.length > 1
              ? (
                <Link
                  key={i}
                  href={link[1]}
                  style={{ cursor: 'pointer', marginRight: '1em' }}
                  target='_blank'
                >
                  {link[0]}
                </Link>
                )
              : (
                <Typography color='textSecondary' className={classes.secondary}>
                  {link[0]}
                </Typography>
                ))}
          </div>
          <div className={classes.bottom_right_container}>
            <div>
              <Typography
                style={{
                  // fontSize: '0.8em'
                  fontWeight: '300'
                }}
              >
                <Info
                  color='primary'
                  style={{
                    opacity: 0.6,
                    height: '0.75em'
                  }}
                />
                This app requires Babbage Desktop
              </Typography>
            </div>
            <Button
              color='primary'
              className={classes.install_button}
              variant='contained'
              size='small'
              onClick={() => {
                window.open('https://projectbabbage.com/desktop#launch', '_blank')
              }}
            >
              Install Babbage
            </Button>
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
      <Typography style={{ marginBottom: '2em', whiteSpace: 'pre-line' }} paragraph>
        {transformedDescription}
        <br />
        {learnMoreUrl && needsLearnMore && (
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
    </div>
  )
}

export default CustomPrompt
