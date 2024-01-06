import {Item} from "@/types/types";

const aave1 = './icons/aave1.svg'
const avax = './icons/avax1.svg'
const bnb1 = './icons/bnb1.svg'
const bnb2 = './icons/bnb2.svg'
const bat1 = './icons/bat1.svg'
const btc1 = './icons/btc1.svg'
const btc2 = './icons/btc2.svg'
const btc3 = './icons/btc3.svg'
const btc4 = './icons/btc4.svg'
const ada1 = './icons/ada.svg'
const ada2 = './icons/ada2.svg'
const ada3 ='./icons/ada3.svg'
const link1 = './icons/link.svg'
const atom1 = './icons/atom.svg'
const dai1 = './icons/dai1.svg'
const dai2 = './icons/dai2.svg'
const dai3 = './icons/dai3.svg'
const matic1 = './icons/matic1.svg'
const eth = './icons/eth.svg'



export const currencies: Item[] = [
	{
		id: 1,
		label: "Aave",
		shortLabel: "AAVE",
		value: "AAVE",
		price: 100,
		min: 10,
		max: 5000,
		icon: aave1,
		network: "Ethereum ERC20",
		networkValue: "ethereumErc20",
	},
	{
		id: 1,
		label: "Avalanche",
		shortLabel: "AVAX",
		value: "AVAX",
		price: 45,
		min: 100,
		max: 1000,
		icon: avax,
		network: "C-Chain",
		networkValue: "cChain",
	},
	{
		id: 1,
		label: "BNB Beacon Chain",
		shortLabel: "BNB",
		value: "BNB",
		price: 280,
		min: 10,
		max: 1000,
		icon: bnb1,
		network: "BEP2",
		networkValue: "Bep2",
	},
	{
		id: 1,
		label: "BNB Smart Chain",
		shortLabel: "BNB",
		value: "BNB",
		price: 280,
		min: 10,
		max: 1000,
		icon: bnb2,
		network: "BEP20",
		networkValue: "Bep20",
	},
	{
		id: 1,
		label: "Basic Attention",
		shortLabel: "BAT",
		value: "BAT",
		price: 0.2,
		min: 1000,
		max: 10000,
		icon: bat1,
		network: "ERC20",
		networkValue: "Erc20",
	},
	{
		id: 1,
		label: "Bitcoin",
		shortLabel: "BTC",
		value: "BTC",
		price: 42300,
		min: 0.001,
		max: 5,
		icon: btc1,
		network: "BNB BEP20",
		networkValue: "BnbBep20",
	},
	{
		id: 2,
		label: "Bitcoin",
		shortLabel: "BTC",
		value: "BTC",
		price: 42300,
		min: 0.001,
		max: 5,
		icon: btc2,
		network: "BSC BEP20",
		networkValue: "bscBep20",
	},
	{
		id: 3,
		label: "Bitcoin",
		shortLabel: "BTC",
		value: "BTC",
		price: 42300,
		min: 0.001,
		max: 5,
		icon: btc3,
		network: "Lightning",
		networkValue: "lightning",
	},
	{
		id: 3,
		label: "Bitcoin Cash",
		shortLabel: "BCH",
		value: "BCH",
		price: 220,
		min: 100,
		max: 2000,
		icon: btc4,
		network: "",
		networkValue: ""
	},
	{
		id: 1,
		label: "ETH",
		shortLabel: "ETH",
		value: "ETH",
		price: 2200,
		min: 200,
		max: 2000,
		icon: eth,
		network: "",
		networkValue: ''
	},
	{
		id: 1,
		label: "Cardano",
		shortLabel: "ADA",
		value: "ADA",
		price: 0.5,
		min: 1000,
		max: 7000,
		icon: ada1,
		network: "",
		networkValue: ''
	},
	{
		id: 2,
		label: "Cardano",
		shortLabel: "ADA",
		value: "ADA",
		price: 0.5,
		min: 1000,
		max: 7000,
		icon: ada2,
		network: "BNB BEP20",
		networkValue: 'bnbBep20'
	},
	{
		id: 3,
		label: "Cardano",
		shortLabel: "ADA",
		value: "ADA",
		price: 0.5,
		min: 1000,
		max: 7000,
		icon: ada3,
		network: "BSC BEP20",
		networkValue: 'bscBep20'
	},
	{
		id: 1,
		label: "Chainlink",
		shortLabel: "LINK",
		value: "LINK",
		price: 15,
		min: 500,
		max: 2500,
		icon: link1,
		network: "Ethereum ERC20",
		networkValue: 'ethereumErc20'
	},
	{
		id: 1,
		label: "Cosmos",
		shortLabel: "ATOM",
		value: "ATOM",
		price: 12,
		min: 500,
		max: 2500,
		icon: atom1,
		network: "",
		networkValue: ''
	},
	{
		id: 1,
		label: "DAI",
		shortLabel: "DAI",
		value: "DAI",
		price: 1,
		min: 10000,
		max: 50000,
		icon: dai1,
		network: "BSC BEP20",
		networkValue: 'bscBep20'
	},
	{
		id: 2,
		label: "DAI",
		shortLabel: "DAI",
		value: "DAI",
		price: 1,
		min: 10000,
		max: 50000,
		icon: dai2,
		network: "Ethereum ERC20",
		networkValue: "ethereumErc20",
	},
	{
		id: 3,
		label: "DAI",
		shortLabel: "DAI",
		value: "DAI",
		price: 1,
		min: 10000,
		max: 50000,
		icon: dai3,
		network: "Polygon",
		networkValue: "polygon",
	},
	{
		id: 1,
		label: "MATIC",
		shortLabel: "MATIC",
		value: "MATIC",
		price: 0.85,
		min: 10000,
		max: 50000,
		icon: matic1,
		network: "Polygon",
		networkValue: "polygon",
	},
]
