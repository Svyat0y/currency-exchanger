export const formatNumber = (value: number | string | null, maxDecimals: number) => {
	if(!value) return
	const roundedValue = Number(value).toFixed(maxDecimals)
	return roundedValue.replace(/\.?0*$/, '')
}