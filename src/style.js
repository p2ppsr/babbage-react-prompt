export default theme => ({
  babbage_icon: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(5),
    boxSizing: 'border-box',
    maxHeight: '30vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  },
  modal: {
    maxWidth: '700px'
  },
  steps_grid: {
    margin: theme.spacing(5),
    marginTop: theme.spacing(3),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      gridGap: theme.spacing(2),
      margin: theme.spacing(3)
    }
  },
  step_num: {
    fontWeight: 'bold'
  }
})
