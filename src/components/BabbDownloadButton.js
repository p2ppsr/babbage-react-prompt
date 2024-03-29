/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React, { useState, useRef, useEffect } from 'react'
import { Info, Download, KeyboardArrowDownOutlined } from '@mui/icons-material'
import {
	Typography,
	ButtonGroup,
	Button,
	Popper,
	Grow,
	Paper,
	ClickAwayListener,
	MenuList,
	MenuItem
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { osName } from 'react-device-detect'
import { MENU_SELECT_AND_DOWNLOAD_BUTTON_ID, INSTALL_BUTTON_ID, installOptions } from '../utils/general'

const useStyles = makeStyles(() => ({
	iconStyle: {
		paddingRight: '3px', 
		position: 'relative', 
		top: '0px', 
		width: '1.0em'
	},
	button: {
		textTransform: 'none !important'
	}
}), {
	name: 'BabbDownloadButton'
})
const HILIGHT_COLOR = '#848484'

// Identical to osName from react-device-detect
const osNames = {
	'Mac OS': 0,
	Windows: 1,
	iOS: 2,
	Android: 3,
	'Windows Phone' : 4,
	Linux: 5
}
export default function SplitButton ({
	supportedMetaNet='mainnet',
	onHoverMetaNetLink = false,
	//googlePlayLink,
	//appStoreLink 
}) {
	const osIndex = osNames[osName]
	if ( osIndex !== 0 && osIndex !== 1 && osIndex !== 5) {
		return null
	}
	const metanetHilightStyle = onHoverMetaNetLink === true
		? {backgroundColor: HILIGHT_COLOR, paddingLeft: '1.0em'}
	//? {backgroundColor: HILIGHT_COLOR, paddingTop: '1.0em', paddingLeft: '1.0em',paddingRight: '1.0em',paddingBottom: '-1.0em'}
		: {paddingLeft: '1.0em'}
	const [supportedMetaNetAppDownload, setSupportedMetaNetAppDownload] = useState(
		supportedMetaNet === 'universal'
			? 'mainnet'
			: supportedMetaNet    
	)
	const [menuOpen, setMenuOpen] = useState(false)
	const [downloadURL, setDownloadURL] = useState(
		installOptions[1].downloadURL[supportedMetaNetAppDownload]
	)
	const anchorRef = useRef(null)
	const [selectedOS, setSelectedOS] = useState(1)
	const [downloading, setDownloading] = useState(false)
	const [OSInstructions, setOSInstructions] = useState('')
	const [selected, setSelected] = useState(false)
	const classes = useStyles()
	const [downloadFilename, setDownloadFilename] = useState(
		installOptions[1].downloadFilename[supportedMetaNetAppDownload]
	)
	const [disabled, setDisabled] = useState(false)
	const [onHoverSmallButton, setOnHoverSmallButton] = useState(false)
	const [onHoverLargeButton, setOnHoverLargeButton] = useState(false)

	const handleDownload = () => {
		const a = document.createElement('a')
		a.href = `https://projectbabbage.com${downloadURL}`
		a.download = downloadFilename
		a.click()
		setDownloading(true)
		setTimeout(() => {
			setDownloading(false)
		}, 3500)
	}

	const handleToggle = () => {
		// 5 = Linux
		if (selectedOS >= 5 || supportedMetaNet === 'universal') {
			setMenuOpen((prevOpen) => !prevOpen)
		}
	}
	useEffect(() => {
		let selection = osNames[osName]
		// Graceful return if any selection is not recognised
		if (selection === undefined || installOptions[selection] === undefined) {
			setDisabled(true)
			return
		}
		setSelectedOS(selection)
		setDownloadURL(installOptions[selection].downloadURL[supportedMetaNetAppDownload])
		setDownloadFilename(installOptions[selection].downloadFilename[supportedMetaNetAppDownload])
		// Check if there are OS instructions and if so, set them
		if (installOptions[selection].instructions !== undefined) {
			setOSInstructions(installOptions[selection].instructions[supportedMetaNetAppDownload])
		}
	}, [])
	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}
		setMenuOpen(false)
	}
	if (disabled) {
		return (
			<Typography style={metanetHilightStyle}>
        Available for Mac, Windows & Linux
			</Typography>
		)
	}
	const instruction = visible => {
		return (
			<>
				<br />
				<br />
				<div style={{visibility: visible}}>
					{installOptions[selectedOS].instructions !== undefined
						? <Info
							color='secondary'
							style={{
								height: '0.8em',
								marginBottom: '-0.15em'
							}}
						/>
						: null
					}
					<Typography style={{
						float: 'right', 
						fontSize: '0.8em',
						wordBreak: 'break-all',
						wordWrap: 'break-word',
						whiteSpace: 'pre-wrap',
					}}>
						{OSInstructions}
					</Typography>
				</div>
			</>
		)
	}
	return (
		<div>
			<img className={classes.iconStyle}
				src={`https://cdn.projectbabbage.com/media/pictures/${supportedMetaNetAppDownload}-icon.png`} />
			<ButtonGroup
				className={classes.buttonStyle}
				size='small'
				color='primary'
				variant='contained'
				ref={anchorRef}
				aria-label='split button'
				disabled={downloading}
			>
				<Button id={`${INSTALL_BUTTON_ID}`} 
					style={metanetHilightStyle}
					className={classes.button}
					onClick={handleDownload}
					onMouseEnter={() => setOnHoverLargeButton(true)}
					onMouseLeave={()=> setOnHoverLargeButton(false)}
				>
					{downloading === true ? 'Downloading...' : installOptions[selectedOS].buttonText}
				</Button>
				<Button id={`${MENU_SELECT_AND_DOWNLOAD_BUTTON_ID}`}
					size='small'
					aria-controls={menuOpen === true ? 'split-button-menu' : undefined}
					aria-expanded={menuOpen === true ? 'true' : undefined}
					aria-label='select desktop build to install'
					aria-haspopup='menu'
					color='secondary'
					onClick={handleToggle}
					onMouseEnter={() => setOnHoverSmallButton(true)}
					onMouseLeave={()=> setOnHoverSmallButton(false)}          
				>
					{selected === true || (selectedOS < 5 && supportedMetaNet !== 'universal') // 5 = Linux
						? <Download onClick={handleDownload} />
						: onHoverSmallButton === true
							? <KeyboardArrowDownOutlined id="menu-select-icon"/>
							: <Download id="download-icon"/> 
					}
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1
				}}
				open={menuOpen}
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
									{installOptions.map((option, index) => {
										if ((index > 4 && selectedOS > 4) || (supportedMetaNet === 'universal' && index === selectedOS)) {
											return (
												<MenuItem id={'menu-mainnet-' + index}
													key={index}
													selected={() => {
														const selected = index === selectedOS
														setSelected(selected)
														return selected
													}}
													onClick={() => {
														let type = supportedMetaNetAppDownload
														if (supportedMetaNet === 'universal') {
															type = 'mainnet'
															setSupportedMetaNetAppDownload(type)
														}
														setDownloadURL(option.downloadURL[type])
														setDownloadFilename(option.downloadFilename[type])
														if (option.instructions !== undefined) {
															setOSInstructions(option.instructions[type])
														}
														setSelectedOS(index)
														setMenuOpen(false)
													}}
												>
													{supportedMetaNet === 'universal' 
                            && option.buttonText.replace('(', 'Mainline (') 
													}
													{supportedMetaNet !== 'universal' 
                            && option.buttonText
													}
												</MenuItem>
											)
										}
									})}
									{supportedMetaNet === 'universal'
										? installOptions.map((option, index) => {
											if ((index > 4 && selectedOS > 4) 
                        || index === selectedOS) {
												return (
													<MenuItem id={'menu-testnet-' + index}
														key={index}
														selected={() => {
															const selected = index === selectedOS
															setSelected(selected)
															return selected
														}}
														onClick={() => {
															setSupportedMetaNetAppDownload('testnet')
															setDownloadURL(option.downloadURL['testnet'])
															setDownloadFilename(option.downloadFilename['testnet'])
															if (option.instructions !== undefined) {
																setOSInstructions(option.instructions['testnet'])
															}
															setSelectedOS(index)
															setMenuOpen(false)
														}}
													>  
														{option.buttonText.replace('(', 'Stageline (')}
													</MenuItem>
												)
											}
										})
										: null
									}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			{onHoverLargeButton === true
				? instruction('visible') 
				: instruction('hidden') // Needed to keep all fields stationary
			}
		</div>
	)
}