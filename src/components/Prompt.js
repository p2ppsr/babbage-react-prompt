/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
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
	LinearProgress,
} from '@mui/material'
import { Info } from '@mui/icons-material'
import BabbageDesktopDownloadButton from './BabbDownloadButton'
import { useTheme } from '@mui/material/styles'
import { osName, isMobile } from 'react-device-detect'
import { TITLE_ID } from '../utils/general'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles((theme) => ({
	hover_link: {
		marginRight: '1em',
		display: 'flex',
		float: 'left',
		flexWrap: 'wrap',
		justifyContent: 'left',
	},
	url_link: {
		cursor: 'pointer',
		marginRight: '1em',
		display: 'flex',
		float: 'left',
		flexWrap: 'wrap',
		justifyContent: 'left',
	},
	or_text: {
		fontSize: '1.4em',
		fontWeight: '600',
	},
	native_column_left: {
		float: 'left',
		width: '5%',
	},
	native_column_right: {
		float: 'left',
		width: '95%',
	},
	native_row: {
		content: '',
		display: 'table',
		clear: 'both',
	},
	top_area: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
	},
	app_icon: {
		width: '10em',
		margin: '0.5em',
		[theme.breakpoints.down('sm')]: {
			height: '5em',
			width: 'unset',
		},
	},
	right_container: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	bottom_right_container: {
		display: 'grid',
		gridTemplateColumns: '1fr auto',
		width: '100%',
		marginTop: '2em',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr',
			marginTop: '1em',
			gridRowGap: '1em',
		},
	},
	install_button: {
		height: '2.5em',
		width: 'fit-content',
		margin: 'auto 0px auto auto',
		textTransform: 'capitalize',
	},
	carousel: {
		margin: '2em 0em',
		'& .slide': {
			display: 'grid',
			placeItems: 'center',
		},
		'& .slider': {
			maxHeight: '25em',
		},
		'& image': {
			maxHeight: '25em',
		},
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
			margin: theme.spacing(3),
		},
	},
	step_num: {
		fontWeight: 'bold !important',
		fontSize: '1.5em !important',
		color: theme.palette.secondary.main,
	},
	help_bar: {
		backgroundColor: 'lightblue',
		color: 'black',
		borderRadius: '0.25em',
		margin: '0.5em auto',
		padding: '1.25em',
		boxSizing: 'border-box',
		transition: 'all 0.5s',
		boxShadow: theme.shadows[2],
		cursor: 'pointer',
		userSelect: 'none',
		'&:hover': {
			boxShadow: theme.shadows[3]
		}
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
	nativeAppUrls,
	network,
}) => {
	const needsLearnMore = description.includes('\n')
	const [showFullDescription, setShowFullDescription] = useState(false)
	const transformedDescription = showFullDescription
		? description
		: description.split('\n')[0]
	const classes = useStyles()
	const theme = useTheme()
	const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'))
	const [onHoverMetaNetLink, setOnHoverMetaNetLink] = useState(false)
	const supportedMetaNetAppDownload =
    supportedMetaNet === 'mainnet' ? 'testnet' : 'mainnet'
	const metanetInstruction =
    supportedMetaNet === 'universal'
    	? 'a MetaNet Client'
    	: supportedMetaNet === 'mainnet'
    		? ' the MetaNet Client'
    		: ' the MetaNet Stageline Client'

	if (appIcon === 'https://projectbabbage.com/favicon.ico') {
		appIcon =
      supportedMetaNet === 'universal' || supportedMetaNet === 'mainnet'
      	? 'https://projectbabbage.com/favicon.ico'
      	: 'https://projectbabbage.com/stagelineLogo.svg'
	}
	const nativeOptions = () => {
		if (
			isMobile === true &&
      (nativeAppUrls === undefined ||
        nativeAppUrls[osName] === undefined ||
        nativeAppUrls[osName] === '...')
		) {
			return null
		}
		return (
			<>
				{isMobile === true && (
					<>
						{authenticated !== true ? (
							<>
								<br />
								<span className={classes.or_text}>OR</span>
								<br />
								<div>
									<Typography>
										<Info
											color="secondary"
											style={{
												height: '0.7em',
												marginBottom: '-0.15em',
											}}
										/>
										<span>Install a native version of this app</span>
									</Typography>
								</div>
								<br />
								<div
									style={{
										wordBreak: 'break-all',
										textOverflow: '...',// Not working
										justifyContent: 'left',
									}}
								>
									<a href={nativeAppUrls[osName].mainnet}>
										{nativeAppUrls[osName].mainnet}
									</a>
									<br />
									<a href={nativeAppUrls[osName].testnet}>
										{nativeAppUrls[osName].testnet}
									</a>
								</div>
							</>
						) : (
							<>
								<br />
								<span className={classes.or_text}>OR</span>
								<br />
								<div>
									<Typography>
										<Info
											color="secondary"
											style={{
												height: '0.7em',
												marginBottom: '-0.15em',
											}}
										/>
										<span>
											{network === 'main' ? (
												<>
                          Install a native version of this app for your current
                          MetaNet client
												</>
											) : (
												network === 'test' && (
													<>
                            Install a native version of this app for your
                            current MetaNet client
													</>
												)
											)}
										</span>
										<div
											style={{
												wordBreak: 'break-all',
												textOverflow: '...',
												justifyContent: 'left',
											}}
										>
											{network === 'main' ? (
												<>
													<a href={nativeAppUrls[osName].mainnet}>
														{nativeAppUrls[osName].mainnet}
													</a>
												</>
											) : (
												network === 'test' && (
													<>
														<a href={nativeAppUrls[osName].testnet}>
															{nativeAppUrls[osName].testnet}
														</a>
													</>
												)
											)}
										</div>
									</Typography>
								</div>
							</>
						)}
					</>
				)}
				<br />
			</>
		)
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
					<img
						src={typeof url === 'object' ? 
							url[
								supportedMetaNet === 'universal' ? 'mainnet' : supportedMetaNet
							] : url
						}
					/>
				</div>
			))}
		</Carousel>
	)
	return (
		<div>
			<Dialog
				open
				maxWidth="md"
				fullWidth
				scroll="body"
				fullScreen={isFullscreen}
			>
				<DialogContent>
					<div className={classes.top_area}>
						<img src={appIcon} className={classes.app_icon} />
						<div className={classes.right_container}>
							<div>
								<Typography
									id={`${TITLE_ID}`}
									style={{ fontWeight: 500 }}
									variant="h4"
								>
									{appName}
								</Typography>
								{authorUrl ? (
									<Link
										className={classes.url_link}
										href={authorUrl}
										style={{ cursor: 'pointer', marginRight: '1em' }}
										target="_blank"
									>
										<Typography>{author}</Typography>
									</Link>
								) : (
									<Typography
										color="textSecondary"
										className={classes.secondary}
									>
										{author}
									</Typography>
								)}
							</div>
							<div className={classes.bottom_right_container}>
								<div>
									<Typography>
										<Info
											color="secondary"
											style={{
												height: '0.7em',
												marginBottom: '-0.15em',
											}}
										/>
										<span>This app requires {metanetInstruction}</span>
										{nativeOptions()}
									</Typography>
								</div>
								<BabbageDesktopDownloadButton
									supportedMetaNet={supportedMetaNet}
									onHoverMetaNetLink={onHoverMetaNetLink}
								/>
							</div>
						</div>
					</div>
					{authenticated && supportedMetaNet === 'mainnet' && network === 'test' && (
						<div className={classes.help_bar}><Typography>Looks like you're currently running MetaNet Stageline, but this app needs the Mainline MetaNet Client.</Typography></div>
					)}
					{authenticated && supportedMetaNet === 'testnet' && network === 'main' && (
						<div className={classes.help_bar}><Typography>Looks like you're currently running the Mainline MetaNet Client, but this app wants you to use the Stageline client for testing.</Typography></div>
					)}
					{
						// Need to check for undefined as there is a delay in authentication and carousel will be initially flash displayed
						(authenticated !== undefined &&
              authenticated === false &&
              nativeAppUrls !== undefined &&
              nativeAppUrls[supportedMetaNetAppDownload] === undefined) ||
            supportedMetaNet === 'universal' ? (
								carousel
							) : (
								<>
									<br /> <br />
								</>
							)
					}
					<Typography
						style={{
							marginBottom: '2em',
							whiteSpace: 'pre-line',
						}}
						paragraph
					>
						{transformedDescription}
						<br />
						{needsLearnMore && (
							<Link
								className={classes.url_link}
								style={{
									cursor: 'pointer',
								}}
								onClick={() =>
									setShowFullDescription(showFullDescription === false)
								}
							>
								{showFullDescription ? 'Less' : 'Learn More'}
							</Link>
						)}
					</Typography>
					<div className={classes.steps_grid}>
						<Typography className={classes.step_num}>1.</Typography>
						<Typography
							className={classes.hover_link}
							onMouseEnter={() => setOnHoverMetaNetLink(true)}
							onMouseLeave={() => setOnHoverMetaNetLink(false)}
						>
              Install or launch {metanetInstruction}
						</Typography>
						<Typography className={classes.step_num}>2.</Typography>
						<Typography>
              Create your account
							{authenticated === true && supportedMetaNet !== 'universal'
								? ' (if you don\'t already have one)'
								: ''}
						</Typography>
						<Typography className={classes.step_num}>3.</Typography>
						<Typography>Start enjoying {appName}</Typography>
					</div>
					{
						//authenticated === true
						//supportedMetaNet !== 'universal'
						//&& isMobile === true
						//&& isSupportedOS(osName) === true
						//&& nativeInstructions()
					}
				</DialogContent>
				<DialogActions>
					<div style={{ width: '100%' }}>
						<LinearProgress color="secondary" />
						<center>
							<Typography color="textSecondary" paragraph>
								<i>Waiting for MetaNet Connection...</i>
							</Typography>
						</center>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Prompt
