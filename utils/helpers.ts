export const formatNumber = (value: number | string | null, maxDecimals: number) => {
	if(!value) return
	const roundedValue = Number(value).toFixed(maxDecimals)
	return roundedValue.replace(/\.?0*$/, '')
}

export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}