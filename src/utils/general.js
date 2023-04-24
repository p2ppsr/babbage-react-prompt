export const TITLE_ID = 'title-string'
export const INSTALL_BUTTON_ID = 'install-button'
export const MENU_SELECT_AND_DOWNLOAD_BUTTON_ID =
  'menu-select-and-download-button'
export const SUPPORTED_OS = [
	'iOS',
	'Android',
	'Windows Phone',
	'Windows',
	'Mac OS',
	'Linux',
]
export const isSupportedOS = (s) => {
	return SUPPORTED_OS.indexOf(s) !== -1
}
export const installOptions = [
	{
		buttonText: 'Install (MacOS)',
		downloadFilename: {
			mainnet: 'MetaNetStageline.dmg',
			testnet: 'MetaNetClient.dmg',
		},
		downloadURL: {
			mainnet: '/desktop/res/MetaNet%20Client.dmg',
			testnet: '/desktop/res/stageline/MetaNet%20Stageline.dmg',
		},
	},
	{
		buttonText: 'Install (Windows)',
		downloadFilename: {
			mainnet: 'MetaNetClient.exe',
			testnet: 'MetaNetStageline.exe',
		},
		downloadURL: {
			mainnet: '/desktop/res/MetaNet%20Client.exe',
			testnet: '/desktop/res/stageline/MetaNet%20Stageline.exe',
		},
	},
	{
		buttonText: 'Install (iOS)',
		downloadFilename: {
			mainnet: 'MetaNetClient.snap',
			testnet: 'MetaNetStageline.snap',
		},
		downloadURL: {
			mainnet: '...',
			testnet: '...',
		},
		instructions: {
			mainnet: '',
			testnet: '',
		},
	},
	{
		buttonText: 'Install (Android)',
		downloadFilename: {
			mainnet: 'MetaNetClient.snap',
			testnet: 'MetaNetStageline.snap',
		},
		downloadURL: {
			mainnet: '...',
			testnet: '...',
		},
		instructions: {
			mainnet: '',
			testnet: '',
		},
	},
	{
		buttonText: 'Install (Windows Phone)',
		downloadFilename: {
			mainnet: 'MetaNetClient.snap',
			testnet: 'MetaNetStageline.snap',
		},
		downloadURL: {
			mainnet: '...',
			testnet: '...',
		},
		instructions: {
			mainnet: '',
			testnet: '',
		},
	},
	{
		buttonText: 'Install (Linux appimage)',
		downloadFilename: {
			mainnet: 'MetaNetClient.appimage',
			testnet: 'MetaNetStageline.appimage',
		},
		downloadURL: {
			mainnet: '/desktop/res/MetaNet%20Client.AppImage',
			testnet: '/desktop/res/stageline/MetaNet%20Stageline.AppImage',
		},
		instructions: {
			mainnet:
        'chmod +x MetaNetClient.appimage\napt-get install fuse -y\n./MetaNetClient.appimage',
			testnet:
        'chmod +x MetaNetStageline.appimage\napt-get install fuse -y\n./MetaNetStageline.appimage',
		},
	},
	{
		buttonText: 'Install (Linux snap)',
		downloadFilename: {
			mainnet: 'MetaNetClient.snap',
			testnet: 'MetaNetStageline.snap',
		},
		downloadURL: {
			mainnet: '/desktop/res/MetaNet%20Client.snap',
			testnet: '/desktop/res/stageline/MetaNet%20Stageline.snap',
		},
		instructions: {
			mainnet:
        'snap install --devmode MetaNetClient.snap\nsnap run babbagedesktop',
			testnet:
        'snap install --devmode MetaNetStageline.snap\nsnap run babbagestageline',
		},
	},
]
export const checkNetworkObj = (o) => {

	//Make best guess for invalid values
	if (typeof o !== 'object') {
		o = { mainnet: o }
	} else {
		let invalidMainnet = true
		let invalidTestnet = true
		Object.keys(o).map((key) => {
			if (['mainnet', 'testnet'].includes(key) === false) {
				if (o.mainnet !== undefined) {
					o.testnet = o[key]
					invalidTestnet = false
					delete o[key]
				}
			} else {
				if (key === 'mainnet') {
					invalidMainnet = false
				}
				if (key === 'testnet') {
					invalidTestnet = false
				}
			}
		})
		Object.keys(o).map((key) => {
			if (['mainnet', 'testnet'].includes(key) === false) {
				if (o.testnet !== undefined) {
					o.mainnet = o[key]
					invalidMainnet = false
					delete o[key]
				}
			} else {
				if (key === 'mainnet') {
					invalidMainnet = false
				}
				if (key === 'testnet') {
					invalidTestnet = false
				}
			}
		})
		if (
			(o.mainnet === undefined && o.testnet === undefined) ||
      (invalidMainnet === true && invalidTestnet === true)
		) {
			o = undefined
		}
	}
	return o
}
