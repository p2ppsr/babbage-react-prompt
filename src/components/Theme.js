/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#424242',
		},
		secondary: {
			main: '#fc433f',
		},
	},
})

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
