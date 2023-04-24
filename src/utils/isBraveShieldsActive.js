// Detects brave shields by attempting to display a fake ad
export default () => {
	const fakeAd = document.createElement('div')
	fakeAd.className =
    'textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox'

	fakeAd.style.height = '1px'

	document.body.appendChild(fakeAd)

	const xWidth = fakeAd.offsetHeight
	if (xWidth) {
		console.log('No AdBlocker Detected')
		return false
	} else {
		console.log('AdBlocker detected')
		return true
	}
}
