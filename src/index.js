import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Typography,
  DialogContent,
  useMediaQuery,
  LinearProgress
} from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import style from './style'
import { isAuthenticated } from '@babbage/sdk'
import Icon from './icon.svg'

const useStyles = makeStyles(style, {
  name: 'BabbageReactPrompt'
})

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

export default ({ children, appName = 'This App' }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isFullscreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [open, setOpen] = useState(null)

  useEffect(() => {
    (async () => {
      while (await checkStatus() === false) {
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
      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth
        scroll='body'
        fullScreen={isFullscreen}
      >
        <DialogContent>
          <center>
            <Icon className={classes.babbage_icon} />
            <Typography variant='h5' paragraph>
              <b>"{appName}" Requires Babbage Desktop!</b>
            </Typography>
          </center>
          <div className={classes.steps_grid}>
            <Typography className={classes.step_num}>1.</Typography>
            <Typography>
              Download or launch{' '}
              <a
                href='https://projectbabbage.com/desktop#launch'
                target='_blank'
              >
                Babbage Desktop
              </a>
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
          <LinearProgress />
          <center>
            <Typography color='textSecondary' paragraph>
              <i>
                Waiting for Babbage Desktop...
              </i>
            </Typography>
          </center>
        </DialogContent>
      </Dialog>
    )
  } else {
    return null
  }
}
