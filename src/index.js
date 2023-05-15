/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { getNetwork, isAuthenticated } from '@babbage/sdk'
import Prompt from './components/Prompt'
import UnsupportedBrowser from './components/UnsupportedBrowser'
import BravePrompt from './components/BravePrompt'
import Theme from './components/Theme'
import { browserName } from 'react-device-detect'
import isBraveShieldsActive from './utils/isBraveShieldsActive'
import { SUPPORTED_OS, checkNetworkObj } from './utils/general'

const SUPPORTED_BROWSERS = ['Chrome', 'Chromium', 'Opera', 'Edge', 'Firefox', 'Brave']

const checkStatus = async () => {
	try {
		const authenticated = await isAuthenticated(undefined, false)
		if (authenticated === false) {
			return {
				authenticated: false,
				supportedBrowser: true,
			}
		}
	} catch (e) {
		let supportedBrowser = false
		if (SUPPORTED_BROWSERS.includes(browserName)) {
			//if (SUPPORTED_BROWSERS.includes(browserName) && isMobile === false) {
			// Babbage MetaNet Client is not active
			supportedBrowser = true
		}
		return {
			authenticated: false,
			supportedBrowser,
		}
	}
	return {
		authenticated: true,
		supportedBrowser: true
	}
}
const checkCorrectNetwork = async (supportedMetaNet) => {
	// Check correct network is being used for this App
	const network = await getNetwork()
	return {
		status: !(
			(network === 'test' && supportedMetaNet === 'mainnet') ||
      (network === 'main' && supportedMetaNet === 'testnet')
		),
		network
	}
}
const update = (
	open,
	authenticated,
	appName,
	author,
	authorUrl,
	appImages,
	appIcon,
	description,
	supportedMetaNet,
	nativeAppUrls,
	network
) => {
	return (
		<Theme>
			<Prompt
				open={open}
				authenticated={authenticated}
				appName={appName}
				author={author}
				authorUrl={authorUrl}
				appImages={appImages}
				appIcon={appIcon}
				description={description}
				supportedMetaNet={supportedMetaNet}
				nativeAppUrls={nativeAppUrls}
				network={network}
			/>
		</Theme>
	)
}
const BabbageReactPrompt = ({
	children,
	appName = 'Example App',
	author = 'Example Author',
	authorUrl,
	appImages = [
		{
			mainnet:
        'https://projectbabbage.com/assets/images/babbage-screenshot.png',
			testnet:
        'https://projectbabbage.com/assets/images/babbage-screenshot.png',
		},
		{
			mainnet: 'https://projectbabbage.com/assets/images/authrite-spec.png',
			testnet: 'https://projectbabbage.com/assets/images/authrite-spec.png',
		},
	],
	appIcon = {
		mainnet: 'https://projectbabbage.com/favicon.ico',
		testnet: 'https://projectbabbage.com/favicon.ico',
	},
	description = 'This is an example app description. Provide a paragraph or two that describes your app, so that people know what they\'re getting when they want to check it out.',
	supportedMetaNet = 'mainnet', //default, or should be 'universal'/'testnet, if different then set to 'mainnet'
	// osName from react-device-detect offers the following: iOS, Android, Windows Phone, Windows, Mac OS, Linux
	nativeAppUrls = {
		iOS: '...',
		Android: '...',
		//'Windows Phone': '...',
		//Windows: '...',
		//'Mac OS': '...',
		//Linux: '...'
	},
}) => {
	const [network, setNetwork] = useState(undefined)
	const [authenticated, setAuthenticated] = useState(undefined) // Crucial: Set to undefined while we wait for authentication to return
	const [open, setOpen] = useState(null)
	const [supportedBrowser, setSupportedBrowser] = useState(true)
	const [braveShieldsDetected, setBraveShieldsDetected] = useState(false)

	useEffect(() => {
		(async () => {
			let updateCalled = false
			let status = await checkStatus()
			let correctNetwork = {}
			let isCorrectNetwork = true
			if (status.authenticated === true) {
				correctNetwork = await checkCorrectNetwork(supportedMetaNet)
				setNetwork(correctNetwork.network)
				isCorrectNetwork = correctNetwork.status
			}
			while (status.authenticated === false || isCorrectNetwork === false) {
				setBraveShieldsDetected(isBraveShieldsActive())
				setOpen(true)
				await new Promise((resolve) => setTimeout(resolve, 1000))

				// Get Browser Status
				status = await checkStatus()
				if (status.authenticated === false) {
					// Reset this as a different client could connect
					updateCalled = false
					// Only interested in supported browser's status, if not authenticated
					setSupportedBrowser(status.supportedBrowser)
				}
				if (status.authenticated === true) {
					correctNetwork = await checkCorrectNetwork(supportedMetaNet)
					setNetwork(correctNetwork.network)
					isCorrectNetwork = correctNetwork.status
					if (updateCalled === false) {
						update(
							false,
							status.authenticated,
							appName,
							author,
							authorUrl,
							appImages,
							appIcon,
							description,
							supportedMetaNet,
							nativeAppUrls,
							correctNetwork.network
						)
						updateCalled = true
					}
				}
				setAuthenticated(status.authenticated)
			}
			setAuthenticated(status.authenticated)
			setOpen(false)
		})()
	}, [])

	// Allow for invalid values and make the best guess for resetting them
	if (
		supportedMetaNet !== 'universal' &&
    supportedMetaNet !== 'testnet' &&
    supportedMetaNet !== 'mainnet'
	) {
		supportedMetaNet = 'mainnet'
	}
	if (typeof nativeAppUrls !== 'object') {
		nativeAppUrls = undefined
	} else {
		Object.keys(nativeAppUrls).map((key) => {
			if (SUPPORTED_OS.includes(key) === false) {
				delete nativeAppUrls[key]
			} else {
				nativeAppUrls[key] = checkNetworkObj(nativeAppUrls[key])
				if (nativeAppUrls[key] === undefined) {
					delete nativeAppUrls[key]
				}
			}
		})
	}
	if (open === false) {
		return children
	}
	if (open === true) {
		if (
			(window.navigator.brave !== undefined || browserName === 'Brave') &&
      braveShieldsDetected === true
		) {
			return (
				<Theme>
					<BravePrompt
						open={open}
						author={author}
						authorUrl={authorUrl}
						appIcon={appIcon}
					/>
				</Theme>
			)
		} else if (supportedBrowser === false) {
			return (
				<Theme>
					<UnsupportedBrowser
						open={open}
						appName={appName}
						author={author}
						authorUrl={authorUrl}
						appImages={appImages}
						appIcon={appIcon}
						description={description}
						supportedMetaNet={supportedMetaNet}
						nativeAppUrls={nativeAppUrls}
					/>
				</Theme>
			)
		} else {
			return (
				<Theme>
					<Prompt
						open={open}
						authenticated={authenticated}
						appName={appName}
						author={author}
						authorUrl={authorUrl}
						appImages={appImages}
						appIcon={appIcon}
						description={description}
						supportedMetaNet={supportedMetaNet}
						nativeAppUrls={nativeAppUrls}
						network={network}
					/>
				</Theme>
			)
		}
	} else {
		return null
	}
}

export default BabbageReactPrompt
