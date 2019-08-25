export const classNameBuilder = (classList, buildClassNameList, suffixString) => {
	let b = null,
		classNames = classList.slice(0);
	for (b in buildClassNameList) {
		classNames.push(buildClassNameList[b]+'-'+ suffixString);
	}

	return classNames.join(' ');
}

export default classNameBuilder;
