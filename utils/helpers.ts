export const formatNumber = (value: number | null, maxDecimals: number) => {
	if(!value) return
	const roundedValue = value.toFixed(maxDecimals)
	return roundedValue.replace(/\.?0*$/, '')
}