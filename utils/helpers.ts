export const formatNumber = (value: number | string | null, maxDecimals: number) => {
	if(!value) return
	const roundedValue = Number(value).toFixed(maxDecimals)
	return roundedValue.replace(/\.?0*$/, '')
}

export const formatWalletAddress = (address: string) => {
	if (String(address).length <= 19) {
		return address
	}
	return `${address.substring(0, 16)}...${address.substring(address.length - 3)}`
}