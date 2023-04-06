export const SUPPORTED_OS = ['iOS', 'Android', 'Windows Phone', 'Windows', 'Mac OS', 'Linux']
export const isSupportedOS = s => {
   return SUPPORTED_OS.indexOf(s) !== -1
}