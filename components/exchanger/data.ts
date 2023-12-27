import aave1 from './icons/aave1.svg'
import avax from './icons/avax1.svg'
import bnb1 from './icons/bnb1.svg'
import bnb2 from './icons/bnb2.svg'
import bat1 from './icons/bat1.svg'
import btc1 from './icons/btc1.svg'
import btc2 from './icons/btc2.svg'
import btc3 from './icons/btc3.svg'
import btc4 from './icons/btc4.svg'
import ada1 from './icons/ada.svg'
import ada2 from './icons/ada2.svg'
import ada3 from './icons/ada3.svg'
import link1 from './icons/link.svg'
import atom1 from './icons/atom.svg'
import dai1 from './icons/dai1.svg'
import dai2 from './icons/dai2.svg'
import dai3 from './icons/dai3.svg'

export const currencies = [
	{
		group: "AAVE",
		data: [
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
			},
		],
	},
	{
		group: "AVAX",
		data: [
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
			},
		]
	},
	{
		group: "BNB",
		data: [
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
			},
		]
	},
	{
		group: 'BAT',
		data: [
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
			},
		]
	},
	{
		group: "BTC",
		data: [
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
			},
		],
	},
	{
		group: "ADA",
		data: [
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
			},
		]
	},
	{
		group: "LINK",
		data: [
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
			},
		]
	},
	{
		group: "ATOM",
		data: [
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
			},
		]
	},
	{
		group: "DAI",
		data: [
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
			},
		]
	},
];