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
}

export type ItemGroup = {
	group: string
	data: Item[]
}
