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
  author,
  authorUrl,
  appIcon = 'https://projectbabbage.com/favicon.ico'
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
                Browser settings do not support MetaNet applications
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
            marginBottom: '2em',
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}
          paragraph
        >
          To use <b>MetaNet applications, </b>
          please disable Brave shields for this site.
          <br />
        </Typography>
        <Typography
          style={{
            marginBottom: '2em',
            whiteSpace: 'pre-line',
            textAlign: 'center'
          }}
          paragraph
        >
          Or use one of the following browsers:
          <br />
          <img style={{ float: 'center', padding: '15px 5px 10px 20px', width: '60px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/2048px-Google_Chrome_icon_%28February_2022%29.svg.png' />
          <img style={{ float: 'center', padding: '15px 5px 10px 20px', width: '60px' }} src='https://design.firefox.com/product-identity/firefox/firefox/firefox-logo.png' />
          <img style={{ float: 'center', padding: '15px 5px 10px 20px', width: '60px' }} src='https://cdn.vox-cdn.com/thumbor/S_6JSDGmzwOkQ-b_do-S6ZRG-Ko=/0x0:1980x1320/1400x1400/filters:focal(990x660:991x661)/cdn.vox-cdn.com/uploads/chorus_asset/file/19341372/microsoftedgenewlogo.jpg' />
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default Prompt
