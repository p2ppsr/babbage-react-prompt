/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { isMobile, osName } from 'react-device-detect'
import {
	Typography,
	Link,
	Dialog,
	DialogContent,
	useMediaQuery,
} from '@mui/material'
import { Info } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { TITLE_ID, isSupportedOS } from '../utils/general'

const useStyles = makeStyles((theme) => ({
	url_link: {
		cursor: 'pointer',
		marginRight: '1em',
		display: 'flex',
		float: 'left',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	or_text: {
		justifyContent: 'center',
		fontSize: '1.4em',
		fontWeight: '600',
	},
	top_area: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		alignItems: 'center',
	},
	app_icon: {
		width: '10em',
		margin: '0.5em',
		//alignText: 'center',
		[theme.breakpoints.down('sm')]: {
			//alignText: 'center !important',
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
}))

const Prompt = ({
	author,
	authorUrl,
	appIcon = 'https://projectbabbage.com/favicon.ico',
	supportedMetaNet,
	nativeAppUrls,
}) => {
	const classes = useStyles()
	const theme = useTheme()
	const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Dialog
			open
			maxWidth="md"
			fullWidth
			scroll="body"
			fullScreen={isFullscreen}
		>
			<DialogContent>
				<div className={classes.top_area}>
					<div className={classes.right_container}>
						<div>
							{isMobile === true ? (
								<Typography
									id={`${TITLE_ID}`}
									style={{ fontWeight: 500 }}
									variant="h5"
								>
                  This mobile browser does not support MetaNet applications
								</Typography>
							) : (
								<Typography
									id={`${TITLE_ID}`}
									style={{ fontWeight: 500 }}
									variant="h5"
								>
                  This browser does not support MetaNet applications
								</Typography>
							)}
							{authorUrl !== undefined ? (
								<Link
									className={classes.url_link}
									href={authorUrl}
									target="_blank"
								>
									<Typography>{author}</Typography>
								</Link>
							) : (
								<Typography color="textSecondary" className={classes.secondary}>
									{author}
								</Typography>
							)}
							<br />
							<br />
							<img src={appIcon} className={classes.app_icon} />
						</div>
						<div className={classes.bottom_right_container}>
							<div>
								<Typography
									style={{
										fontSize: '0.9em',
										fontWeight: '300',
									}}
								>
									<Info
										color="secondary"
										style={{
											height: '0.75em',
											marginBottom: '-0.15em',
										}}
									/>
                  Unsupported browser detected
								</Typography>
							</div>
						</div>
					</div>
				</div>
				{isMobile === true && (
					<Typography
						style={{
							marginBottom: '2em',
							whiteSpace: 'pre-line',
							textAlign: 'center',
						}}
						paragraph
					>
            <br />
            To use <b>MetaNet applications, </b>
            try one of these browsers on your mobile or desktop:
						<br />
						<div
							style={{
								display: 'flex',
								float: 'center',
								flexWrap: 'wrap',
								justifyContent: 'center'
							}}
						>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '80px',
								}}
								src="https://edgefrecdn.azureedge.net/shared/edgeweb/img/edge-icon.eaf0232.png"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/logo/logo-o.64d9b43037de.svg"
							/>
						</div>
						{nativeAppUrls !== undefined && isSupportedOS(osName) && (
							<Typography
								style={{
									marginBottom: '2em',
									whiteSpace: 'pre-line',
									textAlign: 'center',
								}}
								paragraph
							>
								<span>
									<div>
										<br />
										<span className={classes.or_text}>OR</span>
										<br />
										<br />
                    Use the native mobile version of this app:
										<br />
									</div>
									{supportedMetaNet === 'universal' ? (
										<>
											<a href={nativeAppUrls[osName].mainnet}>
												{nativeAppUrls[osName].mainnet}
											</a>
											<br />
											<a href={nativeAppUrls[osName].testnet}>
												{nativeAppUrls[osName].testnet}
											</a>
										</>
									) : supportedMetaNet === 'mainnet' ? (
										<a href={nativeAppUrls[osName][supportedMetaNet]}>
											{nativeAppUrls[osName][supportedMetaNet]}
										</a>
									) : supportedMetaNet === 'testnet' ? (
										<a href={nativeAppUrls[osName][supportedMetaNet]}>
											{nativeAppUrls[osName][supportedMetaNet]}
										</a>
									) : null}
								</span>
							</Typography>
						)}
					</Typography>
				)}
				{isMobile === false && (
					<Typography
						style={{
							marginBottom: '2em',
							whiteSpace: 'pre-line',
							textAlign: 'center',
						}}
						paragraph
					>
            <br />
            To use <b>MetaNet applications, </b>
            try one of these browsers:
						<br />
						<div
							style={{
								display: 'flex',
								float: 'center',
								flexWrap: 'wrap',
								jjustifyContent: 'center'
							}}
						>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '80px',
								}}
								src="https://edgefrecdn.azureedge.net/shared/edgeweb/img/edge-icon.eaf0232.png"
							/>
							<img
								style={{
									float: 'center',
									padding: '15px 5px 10px 20px',
									width: '60px',
								}}
								src="https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/logo/logo-o.64d9b43037de.svg"
							/>
						</div>
					</Typography>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default Prompt
