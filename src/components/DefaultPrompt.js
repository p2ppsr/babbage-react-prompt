import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '../icon.svg'

const useStyles = makeStyles((theme) => ({
  babbage_icon: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(5),
    boxSizing: 'border-box',
    maxHeight: '30vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  }
}))

const DefaultPrompt = () => {
  const classes = useStyles()

  return <Icon className={classes.babbage_icon} />
}

export default DefaultPrompt
