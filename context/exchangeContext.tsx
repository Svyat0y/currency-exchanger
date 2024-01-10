import {createContext, ReactNode, useContext, useState} from "react"
import {Item} from "@/types/types"
import {currencies} from "@/components/exchanger/data"

type TExchangeContext = {
	children: ReactNode
}

type TExchange = {
	sendItem: Item
	getItem: Item
	sendValue: string
	getValue: string
	wallet: string
	setSendItem: (item: Item) => void
	setGetItem: (item: Item) => void
	setSendValue: (value: string) => void
	setGetValue: (value: string) => void
	setWallet: (value: string) => void
	rateState: number
	setRateState: (rate: number) => void
}

const exchangeContext = createContext<TExchange | null>(null)

export const useExchangeContext = () => {
	const context = useContext(exchangeContext)
	if (!context) {
		throw new Error("ExchangeContextProvider must be used within a ExchangeContextProvider")
	}
	return context;
}

export const ExchangeContextProvider = ({children}: TExchangeContext) => {
	const [sendItem, setSendItem] = useState<Item>(currencies[0])
	const [getItem, setGetItem] = useState<Item>(currencies[4])
	const [sendValue, setSendValue] = useState('')
	const [getValue, setGetValue] = useState('')
	const [wallet, setWallet] = useState('')
	const [rateState, setRateState] = useState(1)

	const value = {
		sendItem,
		setSendItem,
		getItem,
		setGetItem,
		sendValue,
		setSendValue,
		getValue,
		setGetValue,
		wallet,
		setWallet,
		rateState,
		setRateState,
	}


	return (
		<exchangeContext.Provider value={value}>
			{children}
		</exchangeContext.Provider>
	)
}