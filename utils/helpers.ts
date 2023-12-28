export const formatNumber = (value: string, maxDecimals: number) => {
	const roundedValue = Number(value).toFixed(maxDecimals)
	return roundedValue.replace(/\.?0*$/, '')
}