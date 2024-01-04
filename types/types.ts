export type Item = {
	id: number
	label: string
	shortLabel: string
	value: string
	price: number
	min: number
	max: number
	icon: string
	network: string
	networkValue: string
}

export type ItemGroup = {
	group: string
	data: Item[]
}
