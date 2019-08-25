const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}
const timeOptions = {
	hour: 'numeric',
	minute: 'numeric',
	seconds: true,
}
export const timeRenderer = (dateTime) => {
	const dt = new Date(dateTime);
	return dt.toLocaleString(getNavigatorLanguage(), timeOptions) + '.' + dt.getMilliseconds();
}
